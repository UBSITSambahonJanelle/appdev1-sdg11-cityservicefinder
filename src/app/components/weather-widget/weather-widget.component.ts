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
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
<<<<<<< Updated upstream
export class WeatherWidgetComponent implements OnInit {
  loading = signal(true);
  temperature = signal(18);
  condition = signal('Light Fog');
  humidity = signal(83);
  
  ngOnInit() {
    // Simulate loading for Week 1-2
    setTimeout(() => {
      this.loading.set(false);
    }, 1800);
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