import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

   const router = inject(Router);

const publicEndpoints = [
    '/auth/login',
    '/auth/logout',
    '/auth/signup',
    '/api/categories',
    '/api/products',
    '/api/sliders',
    '/api/reviews',
  ];

  const isUserPublicGet = req.method === 'GET' && req.url.match(/\/api\/users\/\d+$/);
  const isExplicitPublic = publicEndpoints.some(url => req.url.startsWith(url));
  const isPublic = isExplicitPublic || isUserPublicGet;

  const modifiedReq = isPublic ? req : req.clone({ withCredentials: true });

  return next(modifiedReq).pipe(
    catchError(err => {
      if (err.status === 401 && !isPublic) {
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
