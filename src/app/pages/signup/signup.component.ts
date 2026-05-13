import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  errorMsg = '';
  successMsg = '';
  
  // Separate variables for each password field
  showPassword = false;
  showConfirmPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.name.trim()) {
      this.errorMsg = 'Please enter your name.';
      return;
    }
    if (!this.email.trim()) {
      this.errorMsg = 'Please enter your email address.';
      return;
    }
    if (!this.email.includes('@')) {
      this.errorMsg = 'Please enter a valid email address.';
      return;
    }
    if (!this.password) {
      this.errorMsg = 'Please enter a password.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMsg = 'Password must be at least 6 characters.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    this.auth.signup(this.name, this.email, this.password)
      .then((result) => {
        this.isLoading = false;
        if (result.success) {
          this.successMsg = result.message || 'Account created! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.errorMsg = result.message || 'Signup failed. Please try again.';
        }
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMsg = 'An error occurred. Please try again.';
        console.error(error);
      });
  }
}