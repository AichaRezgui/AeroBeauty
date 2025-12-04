import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { Order, OrderCreate } from '../../models/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private path = 'api/orders';

  constructor(private api: ApiService) {}

  getByUserId(userId: number): Observable<Order[]> {
    return this.api.get<Order[]>(`${this.path}/user/${userId}`);
  }

  getById(id: number): Observable<Order> {
    return this.api.getById<Order>(this.path, id);
  }

  create(order: OrderCreate): Observable<Order> {
    return this.api.post<Order>(this.path, order);
  }
}

