import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private path = 'categories';
  constructor(private api: ApiService) {}
  getAll(): Observable<Category[]> {
    return this.api.get<Category[]>(this.path);
  }
}
