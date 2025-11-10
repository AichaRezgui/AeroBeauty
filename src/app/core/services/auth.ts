import { Injectable } from '@angular/core';
import { UserService } from './user';
import { User } from '../../models/user';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;
  private readonly STORAGE_KEY = 'currentUser';

  constructor(private userService: UserService) {
    const savedUser = localStorage.getItem(this.STORAGE_KEY);
    if (savedUser) this.currentUser = JSON.parse(savedUser);
  }

  login(email: string, password: string): Observable<User | null> {
    return this.userService.getAll().pipe(
      map(users => users.find(u => u.email === email && u.password === password) || null),
      tap(user => {
        if (user) {
          this.currentUser = user;
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        }
      })
    );
  }

  register(user: User): Observable<User> {
    return this.userService.create(user);
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
