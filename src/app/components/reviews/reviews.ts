import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../core/services/review';
import { UserService } from '../../core/services/user';
import { Review } from '../../models/review';
import { User } from '../../models/user';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.css']
})
export class ReviewsComponent implements OnInit, OnChanges {
  @Input() productId!: number;
  reviews: Review[] = [];
  usersMap: Record<number, User> = {};

  constructor(
    private reviewService: ReviewService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      users.forEach(u => (this.usersMap[u.id] = u));
    });

    if (this.productId) {
      this.loadReviews();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && !changes['productId'].firstChange) {
      this.loadReviews();
    }
  }

  private loadReviews(): void {
    if (!this.productId) return;
    this.reviewService.getByProduct(this.productId).subscribe({
      next: data => (this.reviews = data),
      error: () => console.error('Erreur lors du chargement des avis')
    });
  }

  get averageRating(): number {
    if (!this.reviews.length) return 0;
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
