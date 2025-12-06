import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart';
import { Cart } from '../../models/cart';
import { Product } from '../../models/product';
import { ProductService } from '../../core/services/product';
import { OrderService } from '../../core/services/order';
import { AuthService } from '../../core/services/auth';
import { OrderCreate } from '../../models/order';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart | null = null;
  productsMap: Record<number, Product> = {};

  address = { name: '', phone: '', street: '', city: '', zip: '', country: 'Tunisie' };

  deliveryMode: 'standard' | 'express' = 'standard';
  paymentMethod: 'card' | 'cash' = 'card';
  card = { number: '', expiry: '', cvc: '' };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private product: ProductService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(c => {
      this.cart = c;
      if (c && c.items.length > 0) {
        const ids = c.items.map(i => i.productId);
        this.loadProductNames(ids);
      }
    });
  }

  getSubtotal(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getDeliveryFee(): number {
    const subtotal = this.getSubtotal();
    if (subtotal >= 200) return 0;
    return this.deliveryMode === 'express' ? 15 : 7;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getDeliveryFee();
  }

confirmOrder() {
  if (!this.cart || this.cart.items.length === 0) {
    alert('Votre panier est vide.');
    return;
  }

  if (this.paymentMethod === 'card' && (!this.card.number || !this.card.expiry || !this.card.cvc)) {
    alert('Veuillez remplir les informations de carte.');
    return;
  }

  this.auth.getCurrentUser().subscribe(user => {
    if (!user) {
      alert('Vous devez être connecté pour passer une commande.');
      this.router.navigate(['/login']);
      return;
    }

    const currentUserId = user.id; 

    const newOrder: OrderCreate = {
      user: { id: currentUserId },
      items: this.cart!.items.map(i => ({
        product: { id: i.productId },
        quantity: i.quantity,
        price: i.price
      })),
      total: this.getTotal(),
      shippingAddress: {
        street: this.address.street || 'Non spécifiée',
        city: this.address.city || 'Non spécifiée',
        zip: this.address.zip || '0000',
        country: this.address.country,
        phone: this.address.phone || 'Non spécifié'
      },
      status: 'En cours',
      date: new Date().toISOString().split('T')[0]
    };

    this.orderService.create(newOrder).subscribe({
      next: () => {
        alert('Commande enregistrée avec succès ! Merci pour votre confiance ✅');
        this.cartService.clearCart();
        this.router.navigate(['/confirmation']);
      },
      error: err => {
        console.error(err);
        alert('Erreur lors de la création de la commande.');
      }
    });
  });
}


  loadProductNames(ids: number[]) {
    ids.forEach(id => {
      this.product.getById(id).subscribe(prod => {
        if (prod) this.productsMap[id] = prod;
      });
    });
  }
}
