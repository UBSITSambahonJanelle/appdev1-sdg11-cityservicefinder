<<<<<<< Updated upstream
import { Component } from '@angular/core';
=======
import { Component, inject } from '@angular/core';
>>>>>>> Stashed changes
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';

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
  
  services = [
    { id: 1, name: 'Baguio City Police Station', category: 'emergency', description: 'Main police station handling emergency response and public safety', phone: '(074) 442-7511', isOpen: true },
    { id: 2, name: 'Baguio General Hospital', category: 'health', description: 'Primary public hospital serving the Cordillera Administrative Region', phone: '(074) 443-0702', isOpen: true },
    { id: 3, name: 'Bureau of Fire Protection — Baguio', category: 'emergency', description: 'Fire suppression and prevention services for Baguio City', phone: '(074) 442-2222', isOpen: true },
    { id: 4, name: 'City Social Welfare Office', category: 'welfare', description: 'Social protection programs, livelihood assistance, community development', phone: '(074) 300-6165', isOpen: true },
    { id: 5, name: 'Public Employment Service Office', category: 'employment', description: 'Job placement assistance, livelihood programs, and employment facilitation', phone: '(074) 442-1234', isOpen: true },
    { id: 6, name: 'CDRRMO Baguio', category: 'emergency', description: 'City Disaster Risk Reduction & Management Office for emergency preparedness', phone: '(074) 300-6165', isOpen: true }
  ];
  
  get filteredServices() {
    if (this.selectedFilter === 'All') return this.services;
    return this.services.filter(s => s.category === this.selectedFilter.toLowerCase());
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