import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-logo"> CitySafe Hub</span>
          <p class="footer-tagline">
            Making Baguio City safer, smarter, and more connected —
            one resident at a time.
          </p>
        </div>

        <nav class="footer-links" aria-label="Footer navigation">
          <h3>Pages</h3>
          <ul>
            <li><a routerLink="/home">Home</a></li>
            <li><a routerLink="/emergency">Emergency</a></li>
            <li><a routerLink="/transport">Transport</a></li>
            <li><a routerLink="/city-services">City Services</a></li>
            <li><a routerLink="/about">About SDG 11</a></li>
          </ul>
        </nav>

        <div class="footer-sdg">
          <h3>SDG 11 Goal</h3>
          <p>Sustainable Cities & Communities</p>
          <p class="sdg-target">Target: Make cities inclusive, safe,<br>resilient, and sustainable.</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          Built for APPDEV1 — University of Baguio, S.Y. 2025–2026
          &nbsp;|&nbsp; Group [Your Group Number]
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: #141F17;
      color: #8CA88E;
      margin-top: auto;
    }

    .footer-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 2.5rem 1.25rem 1.5rem;
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

    .footer-tagline {
      font-size: 0.83rem;
      line-height: 1.6;
      color: #6A8A6D;
      max-width: 280px;
    }

    .footer-links h3,
    .footer-sdg h3 {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #A8C5A0;
      margin-bottom: 0.75rem;
    }

    .footer-links ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .footer-links a {
      color: #6A8A6D;
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.15s;
    }

    .footer-links a:hover {
      color: #D6E8D0;
    }

    .footer-sdg p {
      font-size: 0.85rem;
      line-height: 1.5;
      color: #6A8A6D;
    }

    .sdg-target {
      margin-top: 0.4rem;
      font-size: 0.8rem !important;
      font-style: italic;
    }

    .footer-bottom {
      border-top: 1px solid #1F3024;
      text-align: center;
      padding: 1rem 1.25rem;
      font-size: 0.78rem;
      color: #4A6A4D;
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