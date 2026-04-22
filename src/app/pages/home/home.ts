import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherWidgetComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  private weather = inject(WeatherService);

  weatherData: any;

  quickLinks = [
    { label: 'Emergency', route: '/emergency', icon: '🚨', color: 'red' },
    { label: 'Weather', route: '/dashboard', icon: '🌤', color: 'blue' },
    { label: 'Transport', route: '/transport', icon: '🚌', color: 'green' },
    { label: 'Report Issue', route: '/report', icon: '📋', color: 'orange' },
  ];

  ngOnInit() {
      this.weather.getCurrentWeather().subscribe(data => {
        this.weatherData = data;
      });
    }
  }