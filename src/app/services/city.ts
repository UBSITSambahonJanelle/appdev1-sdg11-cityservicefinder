import { Injectable, signal, computed } from '@angular/core';
import { CityService as CityServiceModel } from '../models/service';

@Injectable({ providedIn: 'root' })
export class CityService {
  private servicesData = signal<CityServiceModel[]>([
    {
      id: 1,
      name: 'Baguio City Police Station',
      category: 'emergency',
      address: 'Gov. Pack Road, Baguio City',
      phone: '(074) 442-7511',
      description: 'Main police station handling emergency response and public safety in Baguio City.',
      hours: '24 hours',
      isOpen: true
    },
    {
      id: 2,
      name: 'Baguio General Hospital',
      category: 'health',
      address: 'Bokawkan Road, Baguio City',
      phone: '(074) 442-3151',
      description: 'Primary public hospital serving the Cordillera Administrative Region.',
      hours: '24 hours',
      isOpen: true
    },
    {
      id: 3,
      name: 'Bureau of Fire Protection — Baguio',
      category: 'emergency',
      address: 'Session Road, Baguio City',
      phone: '(074) 442-2222',
      description: 'Fire suppression and prevention services for Baguio City.',
      hours: '24 hours',
      isOpen: true
    },
    {
      id: 4,
      name: 'City Social Welfare Office',
      category: 'welfare',
      address: 'City Hall Complex, Baguio City',
      phone: '(074) 442-6816',
      description: 'Social protection programs, livelihood assistance, and community development.',
      hours: 'Mon–Fri 8AM–5PM',
      isOpen: true
    },
    {
      id: 5,
      name: 'Public Employment Service Office',
      category: 'employment',
      address: 'City Hall Annex, Baguio City',
      phone: '(074) 300-6418',
      description: 'Job placement assistance, livelihood programs, and employment facilitation.',
      hours: 'Mon–Fri 8AM–5PM',
      isOpen: true
    },
  ]);

  private savedIds = signal<number[]>([]);

  readonly savedServices = computed(() =>
    this.servicesData().filter(s => this.savedIds().includes(s.id))
  );

  readonly servicesByCategory = computed(() => {
    const all = this.servicesData();
    return {
      emergency: all.filter(s => s.category === 'emergency'),
      health: all.filter(s => s.category === 'health'),
      welfare: all.filter(s => s.category === 'welfare'),
      employment: all.filter(s => s.category === 'employment'),
    };
  });

  getAllServices(): CityServiceModel[] {
    return this.servicesData();
  }

  getServiceById(id: number): CityServiceModel | undefined {
    return this.servicesData().find(s => s.id === id);
  }

  toggleSave(id: number): void {
    const current = this.savedIds();
    if (current.includes(id)) {
      this.savedIds.set(current.filter(i => i !== id));
    } else {
      this.savedIds.set([...current, id]);
    }
  }

  isSaved(id: number): boolean {
    return this.savedIds().includes(id);
  }
}
