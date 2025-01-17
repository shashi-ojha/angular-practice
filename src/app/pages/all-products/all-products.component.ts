import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamelCasePipe } from '../../pipes/camel-case.pipe';
import { Product } from '../../models/interfaces/product.interface';
import { StarRatingComponent } from "../../components/star-rating/star-rating.component";
import { ProductService } from '../../services/product.service';
import { TruncatePipe } from "../../pipes/truncate.pipe";
// import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb.component";


type ResponseData = { products: Product[] } | any;

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  imports: [CommonModule, CamelCasePipe, StarRatingComponent, TruncatePipe]
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  activeCategory: string = 'All';
  isLoading = true;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.filteredProducts = [...this.products];
        this.categories = ['All', ...new Set(this.products.map(product => product.category))];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }


  filterByCategory(category: string): void {
    this.activeCategory = category;
    this.filteredProducts = category === 'All'
      ? [...this.products]
      : this.products.filter(product => product.category === category);
  }
}
