import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user';
import { User } from '../../models/user';
import { Observable, map, of, tap ,BehaviorSubject} from 'rxjs';
import {  switchMap, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: Observable<User> | null = null;
  private userId : number | null = null;
  private baseUrl = 'http://localhost:9090/auth';

   private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private userService: UserService,private http: HttpClient) {
  }

  register1(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

 login1(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap(() => this.refreshAuthState())
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isLoggedInSubject.next(false);
        this.currentUserSubject.next(null);
      })
    );
  }

getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(map(user => !!user));
  }


  refreshAuthState(): void {
    this.http.get<{ id: number }>(`${this.baseUrl}/me`, {
      withCredentials: true
    }).pipe(
      switchMap(data => this.userService.getById(data.id)),
      tap(user => {
        this.isLoggedInSubject.next(true);
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        this.isLoggedInSubject.next(false);
        this.currentUserSubject.next(null);
        return of(null);
      })
    ).subscribe();
  }
}
