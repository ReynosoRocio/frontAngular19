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
        this.setToken(response.token);
        const user = this.decodeToken(response.token);
        this._userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
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
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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
      return decodedToken ? decodedToken.user_type : null;
      }
      return null;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    } catch {
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
