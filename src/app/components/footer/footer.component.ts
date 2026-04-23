import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-logo">🏔️ City Service Finder</span>
          <p>Making Baguio City's services accessible, safe, and connected for every resident.</p>
          <a href="https://www.baguio.gov.ph/" target="_blank" class="gov-link">Baguio City Services →</a>
        </div>
        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a routerLink="/home">Home</a></li>
            <li><a routerLink="/emergency">Emergency</a></li>
            <li><a routerLink="/transport">Transport</a></li>
            <li><a routerLink="/city-services">City Services</a></li>
            <li><a routerLink="/about">About SDG 11</a></li>
          </ul>
        </div>
        <div class="footer-sdg">
          <h3>SDG 11</h3>
          <p>Sustainable Cities & Communities</p>
          <p class="target">Make cities inclusive, safe, resilient and sustainable</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 APPDEV1 Group Project — University of Baguio</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1B4332;
      color: #8CA88E;
      margin-top: 4rem;
    }
    .footer-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem 1.5rem;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 2rem;
    }
    .footer-logo {
      display: block;
      font-size: 1.1rem;
      font-weight: 700;
      color: #D6E8D0;
      margin-bottom: 0.6rem;
    }
    .footer-brand p {
      font-size: 0.85rem;
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }
    .gov-link {
      color: #A8C5A0;
      text-decoration: none;
      font-size: 0.85rem;
    }
    .footer-links h3, .footer-sdg h3 {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #A8C5A0;
      margin-bottom: 0.75rem;
    }
    .footer-links ul {
      list-style: none;
      padding: 0;
    }
    .footer-links li {
      margin-bottom: 0.4rem;
    }
    .footer-links a {
      color: #6A8A6D;
      text-decoration: none;
      font-size: 0.85rem;
    }
    .footer-links a:hover {
      color: #D6E8D0;
    }
    .footer-sdg p {
      font-size: 0.85rem;
      line-height: 1.5;
    }
    .footer-bottom {
      border-top: 1px solid #2A5C44;
      text-align: center;
      padding: 1.25rem;
      font-size: 0.75rem;
    }
    @media (max-width: 768px) {
      .footer-inner {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class FooterComponent {}