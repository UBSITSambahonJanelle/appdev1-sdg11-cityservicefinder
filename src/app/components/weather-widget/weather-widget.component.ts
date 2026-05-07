import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  @Input() variant: 'compact' | 'full' = 'compact';
  
  weatherData = signal<WeatherData | null>(null);
  loading = signal(true);
  currentHour = new Date().getHours();
  
  constructor(private weatherService: WeatherService) {}
  
  ngOnInit() {
    this.weatherService.getWeatherData().subscribe(data => {
      this.weatherData.set(data);
      this.loading.set(false);
    });
  }
  
  getWeatherIcon(condition: string): string {
    const icons: Record<string, string> = {
      'Light Fog': '🌫️',
      'Fog': '🌫️',
      'Clouds': '☁️',
      'Sunny': '☀️',
      'Rain': '🌧️',
      'Clear': '✨'
    };
    return icons[condition] || '🌤️';
  }
}