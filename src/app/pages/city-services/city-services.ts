import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityService } from '../../services/city';
import { ServiceCardComponent } from '../../components/service-card/service-card';

@Component({
  selector: 'app-city-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
  templateUrl: './city-services.html',
})
export class CityServicesComponent {
  private cityService = inject(CityService);

  services = this.cityService.getAllServices();

  handleSave(id: number) {
    this.cityService.toggleSave(id);
  }

  isSaved(id: number) {
    return this.cityService.isSaved(id);
  }
}