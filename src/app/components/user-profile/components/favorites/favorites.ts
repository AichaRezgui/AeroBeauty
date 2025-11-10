import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css'],
  imports: [CommonModule]
})
export class FavoritesComponent implements OnInit {
  @Input() favorites: number[] = [];
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    if (this.favorites.length > 0) {
      this.loadFavoriteProducts();
    } else {
      this.loading = false;
    }
  }

  loadFavoriteProducts() {
    const requests = this.favorites.map(id => this.productService.getById(id));
    Promise.all(requests.map(obs => obs.toPromise()))
      .then(results => {
        this.products = results.filter(p => !!p) as Product[];
        this.loading = false;
      })
      .catch(() => (this.loading = false));
  }

  toggleFavorite(productId: number) {
    this.favorites = this.favorites.filter(id => id !== productId);
    this.products = this.products.filter(p => p.id !== productId);
  }
}
