import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CityService as CityServiceModel } from '../../models/service';
import { TitleCasePipe } from '@angular/common';
// Reusable card component — used in city-services page and dashboard
// Demonstrates @Input / @Output with EventEmitter (required by rubric)
@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  template: `
    <article class="service-card" [class]="'category-' + service.category">
      <div class="card-header">
        <span class="category-badge">{{ service.category | titlecase }}</span>
        <span class="status-dot" [class.open]="service.isOpen"
              [title]="service.isOpen ? 'Open now' : 'Closed'">
        </span>
      </div>

      <h3 class="card-title">{{ service.name }}</h3>
      <p class="card-address"> {{ service.address }}</p>
      <p class="card-description">{{ service.description }}</p>

      <div class="card-meta">
        <span class="hours"> {{ service.hours }}</span>
        <a [href]="'tel:' + service.phone" class="phone-link">
           {{ service.phone }}
        </a>
      </div>

      <div class="card-actions">
        <a [routerLink]="['/city-services', service.id]" class="btn-details">
          View Details
        </a>
        <button
          class="btn-save"
          [class.saved]="isSaved"
          (click)="onToggleSave()"
          [attr.aria-label]="isSaved ? 'Remove from saved' : 'Save this service'"
        >
          {{ isSaved ? '★ Saved' : '☆ Save' }}
        </button>
      </div>
    </article>
  `,
  styles: [`
    .service-card {
      background: #ffffff;
      border-radius: 10px;
      padding: 1.25rem;
      border: 1.5px solid #E2E8E4;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      transition: box-shadow 0.2s, transform 0.2s;
    }

    .service-card:hover {
      box-shadow: 0 4px 18px rgba(28, 61, 46, 0.1);
      transform: translateY(-2px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .category-badge {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0.22rem 0.65rem;
      border-radius: 20px;
      background: #E8F2EB;
      color: #1C3D2E;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .category-emergency .category-badge { background: #FCEAE8; color: #C0392B; }
    .category-health    .category-badge { background: #E8F0FC; color: #1A5276; }
    .category-welfare   .category-badge { background: #FDF5E6; color: #7D5A00; }
    .category-employment .category-badge { background: #EBF5EA; color: #1E6B2E; }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #9BA8A0;
    }

    .status-dot.open { background: #3A7D44; }

    .card-title {
      font-size: 0.98rem;
      font-weight: 600;
      color: #1A2226;
      line-height: 1.35;
    }

    .card-address,
    .card-description {
      font-size: 0.82rem;
      color: #5A6A60;
      line-height: 1.5;
    }

    .card-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.8rem;
      color: #4A6A50;
    }

    .phone-link {
      color: #1C3D2E;
      text-decoration: none;
      font-weight: 500;
    }

    .phone-link:hover { text-decoration: underline; }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .btn-details {
      flex: 1;
      text-align: center;
      background: #1C3D2E;
      color: #ffffff;
      text-decoration: none;
      padding: 0.45rem 0;
      border-radius: 6px;
      font-size: 0.83rem;
      font-weight: 600;
      transition: background 0.15s;
    }

    .btn-details:hover { background: #2A5C44; }

    .btn-save {
      background: transparent;
      border: 1.5px solid #C4E0C8;
      color: #3A7D44;
      padding: 0.42rem 0.9rem;
      border-radius: 6px;
      font-size: 0.83rem;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }

    .btn-save:hover { background: #EBF5EA; }

    .btn-save.saved {
      background: #3A7D44;
      color: #ffffff;
      border-color: #3A7D44;
    }
  `]
})
export class ServiceCardComponent {

  @Input({ required: true }) service!: CityServiceModel;
  @Input() isSaved = false;


  @Output() toggleSave = new EventEmitter<number>();

  onToggleSave(): void {
    this.toggleSave.emit(this.service.id);
  }
}
