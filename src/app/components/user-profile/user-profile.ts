import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user';
import { OrderService } from '../../core/services/order';
import { AuthService } from '../../core/services/auth';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { ProfileInfoComponent } from './components/profile-info/profile-info';
import { OrdersComponent } from './components/orders/orders';
import { FavoritesComponent } from './components/favorites/favorites';
import { AddressListComponent } from './components/address-list/address-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
  imports: [
    ProfileInfoComponent,
    OrdersComponent,
    FavoritesComponent,
    AddressListComponent,
    CommonModule
  ]
})
export class UserProfileComponent implements OnInit {
  user?: User;
  orders: Order[] = [];
  activeTab: 'info' | 'address' | 'favorites' | 'orders' = 'info';

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;
    this.userService.getById(Number(localStorage.getItem('id'))).subscribe(user => {
      this.user = user;
      this.loadOrders(user.id);
    });
  }

  loadOrders(userId: number): void {
    this.orderService.getByUserId(userId).subscribe(orders => (this.orders = orders));
  }
}
