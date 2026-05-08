import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <p>🏔️ City Service Finder — Baguio City Services</p>
        <p>© 2025 APPDEV1 Group Project — University of Baguio</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1B4332;
      color: #8CA88E;
      width: 100%;
      margin-top: auto;
      padding: 12px 20px;
    }
    .footer-content {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }
    .footer-content p {
      margin: 3px 0;
      font-size: 0.75rem;
    }
  `]
})
export class FooterComponent {}