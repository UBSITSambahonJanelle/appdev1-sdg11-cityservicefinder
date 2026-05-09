import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  password = '';
  isLoading = false;
  errorMsg = '';
  successMsg = '';
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
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
    this.isLoading = true;

    const result = await this.auth.login(this.email, this.password);

    this.isLoading = false;

    if (result.success) {
      this.successMsg = 'Login successful! Redirecting...';
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      setTimeout(() => {
        this.router.navigateByUrl(returnUrl);
      }, 1000);
    } else {
      this.errorMsg = result.message || 'Login failed. Please try again.';
    }
  }
}