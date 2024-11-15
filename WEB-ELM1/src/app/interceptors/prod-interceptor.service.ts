import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    const token = this.tokenService.getToken();
    const intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token)});
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true}];
