import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
    loggedAfterIn = false;
    user: any = null;
    isLoading = false;
    cartProducts: any[] = [];
    cartProductsCount: number = 0;
    totalCartPrice: number = 0;
    totalDiscountPrice: number = 0;
    subTotal: number = 0;
    discount: number = 0;
    shippingCharge: number = 5;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
      this.authService.initializeAuthState();

      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        this.loggedAfterIn = isLoggedIn;
      });

      this.authService.user$.subscribe((user) => {
        this.user = user;
      });

      this.authService.user$.subscribe((user) => {
        this.user = user;
        this.fetchCartProducts();
      });
    }

    fetchCartProducts() {
      this.authService.fetchCarts().subscribe({
        next: (response) => {
          if (response.carts && response.carts.length > 0) {
            const firstCart = response.carts[0];
            this.cartProducts = firstCart.products; // Save product list
            this.cartProductsCount = this.cartProducts.length; // Count the products
            this.subTotal = firstCart.total;
            // Calculate total discounted price
            this.totalDiscountPrice = this.cartProducts.reduce(
              (sum, product) => sum + product.discountedTotal,
              0
            );

            this.discount = (this.subTotal) - (this.totalDiscountPrice);
            this.totalCartPrice = (this.shippingCharge) + (this.totalDiscountPrice);

          } else {
            this.cartProducts = [];
            this.cartProductsCount = 0;
            this.totalCartPrice = 0;
            this.totalDiscountPrice= 0;
            this.subTotal = 0;
            this.discount = 0;
            this.shippingCharge = 0;
          }
        },
        error: (error) => {
          console.error('Error loading carts:', error);
          this.cartProducts = [];
          this.cartProductsCount = 0;
          this.totalCartPrice = 0;
          this.totalDiscountPrice = 0;
          this.subTotal = 0;
          this.discount = 0;
          this.shippingCharge = 0;
        },
      });
    }

    increaseQuantity(index: number) {
      this.cartProducts[index].quantity++;
    }

    decreaseQuantity(index: number) {
      if (this.cartProducts[index].quantity > 1) {
        this.cartProducts[index].quantity--;
      }
    }

}
