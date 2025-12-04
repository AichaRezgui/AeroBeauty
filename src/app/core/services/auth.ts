import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user';
import { User } from '../../models/user';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: Observable<User> | null = null;
  private userId : number | null = null;
  private baseUrl = 'http://localhost:9090/auth';
  constructor(private userService: UserService,private http: HttpClient) {
  }

  register1(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }
  
  login1(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('id');
     localStorage.removeItem('token');
  }

  getCurrentUser(): Observable<User>{
    this.userId =Number(localStorage.getItem('id'));
    this.currentUser = this.userService.getById(this.userId);
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('id')){
      return true;
    }else return false;
  }
}
