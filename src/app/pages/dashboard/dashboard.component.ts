import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherWidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stats = [
    { value: '3', label: 'Health' },
    { value: '1', label: 'Welfare' },
    { value: '2', label: 'Employment' }
  ];
  
  quickActions = [
    { name: 'Emergency Contacts', link: '/emergency', icon: '🚨' },
    { name: 'Jeepney Routes', link: '/transport', icon: '🚍' },
    { name: 'City Services', link: '/city-services', icon: '🏛️' },
    { name: 'Report an Issue', link: '/report', icon: '📝' }
  ];
}