import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  template: `
    <div class="service-card">
      <div class="card-header">
        <span class="category">{{ service.category | uppercase }}</span>
        <span class="status" [class.open]="service.isOpen">{{ service.isOpen ? 'Open' : 'Closed' }}</span>
      </div>
      <h3>{{ service.name }}</h3>
      <p>{{ service.description }}</p>
      <div class="card-footer">
        <a [href]="'tel:' + service.phone" class="phone">📞 {{ service.phone }}</a>
        <button class="save-btn" (click)="onToggleSave()">{{ isSaved ? '★ Saved' : '☆ Save' }}</button>
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
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .category {
      background: #e8f5e9;
      color: #1B4332;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: bold;
    }
    .status {
      font-size: 0.7rem;
      color: #999;
    }
    .status.open {
      color: #4caf50;
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
      justify-content: space-between;
      align-items: center;
    }
    .phone {
      color: #1B4332;
      text-decoration: none;
      font-size: 0.8rem;
    }
    .save-btn {
      background: none;
      border: 1px solid #ddd;
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.75rem;
    }
    .save-btn:hover {
      background: #f5f5f5;
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
}