import { Component, EventEmitter, Input, Output , OnChanges, SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../app/models/category';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.html',
  styleUrls: ['./product-filters.css']
})
export class ProductFiltersComponent implements OnChanges{
  @Input() categories: Category[] = [];
  @Input() initialCategory: number | null = null;
  @Output() filtersChange = new EventEmitter<any>();

  selectedCategory: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minRating: number | null = null;

   ngOnChanges(changes: SimpleChanges) {
    if (changes['initialCategory'] && this.initialCategory !== null) {
      this.selectedCategory = this.initialCategory;
      this.emitFilters();
    }
  }

  emitFilters() {
    this.filtersChange.emit({
      selectedCategory: this.selectedCategory,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minRating: this.minRating
    });
  }

  resetFilters() {
    this.selectedCategory = this.minPrice = this.maxPrice = this.minRating = null;
    this.emitFilters();
  }
}
