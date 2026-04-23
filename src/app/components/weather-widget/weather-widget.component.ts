import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weather-card" *ngIf="!loading; else loadingTemplate">
      <div class="weather-temp">{{ temperature }}°</div>
      <div class="weather-condition">{{ condition }}</div>
      <div class="weather-detail">Feels like {{ feelsLike }}°C</div>
      <div class="weather-stats">
        <span>💧 Humidity {{ humidity }}%</span>
        <span>👁️ Visibility {{ visibility }} km</span>
        <span>🌬️ Wind {{ windSpeed }} m/s</span>
      </div>
    </div>
    <ng-template #loadingTemplate>
      <div class="weather-loading">
        <div class="spinner"></div>
        <span>Loading weather...</span>
      </div>
    </ng-template>
  `,
  styles: [`
    .weather-card {
      background: linear-gradient(135deg, #1B4332 0%, #2A5C44 100%);
      border-radius: 16px;
      padding: 1rem;
      color: white;
    }
    .weather-temp {
      font-size: 2rem;
      font-weight: bold;
    }
    .weather-condition {
      font-size: 0.85rem;
      opacity: 0.9;
      margin: 0.25rem 0;
    }
    .weather-detail {
      font-size: 0.75rem;
      opacity: 0.8;
      margin-bottom: 0.5rem;
    }
    .weather-stats {
      display: flex;
      gap: 0.75rem;
      font-size: 0.7rem;
      flex-wrap: wrap;
      border-top: 1px solid rgba(255,255,255,0.2);
      padding-top: 0.5rem;
    }
    .weather-loading {
      background: #f0f0f0;
      border-radius: 16px;
      padding: 1rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #ccc;
      border-top-color: #1B4332;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class WeatherWidgetComponent implements OnInit {
  loading = true;
  temperature = 18;
  feelsLike = 16;
  condition = 'Light Fog';
  humidity = 83;
  visibility = 8;
  windSpeed = 1.2;
  
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1800);
  }
}