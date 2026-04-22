import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="weatherData" class="weather-card">
      <div class="weather-temp">{{ weatherData.main?.temp }}°C</div>
      <div class="weather-desc">{{ weatherData.weather?.[0]?.description }}</div>
      <div class="weather-location">{{ weatherData.name }}</div>
    </div>
    <div *ngIf="!weatherData && !error">
      Loading weather...
    </div>
    <div *ngIf="error">
      Weather unavailable
    </div>
  `
})
export class WeatherWidgetComponent implements OnInit {
  private weatherService = inject(WeatherService);
  weatherData: any = null;
  error: boolean = false;

  ngOnInit() {
    this.weatherService.getCurrentWeather().subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (err) => {
        console.error('Weather error:', err);
        this.error = true;
      }
    });
  }
}