import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { WeatherResponse, AirQualityResponse } from '../models/weather';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  private readonly API_KEY = 'a356640f39e09f86eabebc34a008a9b7';
  private readonly BASE = 'https://api.openweathermap.org/data/2.5';

  private readonly LAT = 16.4023;
  private readonly LON = 120.5960;

  getCurrentWeather(): Observable<WeatherResponse> {
    const url = `${this.BASE}/weather?lat=${this.LAT}&lon=${this.LON}&appid=${this.API_KEY}&units=metric`;
    return this.http.get<WeatherResponse>(url).pipe(
      catchError(err => {
        console.error('Weather API error:', err);
        return throwError(() => new Error('Could not load weather data.'));
      })
    );
  }

  getAirQuality(): Observable<AirQualityResponse> {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${this.LAT}&lon=${this.LON}&appid=${this.API_KEY}`;
    return this.http.get<AirQualityResponse>(url).pipe(
      catchError(err => {
        console.error('Air quality API error:', err);
        return throwError(() => new Error('Could not load air quality data.'));
      })
    );
  }
}
