import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Base URL for the API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    const loginData = { email, password };

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, loginData).pipe(
      catchError(this.handleError)
    );
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
