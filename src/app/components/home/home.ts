import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSliderComponent } from './components/home-slider/home-slider';
import { HomeCategoriesComponent } from './components/home-categories/home-categories';
import { HomeFeaturedProductsComponent } from './components/home-featured-products/home-featured-products';
import { SearchBarComponent } from '../shared/search-bar/search-bar';
@Component({
  selector: 'app-home',
  imports: [CommonModule, HomeSliderComponent , HomeCategoriesComponent, HomeFeaturedProductsComponent, SearchBarComponent ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  loading = true;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 500); 
  }
}
