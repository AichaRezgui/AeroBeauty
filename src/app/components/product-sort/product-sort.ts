import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-sort',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-sort.html',
  styleUrls: ['./product-sort.css']
})
export class ProductSortComponent {
  @Output() sortChange = new EventEmitter<string>();

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortChange.emit(value);
  }
}
