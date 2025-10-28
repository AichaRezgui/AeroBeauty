import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product';
import { Product } from '../../models/product';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recommended-products.html',
  styleUrls: ['./recommended-products.css']
})
export class RecommendedProductsComponent implements OnInit, OnChanges {
  @Input() categoryId!: number; 
  @Input() currentProductId!: number; 
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadRecommendedProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId'] || changes['currentProductId']) {
      this.loadRecommendedProducts();
    }
  }

  private loadRecommendedProducts(): void {
    if (this.categoryId) {
      this.productService.getByCategory(this.categoryId).subscribe((res) => {
        this.products = res.filter(p => p.id !== this.currentProductId);
      });
    }
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}