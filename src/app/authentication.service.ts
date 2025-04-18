import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private tokenKey = 'authToken';
  private _userSubject: BehaviorSubject<any>;
  public User: Observable<any>;

  constructor(private _router: Router, private http: HttpClient, @Inject('BASE_URL') private _baseUrl: string) {
    const storedUser = localStorage.getItem('user');
    this._userSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.User = this._userSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<{ token: string }>(`${this._baseUrl}/login`, loginData).pipe(
      map(response => {
        if (response.token) {
          this.setToken(response.token); // Asegúrate de que el token sea válido antes de almacenarlo
          const user = this.decodeToken(response.token);
          if (user) {
            this._userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            console.error('Token inválido, no se pudo decodificar.');
          }
          return user;
        } else {
          throw new Error('No se recibió un token válido del servidor.');
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.clearToken();
    this._userSubject.next(null);
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }

  setToken(token: string): void {
    try {
      localStorage.setItem(this.tokenKey, token); // Asegúrate de que no haya errores al almacenar
    } catch (error) {
      console.error('Error al guardar el token en localStorage:', error);
    }
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey); // Maneja posibles errores al recuperar
    } catch (error) {
      console.error('Error al recuperar el token de localStorage:', error);
      return null;
    }
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserType(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      console.log('Decoded Token:', decodedToken); // Debugging line
      return decodedToken ? decodedToken.userType : null; // Extract 'userType' key
    }
    return null;
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? decodedToken.userId : null; // Extract 'id' key
    }
    return null;
  }

  private decodeToken(token: string): any {
    try {
      const payload = atob(token.split('.')[1]); // Decodifica el payload del JWT
      return JSON.parse(payload); // Asegúrate de que el payload sea un JSON válido
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.status === 400) {
      errorMessage = error.error?.message || 'Bad Request';
    } else if (error.status === 422) {
      const errors = error.error?.errors || {};
      errorMessage = Object.values(errors).flat().join(' ') || 'Unprocessable Content';
    }
    return throwError(() => new Error(errorMessage));
  }
}
