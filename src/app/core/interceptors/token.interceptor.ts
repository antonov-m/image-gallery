import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenManagerService } from '../services/token-manager.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenManager: TokenManagerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenManager.getToken();

    if (token) {
      request = this.injectToken(request, token);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error.status === 401) {
        this.tokenManager.refreshToken().subscribe(newToken => {
          request = this.injectToken(request, newToken);
          return next.handle(request);
        })
      }
      return throwError(error)
    })
    )
  }

  injectToken(request: HttpRequest<unknown>, token: string) {
    return request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
