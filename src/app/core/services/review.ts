import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Review } from '../../models/review';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private path = 'api/reviews';

  constructor(private api: ApiService) {}

  getAll(): Observable<Review[]> {
    return this.api.get<Review[]>(this.path);
  }

  getByProduct(productId: number): Observable<Review[]> {
    return this.api.get<Review[]>(`${this.path}/product/${productId}`);
  }

  getById(id: number): Observable<Review> {
    return this.api.get<Review>(`${this.path}/${id}`);
  }

  addReview(review: Partial<Review>): Observable<Review> {
    return this.api.post<Review>(this.path, review);
  }
  
}
