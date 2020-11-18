import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

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
    // TODO: add error handler
    return this.http.post<{ auth: boolean, token: string }>(
      this.authUrl, { apiKey: environment.apiKey })
    .pipe(tap(({ token }: { token: string }) => {
      localStorage.setItem(this.TOKEN_KEY, token);
    }));
  }
}
