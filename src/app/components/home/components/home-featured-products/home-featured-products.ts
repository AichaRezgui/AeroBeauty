import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../../core/services/product';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-home-featured-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-featured-products.html',
  styleUrls: ['./home-featured-products.css']
})
export class HomeFeaturedProductsComponent implements OnInit {
  featuredProducts: Product[] = [];
  isLoading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  private loadFeaturedProducts(): void {
    this.productService.getFeatured(8).subscribe({
      next: (data) => {
        this.featuredProducts = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits vedettes :', err);
        this.isLoading = false;
      },
    });
  }
}
