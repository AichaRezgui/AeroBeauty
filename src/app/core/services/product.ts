import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private path = 'products';
  constructor(private api : ApiService) {}

  getAll(): Observable<Product[]> {
    return this.api.get<Product[]>(this.path);
  }

  getFeatured(limit = 8) {
    return this.api.get<Product[]>(`${this.path}?isFeatured=true&_limit=${limit}`);
  }

  getByCategory(categoryId: number) {
    return this.api.get<Product[]>(`${this.path}?categoryId=${categoryId}`);
  }

  getById(id: number) {
    return this.api.getById<Product>(this.path, id);
  }
}
