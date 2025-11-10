import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Order } from '../../../../models/order';
import { ProductService } from '../../../../core/services/product';
import { Product } from '../../../../models/product';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersComponent implements OnChanges {
  @Input() orders: Order[] = [];
  productsMap: { [key: number]: Product } = {};

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders'] && this.orders?.length) {
      this.loadProducts();
    }
  }

  private loadProducts(): void {
    const productIds = this.orders.flatMap(o => o.items.map(i => i.productId));
    const uniqueIds = [...new Set(productIds)];

    if (uniqueIds.length) {
      forkJoin(uniqueIds.map(id => this.productService.getById(id))).subscribe(products => {
        this.productsMap = {}; 
        products.forEach(p => (this.productsMap[p.id] = p));
      });
    }
  }

  getProductName(id: number): string {
    return this.productsMap[id]?.name || `Produit #${id}`;
  }
}
