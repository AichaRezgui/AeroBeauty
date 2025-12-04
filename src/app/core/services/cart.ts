import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart, CartItem } from '../../models/cart';
import { Product } from '../../models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart$ = new BehaviorSubject<Cart | null>(null);

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) this.cart$.next(JSON.parse(saved));
  }

  private saveCartToStorage(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): Observable<Cart | null> {
    return this.cart$.asObservable();
  }

  getCurrentCart(): Cart | null {
    return this.cart$.value;
  }

  addToCart(product: Product, quantity: number, userId = 1) {
    let cart = this.getCurrentCart();

    if (!cart) {
      cart = { id: Date.now(), userId, items: [] };
    }

    const existingItem = cart.items.find(i => i.productId === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId: product.id,  quantity, price: product.price
      });
    }

    this.cart$.next(cart);
    this.saveCartToStorage(cart);
  }

  updateQuantity(productId: number, quantity: number) {
    const cart = this.getCurrentCart();
    if (!cart) return;

    const item = cart.items.find(i => i.productId === productId);
    if (item) item.quantity = quantity;

    this.cart$.next(cart);
    this.saveCartToStorage(cart);
  }

  removeItem(productId: number) {
    const cart = this.getCurrentCart();
    if (!cart) return;

    cart.items = cart.items.filter(i => i.productId !== productId);
    this.cart$.next(cart);
    this.saveCartToStorage(cart);
  }

  clearCart() {
    const cart = { id: Date.now(), userId: 1, items: [] };
    this.cart$.next(cart);
    this.saveCartToStorage(cart);
  }

  /*saveCartToServer(): Observable<Cart> {
    const cart = this.getCurrentCart();
    if (!cart) throw new Error('Aucun panier à sauvegarder');
    return this.api.put<Cart>(this.path, cart.id, cart).pipe(
      tap(saved => this.saveCartToStorage(saved))
    );
  }*/
}
