import { Injectable, signal } from '@angular/core';
import { CityService } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  
  private services = signal<CityService[]>([
    {
      id: 1,
      name: 'Baguio City Police Station',
      category: 'emergency',
      address: 'Gov. Pack Road, Baguio City',
      phone: '(074) 442-7511',
      description: 'Main police station handling emergency response and public safety',
      hours: '24/7',
      isOpen: true
    },
    {
      id: 2,
      name: 'Baguio General Hospital',
      category: 'health',
      address: 'Gov. Pack Road, Baguio City',
      phone: '(074) 443-0702',
      description: 'Primary public hospital serving the Cordillera Administrative Region',
      hours: '24/7',
      isOpen: true
    },
    {
      id: 3,
      name: 'Bureau of Fire Protection - Baguio',
      category: 'emergency',
      address: 'South Drive, Baguio City',
      phone: '(074) 442-2222',
      description: 'Fire suppression and prevention services for Baguio City',
      hours: '24/7',
      isOpen: true
    },
    {
      id: 4,
      name: 'City Social Welfare Office',
      category: 'welfare',
      address: 'Upper Session Road, Baguio City',
      phone: '(074) 300-6165',
      description: 'Social protection programs, livelihood assistance, community development',
      hours: '8:00 AM - 5:00 PM',
      isOpen: true
    },
    {
      id: 5,
      name: 'Public Employment Service Office',
      category: 'employment',
      address: 'City Hall, Baguio City',
      phone: '(074) 442-1234',
      description: 'Job placement assistance, livelihood programs, and employment facilitation',
      hours: '8:00 AM - 5:00 PM',
      isOpen: true
    },
    {
      id: 6,
      name: 'CDRRMO Baguio',
      category: 'emergency',
      address: 'City Hall, Baguio City',
      phone: '(074) 300-6165',
      description: 'City Disaster Risk Reduction & Management Office for emergency preparedness',
      hours: '24/7',
      isOpen: true
    },
    {
      id: 7,
      name: 'Health Services Office',
      category: 'health',
      address: 'Military Cut-off, Baguio City',
      phone: '(074) 442-5678',
      description: 'Free checkups and vaccinations for residents',
      hours: '8:00 AM - 4:00 PM',
      isOpen: true
    }
  ]);

  getServices() {
    return this.services.asReadonly();
  }

  getServicesByCategory(category: string) {
    return this.services().filter(service => service.category === category);
  }

  getServiceById(id: number) {
    return this.services().find(service => service.id === id);
  }

  toggleSave(serviceId: number) {
    console.log('Toggle save for service:', serviceId);
  }
}