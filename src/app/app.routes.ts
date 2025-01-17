import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductResolver } from './services/product-resolver.service';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' }, },
  { path: 'about', component: AboutComponent, data: { breadcrumb: 'About Me' }, },
  { path: 'products', component: AllProductsComponent, data: { breadcrumb: 'Product List' }, },
  { path: 'product-details/:productId', component: ProductDetailsComponent, data: { breadcrumb: '' }, },
];
