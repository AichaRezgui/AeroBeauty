import { Component } from '@angular/core';
import { HomeSliderComponent } from './components/home-slider/home-slider';
import { HomeCategoriesComponent } from './components/home-categories/home-categories';
import { HomeFeaturedProductsComponent } from './components/home-featured-products/home-featured-products';
import { SearchBarComponent } from '../shared/search-bar/search-bar';

@Component({
  selector: 'app-home',
  imports: [HomeSliderComponent , HomeCategoriesComponent, HomeFeaturedProductsComponent, SearchBarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

}
