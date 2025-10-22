import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des produits';
        this.isLoading = false;
      },
    });
  }

  goToDetails(id: number) {
  this.router.navigate(['/product', id]);
}

addToCart(event: Event, product: Product) {
  event.stopPropagation(); 
  console.log('Produit ajouté au panier :', product.name);
}
}
