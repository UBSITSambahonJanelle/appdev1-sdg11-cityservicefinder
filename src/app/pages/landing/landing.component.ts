import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  
  email = '';
  password = '';
  
  
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  confirmPassword = '';
  
  rememberMe = false;
  togglePassword = false;
  isLoginMode = true;
  isLoading = false;
  errorMsg = '';
  successMsg = '';

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMsg = '';
    this.successMsg = '';
    
    if (this.isLoginMode) {
      this.email = this.signupEmail || '';
      this.password = '';
    } else {
      this.signupEmail = this.email || '';
      this.signupPassword = '';
      this.confirmPassword = '';
    }
  }

  async onSubmit(): Promise<void> {
    if (this.isLoginMode) {
      await this.login();
    } else {
      await this.signup();
    }
  }

  async login(): Promise<void> {
    if (!this.email.trim()) {
      this.errorMsg = 'Please enter your email address.';
      return;
    }
    if (!this.email.includes('@')) {
      this.errorMsg = 'Please enter a valid email address.';
      return;
    }
    if (!this.password) {
      this.errorMsg = 'Please enter your password.';
      return;
    }

    this.errorMsg = '';
    this.successMsg = '';
    this.isLoading = true;

    const result = await this.auth.login(this.email, this.password);

    this.isLoading = false;

    if (result.success) {
      this.successMsg = result.message || 'Login successful! Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    } else {
      this.errorMsg = result.message || 'Login failed. Please try again.';
    }
  }

  async signup(): Promise<void> {
    
    this.errorMsg = '';
    this.successMsg = '';
    
   
    if (!this.signupName.trim()) {
      this.errorMsg = 'Please enter your full name.';
      return;
    }
    
   
    if (!this.signupEmail.trim()) {
      this.errorMsg = 'Please enter your email address.';
      return;
    }
    if (!this.signupEmail.includes('@')) {
      this.errorMsg = 'Please enter a valid email address.';
      return;
    }
    
    
    if (!this.signupPassword) {
      this.errorMsg = 'Please enter a password.';
      return;
    }
    if (this.signupPassword.length < 6) {
      this.errorMsg = 'Password must be at least 6 characters.';
      return;
    }
    
    
    if (this.signupPassword !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    const result = await this.auth.signup(this.signupName, this.signupEmail, this.signupPassword);

    this.isLoading = false;

    if (result.success) {
      this.successMsg = result.message || 'Account created successfully!';
      
      setTimeout(() => {
        this.isLoginMode = true;
        this.email = this.signupEmail;
        this.password = '';
        this.signupName = '';
        this.signupEmail = '';
        this.signupPassword = '';
        this.confirmPassword = '';
        this.successMsg = '';
        this.errorMsg = '';
      }, 2000);
    } else {
      this.errorMsg = result.message || 'Signup failed. Please try again.';
    }
  }
}