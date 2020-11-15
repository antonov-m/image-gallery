import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {  map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  TOKEN_KEY = 'authToken';

  authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  refreshToken() {
    //TODO: add error handler
    return this.http.post(this.authUrl, { apiKey: environment.apiKey }).pipe(
      map(response => {
        localStorage.setItem(this.TOKEN_KEY, response.toString()); // TODO: change to real data
        return response.toString();
      })
    );
  }
}
