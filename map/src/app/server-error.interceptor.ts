import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//overwrites the default error handling of Angulars httpErrorResponse


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse): Observable<never> => {
        if (error.status === 401) {
          // refresh token
          return throwError("not implemented 401 error");
        } else {
          return throwError(error);
        }
      })
    );
  }
}
