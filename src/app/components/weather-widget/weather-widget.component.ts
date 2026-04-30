import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {

  private weatherService = inject(WeatherService);

  weather = signal<any>(null);
  loading = signal(true);

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      this.weatherService.getWeatherByCoordinates(lat, lon)
        .subscribe((data: any) => {
          this.weather.set(data);
          this.loading.set(false);
        });
    });
  }
}