import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthenticationService);
  const token = _authService.getToken();
  let clonedRequest = req;

  if (token) {
    clonedRequest = req.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  return next(clonedRequest).pipe(
    catchError(err => {
      if ([401, 403].includes(err.status)) {
        console.error('Unauthorized or Forbidden request:', err);
        _authService.logout(); // Log out the user if token is invalid
      }

      const error = err.error || {
        message: 'An error occurred while processing the request',
        status: err.status
      };
      console.error('Error:', error);
      return throwError(() => error);
    })
  );
};