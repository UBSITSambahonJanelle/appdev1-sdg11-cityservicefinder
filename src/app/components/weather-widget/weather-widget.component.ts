<<<<<<< Updated upstream
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
=======
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, startWith, map } from 'rxjs';
import { WeatherService } from '../../services/weather.service';

interface WeatherState {
  loading: boolean;
  data: any;
  error: string | null;
}
>>>>>>> Stashed changes

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
<<<<<<< Updated upstream
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
=======
export class WeatherWidgetComponent {
  private weatherService = inject(WeatherService);

  weatherState$: Observable<WeatherState> =
    this.weatherService.getWeatherByCoordinates().pipe(
      map(data => ({ loading: false, data, error: null })),
      catchError(err => of({ loading: false, data: null, error: err.message as string })),
      startWith({ loading: true, data: null, error: null })
    );
>>>>>>> Stashed changes
}