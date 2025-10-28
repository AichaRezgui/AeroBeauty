import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderService } from '../../../../core/services/slider';
import { Slider } from '../../../../models/slider'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-slider.html',
  styleUrl: './home-slider.css',
})
export class HomeSliderComponent implements OnInit {
  sliders: Slider[] = [];
  currentIndex = 0;

  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    this.sliderService.getAll().subscribe({
      next: (data) => (this.sliders = data),
      error: (err) => console.error('Erreur de chargement des sliders :', err),
    });

    this.autoSlide();
  }

  autoSlide() {
    setInterval(() => {
      if (this.sliders.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.sliders.length;
      }
    }, 4000);
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
