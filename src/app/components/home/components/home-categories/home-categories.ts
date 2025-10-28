import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../../core/services/category';
import { Category } from '../../../../models/category';

@Component({
  selector: 'app-home-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-categories.html',
  styleUrls: ['./home-categories.css']
})
export class HomeCategoriesComponent implements OnInit {
  categories: Category[] = [];
  isLoading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories :', err);
        this.isLoading = false;
      },
    });
  }
}
