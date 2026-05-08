
import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { CityService } from '../../services/city.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherWidgetComponent, QuickActionsComponent, ServiceCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cityService = inject(CityService);
  authService = inject(AuthService);
  today = new Date();

  stats = [
    { number: 3, title: 'Emergency', color: '#C0392B' },
    { number: 1, title: 'Health',    color: '#5B8FA8' },
    { number: 1, title: 'Welfare',   color: '#3A7D44' },
    { number: 1, title: 'Employment',color: '#D4622A' },
  ];

 
  private savedEffect = effect(() => {
    const count = this.cityService.savedServices().length;
    
    console.log(`[Dashboard effect] Saved services count: ${count}`);
  });

  onToggleSave(id: number): void {
    this.cityService.toggleSave(id);
  }
}
