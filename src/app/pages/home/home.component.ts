import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { ServiceCardComponent, CityService as ServiceCardModel } from '../../components/service-card/service-card.component';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherWidgetComponent, QuickActionsComponent, ServiceCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private cityService = inject(CityService);

  stats = [
    { value: '24/7', label: 'Emergency hotlines' },
    { value: '12', label: 'Jeepney routes' },
    { value: '6', label: 'City services listed' }
  ];

  get featuredServices() {
    return this.cityService.getAllServices().slice(0, 6);
  }

  isSaved(id: number): boolean {
    return this.cityService.isSaved(id);
  }

  onToggleSave(serviceId: number): void {
    this.cityService.toggleSave(serviceId);
  }
}