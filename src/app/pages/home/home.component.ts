import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherWidgetComponent, ServiceCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchQuery = '';
  
  services = [
    { id: 1, name: 'Baguio City Emergency Response', category: 'emergency', description: 'Fire, police, and medical emergency dispatch for Baguio City', phone: '(074) 442-3020', isOpen: true },
    { id: 2, name: 'Baguio General Hospital', category: 'health', description: 'Public hospital — emergency care and outpatient consultations', phone: '(074) 443-0702', isOpen: true },
    { id: 3, name: 'City Transport Services', category: 'transport', description: 'Jeepney routes, fares and terminal information', phone: '(074) 12 routes', isOpen: true },
    { id: 4, name: 'DSWD — Social Welfare', category: 'welfare', description: 'Welfare services, assistance programs and community support', phone: '(074) 300-6165', isOpen: true }
  ];
  
  stats = [
    { value: '24/7', label: 'Emergency hotlines' },
    { value: '12', label: 'Jeepney routes' },
    { value: '18°', label: 'Light Fog' }
  ];
  
  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }
  
  onToggleSave(serviceId: number) {
    console.log('Save service:', serviceId);
  }
}