import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
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
}