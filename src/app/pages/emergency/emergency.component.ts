import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent {
  emergencyContacts = [
    {
      icon: '🆘',
      name: 'NATIONAL EMERGENCY',
      organization: 'National Emergency Hotline',
      description: 'For any life-threatening emergency anywhere in the Philippines. Connects you to police, fire, or medical services.',
      phone: '911'
    },
    {
      icon: '👮',
      name: 'POLICE',
      organization: 'Baguio City Police Station',
      description: 'Main police station at Gov. Pack Road. Handles crime reporting, emergency response, and public safety throughout Baguio City.',
      phone: '(074) 442-7511'
    },
    {
      icon: '🔥',
      name: 'FIRE',
      organization: 'Bureau of Fire Protection — Baguio',
      description: 'Fire suppression, rescue, and fire prevention services for Baguio City and surrounding barangays.',
      phone: '(074) 442-2222'
    },
    {
      icon: '🏥',
      name: 'MEDICAL',
      organization: 'Baguio General Hospital and Medical Center',
      description: 'Primary government hospital with a 24/7 emergency room at Bokawkan Road, Baguio City.',
      phone: '(074) 442-3151'
    },
    {
      icon: '🌧️',
      name: 'DISASTER RESPONSE',
      organization: 'CDRRMO Baguio City',
      description: 'City Disaster Risk Reduction and Management Office. Coordinates response to typhoons, landslides, flooding, and earthquakes.',
      phone: '(074) 300-6165'
    },
    {
      icon: '🩸',
      name: 'RELIEF & RESCUE',
      organization: 'Philippine Red Cross — Baguio Chapter',
      description: 'Disaster relief operations, blood donation services, search and rescue, and community first aid training.',
      phone: '(074) 619-0097'
    }
  ];
}