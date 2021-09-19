import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sess = this.sessionService.session;
    const headers = {
      OPHJsonNamingStrategy: 'camelcase',
      __Language__: 'es-CO'
    };
    if (sess) {
      headers['Authorization'] = `Bearer ${sess.token}`;
    }

    const newReq = req.clone({ setHeaders: headers });
    return next.handle(newReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          if (error.status === 401 || error.status === 402 || error.status === 403) {
            this.sessionService.clean();
            this.router.navigate(['/']);
          }
        }
        return throwError(errorMessage);
      })
    );
  }
}
