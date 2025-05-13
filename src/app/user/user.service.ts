import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private _baseUrl: string) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this._baseUrl}/profile`);
  }
}
