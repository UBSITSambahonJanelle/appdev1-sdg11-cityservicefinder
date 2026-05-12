import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface CityService {
  id: number;
  name: string;
  category: string;
  description: string;
  phone: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="service-card">
      <div class="card-header">
        <span class="category">{{ service.category | uppercase }}</span>
      </div>
      <h3>{{ service.name }}</h3>
      <p>{{ service.description }}</p>
      <div class="card-footer">
        <div class="phone-container">
          <a [href]="'tel:' + service.phone" class="phone">📞 {{ service.phone }}</a>
          <button class="copy-btn" (click)="copyNumber(service.phone)" title="Copy number to clipboard">
            📋 Copy
          </button>
        </div>
        <div class="action-buttons">
          <a [routerLink]="['/city-services', service.id]" class="view-detail-link">View full details →</a>
          <button class="save-btn" (click)="onToggleSave()">{{ isSaved ? '★ Saved' : '☆ Save' }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .service-card {
      background: white;
      border-radius: 8px;
      padding: 15px;
      border: 1px solid #e0e0e0;
      transition: all 0.2s;
    }
    .service-card:hover {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .card-header {
      margin-bottom: 10px;
    }
    .category {
      background: #e8f5e9;
      color: #1B4332;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: bold;
      display: inline-block;
    }
    .service-card h3 {
      font-size: 1rem;
      margin-bottom: 8px;
    }
    .service-card p {
      font-size: 0.8rem;
      color: #666;
      margin-bottom: 12px;
      line-height: 1.4;
    }
    .card-footer {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .phone-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      background: #f5f5f5;
      padding: 8px 12px;
      border-radius: 6px;
    }
    .phone {
      color: #1B4332;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      flex: 1;
    }
    .copy-btn {
      background: #EEF5EF;
      border: none;
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.7rem;
      font-weight: 500;
      color: #1B4332;
      transition: all 0.2s;
    }
    .copy-btn:hover {
      background: #1B4332;
      color: white;
    }
    .action-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .view-detail-link {
      background: #D4622A;
      color: white;
      text-decoration: none;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      transition: background 0.2s;
    }
    .view-detail-link:hover {
      background: #B84E1A;
    }
    .save-btn {
      background: none;
      border: 1px solid #ddd;
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.75rem;
      transition: all 0.2s;
    }
    .save-btn:hover {
      background: #f5f5f5;
    }
    .save-btn.saved {
      background: #1B4332;
      color: white;
      border-color: #1B4332;
    }
  `]
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: CityService;
  @Input() isSaved = false;
  @Output() toggleSave = new EventEmitter<number>();
  
  onToggleSave() {
    this.toggleSave.emit(this.service.id);
  }

  copyNumber(phone: string) {
    navigator.clipboard.writeText(phone);
    alert('📋 Phone number copied to clipboard:\n' + phone);
  }
}