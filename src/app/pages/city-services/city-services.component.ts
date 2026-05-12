import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
  templateUrl: './city-services.component.html',
  styleUrls: ['./city-services.component.css']
})
export class CityServicesComponent {
  cityService = inject(CityService);

  selectedFilter = 'All';
  filters = ['All', 'Emergency', 'Health', 'Welfare', 'Employment', 'Government', 'Transport', 'Utilities'];

  get filteredServices() {
    const all = this.cityService.getAllServices();
    if (this.selectedFilter === 'All') return all;
    return all.filter(s => s.category === this.selectedFilter.toLowerCase());
  }

  onToggleSave(serviceId: number): void {
    this.cityService.toggleSave(serviceId);
  }

  isSaved(id: number): boolean {
    return this.cityService.isSaved(id);
  }
}