<<<<<<< Updated upstream
import { Component } from '@angular/core';
=======
import { Component, inject } from '@angular/core';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
  cityService = inject(CityService);

>>>>>>> Stashed changes
  selectedFilter = 'All';
  filters = ['All', 'Emergency', 'Health', 'Welfare', 'Employment'];

  get filteredServices() {
    const all = this.cityService.getAllServices();
    if (this.selectedFilter === 'All') return all;
    return all.filter(s => s.category === this.selectedFilter.toLowerCase());
  }
<<<<<<< Updated upstream
  
  onToggleSave(serviceId: number) {
    console.log('Toggle save for service:', serviceId);
  }
=======

  onToggleSave(serviceId: number): void {
    this.cityService.toggleSave(serviceId);
  }

  isSaved(id: number): boolean {
    return this.cityService.isSaved(id);
  }
>>>>>>> Stashed changes
}