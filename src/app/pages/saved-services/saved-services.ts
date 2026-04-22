import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityService } from '../../services/city';
import { ServiceCardComponent } from '../../components/service-card/service-card';

@Component({
  selector: 'app-saved-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
  templateUrl: './saved-services.html',
})
export class SavedServicesComponent {
  private cityService = inject(CityService);

  savedServices = this.cityService.savedServices;

  handleSave(id: number) {
    this.cityService.toggleSave(id);
  }

  isSaved(id: number) {
    return this.cityService.isSaved(id);
  }
}