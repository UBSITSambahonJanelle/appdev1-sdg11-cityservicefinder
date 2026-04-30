
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../../models/weather';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  private weatherService = inject(WeatherService);

  
  weather$!: Observable<WeatherResponse>;

  
  loadError = '';

  today = new Date();

  ngOnInit(): void {
    this.weather$ = this.weatherService.getWeatherByCoordinates();
    
    this.weather$.subscribe({
      error: (err: Error) => { this.loadError = err.message; }
    });
  }
}
