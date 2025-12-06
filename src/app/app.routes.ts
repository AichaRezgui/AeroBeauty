import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductDetailsComponent } from './components/product-details/product-details';
import { HomeComponent } from './components/home/home';
import { CartComponent } from './components/cart/cart';
import { CheckoutComponent } from './components/checkout/checkout';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { UserProfileComponent } from './components/user-profile/user-profile';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'products', component: ProductListComponent },
    {path: 'product/:id', component: ProductDetailsComponent},
    { path: 'cart', component: CartComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'confirmation', component: OrderConfirmationComponent, canActivate: [AuthGuard] },
    {path: 'profil', component: UserProfileComponent, canActivate: [AuthGuard]}

];
