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
    { icon: '🆘', name: 'SOS', organization: 'National Emergency Hotline', description: 'For any life-threatening emergency anywhere in the Philippines. Police, fire, medical.', phone: '911', type: 'emergency' },
    { icon: '👮', name: 'POLICE', organization: 'Baguio City Police Station', description: 'Main police station at Gov. Pack Road. Crime reporting and emergency response.', phone: '(074) 442-7511', type: 'police' },
    { icon: '🔥', name: 'FIRE', organization: 'Bureau of Fire Protection', description: 'Fire suppression, rescue, and prevention services for Baguio City.', phone: '(074) 442-2222', type: 'fire' },
    { icon: '🏥', name: 'MEDICAL', organization: 'Baguio General Hospital', description: 'Primary public hospital. Emergency room open 24/7 at Bokawkan Road.', phone: '(074) 442-3151', type: 'medical' },
    { icon: '🌊', name: 'DISASTER', organization: 'CDRRMO Baguio', description: 'City Disaster Risk Reduction Office. Typhoon, landslide, and flood response.', phone: '(074) 300-6165', type: 'disaster' },
    { icon: '🩸', name: 'RELIEF', organization: 'Philippine Red Cross — Baguio', description: 'Disaster relief, blood donation, search and rescue, and first aid services.', phone: '(074) 619-0097', type: 'relief' }
  ];
}