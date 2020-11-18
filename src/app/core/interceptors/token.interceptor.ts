import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take, switchMap, map, tap } from 'rxjs/operators';
import { TokenManagerService } from '../services/token-manager.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenManager: TokenManagerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenManager.getToken();

    if (token) {
      request = this.injectToken(request, token);
    }

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return this.tokenManager.refreshToken().pipe(tap(() => {
          const newToken = this.tokenManager.getToken() || '';
          request = this.injectToken(request, newToken);
          return next.handle(request)
        }))
      } else {
        return throwError(err);
      }
    })) as Observable<HttpEvent<any>>
  }

  injectToken(request: HttpRequest<unknown>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
