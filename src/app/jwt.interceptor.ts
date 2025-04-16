import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authenticationService: AuthenticationService, @Inject('BASE_URL') private _baseUrl: string) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this._authenticationService.isAuthenticated();
    const isApiUrl = request.url.indexOf(this._baseUrl) === 0;

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._authenticationService.getToken()}`
        }
      });
    }

    return next.handle(request);
  }
}