import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse, AirQualityResponse } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  
  // Note: Replace with your actual OpenWeatherMap API key
  // Get free API key: https://home.openweathermap.org/users/sign_up
  private apiKey = 'YOUR_API_KEY_HERE';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  
  // Baguio City coordinates
  private lat = 16.4023;
  private lon = 120.5960;

  getWeatherByCity(city: string = 'Baguio'): Observable<WeatherResponse> {
    const url = `${this.baseUrl}/weather?q=${city},ph&units=metric&appid=${this.apiKey}`;
    return this.http.get<WeatherResponse>(url);
  }

  getWeatherByCoordinates(): Observable<WeatherResponse> {
    const url = `${this.baseUrl}/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get<WeatherResponse>(url);
  }

  getAirQuality(): Observable<AirQualityResponse> {
    const url = `${this.baseUrl}/air_pollution?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
    return this.http.get<AirQualityResponse>(url);
  }
}