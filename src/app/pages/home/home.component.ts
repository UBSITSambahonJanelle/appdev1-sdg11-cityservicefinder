import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
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

  // Gets first 4 services from the shared CityService — no hardcoded data
  featuredServices = this.cityService.getAllServices().slice(0, 4);

  isSaved(id: number): boolean {
    return this.cityService.isSaved(id);
  }

  onToggleSave(serviceId: number): void {
    this.cityService.toggleSave(serviceId);
  }
}