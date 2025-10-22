import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductDetailsComponent } from './components/product-details/product-details';

export const routes: Routes = [
    {path: '', component: ProductListComponent },
    {path: 'product/:id', component: ProductDetailsComponent}
    
];
