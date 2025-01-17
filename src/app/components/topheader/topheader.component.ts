import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-topheader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topheader.component.html',
  styleUrl: './topheader.component.css'
})
export class TopheaderComponent {
  loggedIn = false;
  loggedInUserEmail: string = '';
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';


  openLoginModal() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/; // Password validation regex

    // Reset error messages
    this.emailError = '';
    this.passwordError = '';

    // Validate email
    if (!this.email) {
      this.emailError = 'Email is required.';
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Please enter a valid email.';
    }

    // Validate password
    if (!this.password) {
      this.passwordError = 'Password is required.';
    } else if (!passwordRegex.test(this.password)) {
      this.passwordError = `Password must be at least 8 characters long and include:
        - At least 1 uppercase letter
        - At least 1 lowercase letter
        - At least 1 special character
        - At least 1 number.`;
    }

    // Check if there are any validation errors
    if (this.emailError || this.passwordError) {
      return; // Stop the function if there are errors
    }

    // If validations pass
    this.loggedIn = true;
    this.loggedInUserEmail = this.email;
    this.email = '';
    this.password = '';

    // Close the modal
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

}
