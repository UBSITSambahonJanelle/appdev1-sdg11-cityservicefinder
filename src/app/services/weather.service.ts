import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { WeatherResponse, AirQualityResponse } from '../models/weather';
import { environment } from '../environments/environment/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http    = inject(HttpClient);
  private apiKey  = environment.openWeatherMapKey;
  private baseUrl = environment.openWeatherMapBase;

  // Baguio City coordinates — 16.4023°N, 120.5960°E
  private readonly lat = 16.4023;
  private readonly lon = 120.5960;

  // Returns an Observable — components use async pipe, no .subscribe() needed
  getWeatherByCoordinates(): Observable<WeatherResponse> {
    const url = `${this.baseUrl}/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get<WeatherResponse>(url).pipe(
      catchError(err =>
        throwError(() => new Error('Could not load weather data. Check your API key in environment.ts.'))
      )
    );
  }

  getAirQuality(): Observable<AirQualityResponse> {
    const url = `${this.baseUrl}/air_pollution?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
    return this.http.get<AirQualityResponse>(url).pipe(
      catchError(err =>
        throwError(() => new Error('Could not load air quality data.'))
      )
    );
  }
}