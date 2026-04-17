import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, WeatherWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  quickLinks = [
    { label: 'Emergency', route: '/emergency', icon: '🚨', color: 'red' },
    { label: 'Weather', route: '/dashboard', icon: '🌤', color: 'blue' },
    { label: 'Transport', route: '/transport', icon: '🚌', color: 'green' },
    { label: 'Report Issue', route: '/report', icon: '📋', color: 'orange' },
  ];
}
