import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router); 

  console.log('%c[AUTH INTERCEPTOR]', 'color: #00bfa6; font-weight:bold;', {
    url: req.url,
    hasToken: !!token,
    token: token ? token.substring(0, 20) + '...' : null
  });

  const modifiedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(modifiedReq).pipe(
    catchError(err => {
      let shouldRedirect = false;

      console.log('%c[AUTH ERROR]', 'color: red; font-weight:bold;', err.status, err.message);
    
      if (token && (err.status === 401 || err.status === 403)) {
        try {
          const decoded: any = jwtDecode(token);
          const now = Date.now().valueOf() / 1000;

      
          console.log('%c[TOKEN EXPIRATION CHECK]', 'color: orange', {
            expired: decoded.exp < now,
            exp: decoded.exp,
            now
          });

          if (decoded.exp < now) {
            shouldRedirect = true;
          }
        } catch (e) {
          shouldRedirect = true;
        }
      }
    
      if (shouldRedirect) {
        console.warn(' TOKEN EXPIRED → Redirecting to /login...', 'color: red; font-weight:bold;');
        localStorage.clear();
        router.navigate(['/login']);
      }
    
      return throwError(() => err);
    })
  );
};
