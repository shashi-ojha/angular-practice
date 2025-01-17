import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../models/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiBaseUrl = 'https://dummyjson.com';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiBaseUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiBaseUrl}/products/${id}`);
  }
}
