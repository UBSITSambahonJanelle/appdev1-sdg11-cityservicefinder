import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="emergency">
      <!-- Hero Section - Red Gradient (Emergency Style) -->
      <div class="hero emergency-hero">
        <div class="hero-content">
          <h1>Emergency Contacts</h1>
          <p>Baguio City hotlines and emergency services. In a life-threatening emergency, always call <strong>911</strong> first.</p>
        </div>
      </div>
      
      <!-- Contacts Grid -->
      <div class="contacts">
        <div class="contact-card" *ngFor="let contact of emergencyContacts">
          <div class="contact-icon">{{ contact.icon }}</div>
          <div class="contact-info">
            <div class="contact-type">{{ contact.name }}</div>
            <h3>{{ contact.organization }}</h3>
            <p>{{ contact.description }}</p>
            <a [href]="'tel:' + contact.phone" class="contact-phone">📞 {{ contact.phone }}</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .emergency {
      width: 100%;
      min-height: calc(100vh - 200px);
    }

    /* Hero Section - Same styling as Home but RED */
    .hero {
      text-align: center;
      padding: 60px 20px;
      width: 100%;
    }

    .emergency-hero {
      background: linear-gradient(135deg, #c0392b, #e74c3c);
      color: white;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero h1 {
      font-size: 2rem;
      margin-bottom: 15px;
    }

    .hero p {
      font-size: 1rem;
      margin-bottom: 0;
      line-height: 1.5;
    }

    .hero strong {
      color: #ffcc00;
    }

    /* Contacts Grid */
    .contacts {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      padding: 40px 20px;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .contact-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      gap: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .contact-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    }

    .contact-icon {
      font-size: 2rem;
    }

    .contact-type {
      font-size: 0.7rem;
      font-weight: bold;
      color: #c0392b;
      margin-bottom: 5px;
      letter-spacing: 1px;
    }

    .contact-info h3 {
      font-size: 1rem;
      margin-bottom: 8px;
      color: #1B4332;
    }

    .contact-info p {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 10px;
      line-height: 1.4;
    }

    .contact-phone {
      display: inline-block;
      background: #e8f5e9;
      color: #1B4332;
      padding: 5px 12px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: bold;
    }

    .contact-phone:hover {
      background: #1B4332;
      color: white;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero {
        padding: 40px 15px;
      }
      .hero h1 {
        font-size: 1.5rem;
      }
      .hero p {
        font-size: 0.9rem;
      }
      .contacts {
        padding: 20px 15px;
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class EmergencyComponent {
  emergencyContacts = [
    { icon: '🆘', name: 'SOS', organization: 'National Emergency Hotline', description: 'For any life-threatening emergency anywhere in the Philippines. Police, fire, medical.', phone: '911' },
    { icon: '👮', name: 'POLICE', organization: 'Baguio City Police Station', description: 'Main police station at Gov. Pack Road. Crime reporting and emergency response.', phone: '(074) 442-7511' },
    { icon: '🔥', name: 'FIRE', organization: 'Bureau of Fire Protection', description: 'Fire suppression, rescue, and prevention services for Baguio City.', phone: '(074) 442-2222' },
    { icon: '🏥', name: 'MEDICAL', organization: 'Baguio General Hospital', description: 'Primary public hospital. Emergency room open 24/7 at Bokawkan Road.', phone: '(074) 442-3151' },
    { icon: '🌊', name: 'DISASTER', organization: 'CDRRMO Baguio', description: 'City Disaster Risk Reduction Office. Typhoon, landslide, and flood response.', phone: '(074) 300-6165' },
    { icon: '🩸', name: 'RELIEF', organization: 'Philippine Red Cross — Baguio', description: 'Disaster relief, blood donation, search and rescue, and first aid services.', phone: '(074) 619-0097' }
  ];
}