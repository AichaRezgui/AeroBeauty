import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private path = 'api/products';
  constructor(private api : ApiService) {}

  getAll(): Observable<Product[]> {
    return this.api.get<Product[]>(this.path);
  }

  getFeatured(): Observable<Product[]> {
    return this.api.get<Product[]>(`${this.path}/featured`);
  }

  getNew(): Observable<Product[]> {
    return this.api.get<Product[]>(`${this.path}/new`);
  }

  getByCategory(categoryId: number): Observable<Product[]> {
    return this.api.get<Product[]>(`${this.path}/category/${categoryId}`);
  }

  getById(id: number): Observable<Product> {
    return this.api.get<Product>(`${this.path}/${id}`);
  }
}
