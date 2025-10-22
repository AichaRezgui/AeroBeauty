import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private path = 'users';

  constructor(private api: ApiService) {}

  getAll(): Observable<User[]> {
    return this.api.get<User[]>(this.path);
  }

  getById(id: number): Observable<User> {
    return this.api.getById<User>(this.path, id);
  }
}
