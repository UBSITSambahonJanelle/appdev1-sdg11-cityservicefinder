import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface WeatherData {
  location: string;
  temp: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  hourlyForecast: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // Premium mock data - loads instantly, no API key needed
  getWeatherData(): Observable<WeatherData> {
    return of({
      location: 'Baguio City, Benguet',
      temp: 18,
      feelsLike: 16,
      condition: 'Light Fog',
      humidity: 83,
      windSpeed: 1.2,
      visibility: 8,
      pressure: 1015,
      uvIndex: 4,
      sunrise: '6:15 AM',
      sunset: '5:45 PM',
      hourlyForecast: [
        { time: 'Now', temp: 18, icon: '🌫️' },
        { time: '1 AM', temp: 17, icon: '🌫️' },
        { time: '2 AM', temp: 17, icon: '🌫️' },
        { time: '3 AM', temp: 16, icon: '☁️' },
        { time: '4 AM', temp: 16, icon: '☁️' },
        { time: '5 AM', temp: 15, icon: '☀️' },
        { time: '6 AM', temp: 16, icon: '☀️' },
        { time: '7 AM', temp: 17, icon: '☀️' }
      ]
    }).pipe(delay(100)); // Minimal 100ms delay for smooth loading
  }
}