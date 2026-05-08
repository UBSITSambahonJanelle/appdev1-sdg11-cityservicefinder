import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">🏔️</div>
        <h1>City Service Finder</h1>
        <p class="login-sub">Sign in to access your dashboard, saved services, and report issues.</p>

        <div class="form-group">
          <label>Email address</label>
          <input type="email" placeholder="yourname@email.com"
                 [value]="email" (input)="email = $any($event.target).value">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••"
                 [value]="password" (input)="password = $any($event.target).value">
        </div>

        @if (errorMsg) {
          <p class="form-error" role="alert">{{ errorMsg }}</p>
        }

        <button class="btn-login" (click)="login()">Sign In</button>
        <p class="login-note">Demo: use any email and any password.</p>
      </div>
    </div>
  `,
  styles: [`
    .login-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 2rem; background: #F8FAFB; }
    .login-card { background: #fff; border-radius: 14px; padding: 2.25rem 2rem; width: 100%; max-width: 380px; border: 1px solid #E4E8EC; text-align: center; }
    .login-logo { font-size: 2rem; margin-bottom: 0.4rem; }
    h1 { font-size: 1.35rem; font-weight: 700; color: #1B4332; margin-bottom: 0.4rem; }
    .login-sub { font-size: 0.82rem; color: #6A7A72; line-height: 1.55; margin-bottom: 1.4rem; }
    .form-group { text-align: left; display: flex; flex-direction: column; gap: 0.28rem; margin-bottom: 0.85rem; }
    label { font-size: 0.76rem; font-weight: 700; color: #1B4332; }
    input { padding: 0.58rem 0.82rem; border: 1.5px solid #D0D8D4; border-radius: 7px; font-size: 0.86rem; color: #1C1E20; background: #FAFBFA; font-family: inherit; outline: none; width: 100%; box-sizing: border-box; }
    input:focus { border-color: #1B4332; }
    .form-error { font-size: 0.8rem; color: #C0392B; background: #FCEAE8; border-radius: 7px; padding: 0.4rem 0.75rem; margin-bottom: 0.75rem; }
    .btn-login { width: 100%; background: #1B4332; color: #fff; border: none; padding: 0.7rem; border-radius: 8px; font-size: 0.88rem; font-weight: 700; cursor: pointer; font-family: inherit; }
    .btn-login:hover { background: #145c3a; }
    .login-note { font-size: 0.7rem; color: #9AA0A6; margin-top: 1rem; }
  `]
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);

  email    = '';
  password = '';
  errorMsg = '';

  login(): void {
    if (!this.email || !this.password) {
      this.errorMsg = 'Please enter your email and password.';
      return;
    }
    this.errorMsg = '';
    this.auth.login(this.email);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.router.navigateByUrl(returnUrl);
  }
}