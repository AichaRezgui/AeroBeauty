import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product';
import { ReviewService } from '../../core/services/review';
import { Product } from '../../models/product';
import { Review } from '../../models/review';
import { UserService } from '../../core/services/user';
import { User } from '../../models/user';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  selectedImage = '';
  quantity = 1;
  reviews: Review[] = [];
  usersMap: Record<number, User> = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
    users.forEach(u => this.usersMap[u.id] = u);
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.selectedImage = data.images[0];
        },
        error: () => console.error('Erreur lors du chargement du produit')
      });

      this.reviewService.getByProduct(id).subscribe({
        next: (data) => this.reviews = data,
        error: () => console.error('Erreur lors du chargement des avis')
      });
    }
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  addToCart() {
    console.log('Ajouté au panier :', this.product?.name, 'x', this.quantity);
  }

  get averageRating(): number {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / this.reviews.length;
}

getStars(rating: number): number[] {
  return Array(Math.round(rating)).fill(0); 
}

getUserName(userId: number): string {
  const user = this.usersMap[userId];
  return user ? `${user.firstName} ${user.lastName}` : 'Utilisateur inconnu';
}

}
