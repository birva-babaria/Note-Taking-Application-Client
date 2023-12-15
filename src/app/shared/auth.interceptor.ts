import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public service: UserService, public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.service.getToken();
    if (token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpResponse && error.status === 401){
          localStorage.removeItem('token');
          this.router.navigateByUrl('/user/login');
        }
        else if(error instanceof HttpResponse && error.status == 403){
          this.router.navigateByUrl('/forbidden');
        }
        return throwError(() => error);
      })
    );
  }
}
