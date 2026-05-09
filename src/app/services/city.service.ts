import { Injectable, signal, computed, effect } from '@angular/core';
import { CityService as CityServiceModel } from '../models/service';

@Injectable({ providedIn: 'root' })
export class CityService {

  private servicesData = signal<CityServiceModel[]>([
    // ========== EMERGENCY SERVICES ==========
    {
      id: 1,
      name: 'Baguio City Police Station (BCPO)',
      category: 'emergency',
      address: 'Gov. Pack Road, Baguio City, Benguet 2600',
      phone: '0917-575-8993',
      alternativePhone: '0998-598-7739',
      description: 'The main police station of Baguio City responsible for emergency response, crime prevention, and public order maintenance.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 2,
      name: 'National Emergency Hotline 911',
      category: 'emergency',
      address: 'Nationwide',
      phone: '911',
      description: 'National emergency hotline. Connects you to police, fire, and medical services anywhere in the Philippines.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 3,
      name: 'Bureau of Fire Protection — Baguio City',
      category: 'emergency',
      address: 'Session Road, Baguio City, Benguet 2600',
      phone: '911',
      description: 'Responsible for fire suppression, fire prevention, and emergency rescue services. For fire emergencies, always call 911.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 4,
      name: 'Baguio City CDRRMO',
      category: 'emergency',
      address: 'City Hall, Magsaysay Avenue, Baguio City 2600',
      phone: '(074) 300-6165',
      description: 'City Disaster Risk Reduction and Management Office. Coordinates emergency preparedness, disaster response, typhoon, landslide, and earthquake response.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 5,
      name: 'Baguio City Emergency Medical Services (EMS)',
      category: 'emergency',
      address: 'Emergency Operations Center, Baguio City',
      phone: '143',
      description: 'Emergency medical services and ambulance response for medical emergencies in Baguio City.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 6,
      name: 'Philippine Red Cross - Baguio Chapter',
      category: 'emergency',
      address: 'No. 35 South Drive, Baguio City',
      phone: '(074) 619-0097',
      description: 'Disaster relief operations, blood donation services, search and rescue, and community first aid training.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 7,
      name: 'Baguio City Anti-Cyber Crime Unit',
      category: 'emergency',
      address: 'Baguio City, Benguet',
      phone: '0908-899-7228',
      description: 'For reporting fake social media accounts, online scams, identity theft, and other cyber-related crimes.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },

    // ========== HEALTH SERVICES ==========
    {
      id: 8,
      name: 'Baguio General Hospital and Medical Center (BGHMC)',
      category: 'health',
      address: 'Bokawkan Road, Baguio City, Benguet 2600',
      phone: '(074) 661-7910',
      description: 'The primary government hospital serving Baguio City and the Cordillera Administrative Region. Provides emergency care, outpatient services, and specialty clinics. Mental Health Crisis Line: 0956-991-6841.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 9,
      name: 'Saint Louis University Hospital of the Sacred Heart',
      category: 'health',
      address: 'A. Bonifacio Street, Baguio City, Benguet 2600',
      phone: '(074) 447-4794',
      description: 'Private tertiary hospital providing comprehensive medical services including emergency care, surgery, and specialized treatment. Emergency: (074) 447-4794 loc 110.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 10,
      name: 'Notre Dame de Chartres Hospital',
      category: 'health',
      address: 'General Luna Road, Baguio City',
      phone: '(074) 442-2407',
      description: 'Private hospital offering general medical services, maternity care, and outpatient consultations.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 11,
      name: 'Pines City Doctors Hospital',
      category: 'health',
      address: '40 North Drive, Baguio City',
      phone: '(074) 442-4888',
      description: 'Private hospital offering multi-specialty medical services, emergency care, and diagnostic services.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 12,
      name: 'Baguio City Health Services Office',
      category: 'health',
      address: 'Military Cut-off, Baguio City',
      phone: '(074) 442-5678',
      description: 'City health department offering free checkups, vaccinations, maternal care, and public health programs. Mental Health Hotline: 0919-069-6361.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 13,
      name: 'Baguio Medical Center',
      category: 'health',
      address: 'Km. 4 Asin Road, Baguio City',
      phone: '(074) 442-8040',
      description: 'Government hospital providing quality healthcare services to Baguio City residents.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },

    // ========== WELFARE SERVICES ==========
    {
      id: 14,
      name: 'City Social Welfare and Development Office (CSWDO)',
      category: 'welfare',
      address: 'City Hall Complex, Magsaysay Avenue, Baguio City 2600',
      phone: '0967-208-4777',
      alternativePhone: '0951-750-5039',
      description: 'Provides social protection programs, livelihood assistance, and community development services. 24/7 Crisis Hotline available.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM (Hotline 24/7)',
      isOpen: true
    },
    {
      id: 15,
      name: 'DSWD Field Office - CAR',
      category: 'welfare',
      address: '40 North Drive, Baguio City',
      phone: '(074) 442-2938',
      description: 'Department of Social Welfare and Development regional office. Handles social pension, assistance to individuals in crisis, and disaster response.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 16,
      name: 'Baguio City Elderly Affairs Office',
      category: 'welfare',
      address: 'City Hall, Magsaysay Avenue, Baguio City',
      phone: '(074) 442-8214',
      description: 'Office dedicated to senior citizens services, social pension distribution, and elderly welfare programs.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 17,
      name: 'Baguio City Persons with Disability Affairs Office (PDAO)',
      category: 'welfare',
      address: 'City Hall, Magsaysay Avenue, Baguio City',
      phone: '(074) 442-8215',
      description: 'Provides services, programs, and assistance for persons with disabilities in Baguio City.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },

    // ========== EMPLOYMENT SERVICES ==========
    {
      id: 18,
      name: 'Public Employment Service Office (PESO)',
      category: 'employment',
      address: 'City Hall Annex, Harrison Road, Baguio City 2600',
      phone: '(074) 300-6418',
      description: 'Assists Baguio City residents with job placement, career guidance, livelihood training, and DOLE employment facilitation programs.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 19,
      name: 'Department of Labor and Employment — CAR (DOLE)',
      category: 'employment',
      address: 'Assumption Road, Baguio City, Benguet 2600',
      phone: '(074) 442-6982',
      description: 'Regional DOLE office covering the Cordillera Administrative Region. Handles labor standards enforcement, workers\' rights, and employment programs.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 20,
      name: 'TESDA - Baguio Provincial Office',
      category: 'employment',
      address: 'Lourdes Subdivision, Baguio City',
      phone: '(074) 442-2478',
      description: 'Technical Education and Skills Development Authority. Provides skills training, assessment, and certification programs.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },

    // ========== GOVERNMENT SERVICES ==========
    {
      id: 21,
      name: 'Baguio City Hall',
      category: 'government',
      address: 'Magsaysay Avenue, Baguio City, Benguet 2600',
      phone: '(074) 442-8050',
      description: 'Main government office of Baguio City for permits, business registration, and public services.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 22,
      name: 'Baguio City Permits and Licensing Office',
      category: 'government',
      address: 'City Hall, Magsaysay Avenue, Baguio City',
      phone: '(074) 442-8052',
      description: 'Handles business permits, mayor\'s permits, and other government licenses.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 23,
      name: 'Baguio City Tourism Office',
      category: 'government',
      address: 'Burnham Park, Baguio City',
      phone: '(074) 442-8571',
      description: 'Provides tourist information, assistance, and promotes Baguio City as a top destination.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 24,
      name: 'Baguio City Public Library',
      category: 'government',
      address: 'Harrison Road, Baguio City',
      phone: '(074) 442-8212',
      description: 'Public library offering free reading materials, research resources, and study spaces for Baguio City residents.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },

    // ========== TRANSPORT SERVICES ==========
    {
      id: 25,
      name: 'Baguio City Transport and Traffic Management Office (CTTMO)',
      category: 'transport',
      address: 'Magsaysay Avenue, Baguio City',
      phone: '(074) 442-8216',
      description: 'Manages traffic flow, jeepney route enforcement, and public transport regulation in Baguio City.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 26,
      name: 'Victory Liner Baguio Terminal',
      category: 'transport',
      address: 'Governor Pack Road, Baguio City',
      phone: '(074) 442-1234',
      description: 'Provincial bus terminal with trips to Manila, Pangasinan, and other destinations.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 27,
      name: 'Genesis Transport Baguio Terminal',
      category: 'transport',
      address: 'Governor Pack Road, Baguio City',
      phone: '(074) 442-8468',
      description: 'Premium bus service offering trips to Manila and Clark International Airport.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },
    {
      id: 28,
      name: 'Dangwa Bus Terminal',
      category: 'transport',
      address: 'Dangwa, Baguio City',
      phone: '(074) 442-8213',
      description: 'Terminal for buses going to various destinations in the Cordillera region.',
      hours: 'Open 24 hours, 7 days a week',
      isOpen: true
    },

    // ========== UTILITIES ==========
    {
      id: 29,
      name: 'BENECO - Baguio Main Office',
      category: 'utilities',
      address: 'South Drive, Baguio City',
      phone: '(074) 422-4021',
      description: 'Benguet Electric Cooperative - handles electricity distribution and power concerns. You can also report concerns through the "Beneco Mo Ito" mobile app.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    },
    {
      id: 30,
      name: 'Baguio Water District',
      category: 'utilities',
      address: 'Engineers Hill, Baguio City',
      phone: '(074) 442-2225',
      description: 'Manages water supply and distribution. Handles bill inquiries, water concerns, and service requests.',
      hours: 'Monday to Friday, 8:00 AM – 5:00 PM',
      isOpen: true
    }
  ]);

  private savedIds = signal<number[]>(
    JSON.parse(localStorage.getItem('csf_savedIds') ?? '[]')
  );

  constructor() {
    effect(() => {
      localStorage.setItem('csf_savedIds', JSON.stringify(this.savedIds()));
    });
  }

  readonly savedServices = computed(() =>
    this.servicesData().filter(s => this.savedIds().includes(s.id))
  );

  readonly servicesByCategory = computed(() => {
    const all = this.servicesData();
    return {
      emergency:  all.filter(s => s.category === 'emergency'),
      health:     all.filter(s => s.category === 'health'),
      welfare:    all.filter(s => s.category === 'welfare'),
      employment: all.filter(s => s.category === 'employment'),
      government: all.filter(s => s.category === 'government'),
      transport:  all.filter(s => s.category === 'transport'),
      utilities:  all.filter(s => s.category === 'utilities'),
    };
  });

  getAllServices(): CityServiceModel[] { 
    return this.servicesData(); 
  }
  
  getServiceById(id: number): CityServiceModel | undefined { 
    return this.servicesData().find(s => s.id === id); 
  }
  
  isSaved(id: number): boolean { 
    return this.savedIds().includes(id); 
  }

  toggleSave(id: number): void {
    const current = this.savedIds();
    this.savedIds.set(
      current.includes(id) ? current.filter(i => i !== id) : [...current, id]
    );
  }
}