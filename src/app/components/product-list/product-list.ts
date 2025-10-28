import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../app/core/services/product';
import { CategoryService } from '../../../app/core/services/category';
import { ProductFiltersComponent } from '../product-filters/product-filters';
import { ProductSortComponent } from '../product-sort/product-sort';
import { Product } from '../../../app/models/product';
import { Category } from '../../../app/models/category';
import { SearchBarComponent } from '../shared/search-bar/search-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFiltersComponent, ProductSortComponent, SearchBarComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  currentFilters: any = {};
  currentSort = '';
  selectedCategoryFromUrl: number | null = null;


  isLoading = true;
  errorMessage = '';

  constructor(private productService: ProductService, private categoryService: CategoryService,
     private router: Router,private route: ActivatedRoute) {}

ngOnInit() {
  this.loadData();

  this.route.queryParams.subscribe((params) => {
    const categoryId = params['category'] ? Number(params['category']) : null;
    const searchTerm = params['search'] ? params['search'].toLowerCase() : null;

    this.selectedCategoryFromUrl = categoryId;

    const applyFiltersOnceLoaded = () => {
      if (categoryId || searchTerm) {
        this.applyFilters({ selectedCategory: categoryId, searchTerm });
      } else {
        this.filteredProducts = [...this.products];
      }
    };

    if (this.products.length > 0) {
      applyFiltersOnceLoaded();
    } else {
      const wait = setInterval(() => {
        if (this.products.length > 0) {
          applyFiltersOnceLoaded();
          clearInterval(wait);
        }
      }, 100);
    }
  });
}



  loadData() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...data];
        this.isLoading = false;
      },
      error: () => (this.errorMessage = 'Erreur chargement produits'),
    });

    this.categoryService.getAll().subscribe({
      next: (data) => (this.categories = data),
      error: () => console.error('Erreur chargement catégories'),
    });
  }

applyFilters(filters: any = {}) {
  this.currentFilters = filters;
  const { selectedCategory, minPrice, maxPrice, minRating, searchTerm } = filters;

  this.filteredProducts = this.products.filter((p) => {
    const matchCat = !selectedCategory || p.categoryId === +selectedCategory;
    const matchPrice = (!minPrice || p.price >= minPrice) && (!maxPrice || p.price <= maxPrice);
    const matchRating = !minRating || (p.rating ?? 0) >= minRating;
    const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm);
    return matchCat && matchPrice && matchRating && matchSearch;
  });

  this.applySort(this.currentSort);
}


  applySort(option: string) {
    this.currentSort = option;
    switch (option) {
      case 'priceAsc': this.filteredProducts.sort((a, b) => a.price - b.price); break;
      case 'priceDesc': this.filteredProducts.sort((a, b) => b.price - a.price); break;
      case 'rating': this.filteredProducts.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
      case 'new': this.filteredProducts.sort((a, b) => Number(b.isNew) - Number(a.isNew)); break;
      default: break;
    }
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  addToCart(event: Event, product: Product) {
    event.stopPropagation();
    console.log('Ajout au panier :', product.name);
  }
}
