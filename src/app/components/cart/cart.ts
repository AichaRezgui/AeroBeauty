import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart';
import { ProductService } from '../../core/services/product';
import { Cart, CartItem } from '../../models/cart';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  productsMap: Record<number, Product> = {};
  deliveryFee = 7;
  errorMessage: string | null = null;

  constructor(private cartService: CartService, private productService: ProductService, private route : Router,  private authService: AuthService ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      if (cart?.items) {
        this.loadProducts(cart.items.map(i => i.productId));
      }
    });
  }

  loadProducts(ids: number[]) {
    ids.forEach(id => {
      this.productService.getById(id).subscribe(prod => (this.productsMap[id] = prod));
    });
  }

  getSubtotal(item: CartItem): number {
    const product = this.productsMap[item.productId];
    return product ? product.price * item.quantity : 0;
  }

  getTotal(): number {
    if (!this.cart) return 0;
    const subtotal = this.cart.items.reduce((sum, i) => sum + this.getSubtotal(i), 0);
    return subtotal + this.deliveryFee;
  }

  updateQuantity(item: CartItem) {
    const product = this.productsMap[item.productId];
    if (!product) return;

    if (item.quantity > product.stock!) {
      item.quantity = product.stock ?? 0;
      this.errorMessage = `Stock limité : seulement ${product.stock} exemplaire(s) disponible(s) pour ${product.name}.`;
      setTimeout(() => (this.errorMessage = null), 4000);
    } else if (item.quantity < 1) {
      item.quantity = 1;
    }

    this.cartService.updateQuantity(item.productId, item.quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }

checkout() {
  this.authService.isLoggedIn().subscribe(isLogged => {
    if (isLogged) {
      this.route.navigate(['/checkout']);   
    } else {
      this.route.navigate(['/login']);      
    }
  });
}

  getSubtotalAll(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((sum, i) => sum + this.getSubtotal(i), 0);
  }

  acceuil(){
    this.route.navigate(['/']);
  }
}
