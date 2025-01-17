import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/interfaces/product.interface';
import { StarRatingComponent } from "../../components/star-rating/star-rating.component";
import { CamelCasePipe } from "../../pipes/camel-case.pipe";
import { RelativeDatePipe } from "../../pipes/relative-date.pipe";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],

  imports: [StarRatingComponent, CommonModule, CamelCasePipe, RelativeDatePipe]
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  isLoading = true;
  maxStock: number = 0; // Stock limit from API
  calculatedPrice: number = 0;
  quantity: number = 1;
  discountAmount: number = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['productId'];
      this.fetchProductDetails(productId);
    });
  }

  fetchProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response;
        this.maxStock = this.product.stock;
        this.discountAmount = this.product.price - ((this.product.price * this.product.discountPercentage)/100);
        this.calculatedPrice = this.discountAmount;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.isLoading = false;
      }
    });
  }

  increment(): void {
    if (this.quantity < this.maxStock) {
      this.quantity++;
      this.updatePrice();
    }
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.updatePrice();
    }
  }

  updatePrice(): void {
    if (this.product) {
      this.calculatedPrice = this.discountAmount * this.quantity;
    }
  }
}
