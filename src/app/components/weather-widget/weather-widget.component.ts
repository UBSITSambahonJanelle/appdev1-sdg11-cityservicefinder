import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, startWith, map } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse } from '../../models/weather';

interface WeatherState {
  loading: boolean;
  data: WeatherResponse | null;
  error: string | null;
}

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent {
  private weatherService = inject(WeatherService);

  weatherState$: Observable<WeatherState> =
    this.weatherService.getWeatherByCoordinates().pipe(
      map(data => ({ loading: false, data, error: null })),
      catchError(err => of({ loading: false, data: null, error: err.message as string })),
      startWith({ loading: true, data: null, error: null })
    );
}