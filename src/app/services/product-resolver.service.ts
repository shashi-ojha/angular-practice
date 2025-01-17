// product-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<string> {
  constructor(private readonly productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const productId = route.params['productId'];
    return this.productService.getProductById(productId).pipe(
      map((product: Product) => product.title) // Extract the product name
    );
  }
}
