import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

declare let bootstrap: any;

@Component({
  selector: 'app-topheader',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css'],
})
export class TopheaderComponent implements OnInit {
  loggedAfterIn = false;
  user: any = null;
  loginForm!: FormGroup;
  loginError = '';
  isLoading = false;
  cartProducts: any[] = [];
  cartProductsCount: number = 0;
  totalCartPrice: number = 0;
  hoverCart: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

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

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  fetchCartProducts() {
    this.authService.fetchCarts().subscribe({
      next: (response) => {
        if (response.carts && response.carts.length > 0) {
          const firstCart = response.carts[0];
          this.cartProducts = firstCart.products; // Save product list
          this.cartProductsCount = this.cartProducts.length; // Count the products

          // Calculate total discounted price
          this.totalCartPrice = this.cartProducts.reduce(
            (sum, product) => sum + product.discountedTotal,
            0
          );
        } else {
          this.cartProducts = [];
          this.cartProductsCount = 0;
          this.totalCartPrice = 0;
        }
      },
      error: (error) => {
        console.error('Error loading carts:', error);
        this.cartProducts = [];
        this.cartProductsCount = 0;
        this.totalCartPrice = 0;
      },
    });
  }

  viewCart() {
    this.router.navigate(['/cart']); // Redirect to cart page
  }

  checkout() {
    this.router.navigate(['/checkout']); // Redirect to checkout page
  }


  openLoginModal() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  login() {
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginError = 'Please fill in all required fields correctly.';
      return;
    }

    this.isLoading = true;

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.loggedAfterIn = true;
        this.user = response;

        const modalElement = document.getElementById('loginModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.loginError = error;
      },
    });
  }

  logout() {
    this.authService.logout();
    this.loggedAfterIn = false;
    this.user = null;
  }
}
