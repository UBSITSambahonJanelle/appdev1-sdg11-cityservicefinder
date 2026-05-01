import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-saved-services',
  standalone: true,
  imports: [CommonModule, RouterLink, ServiceCardComponent],
  templateUrl: './saved-services.component.html',
  styleUrls: ['./saved-services.component.css']
})
export class SavedServicesComponent {
  cityService = inject(CityService);

  onToggleSave(id: number): void {
    this.cityService.toggleSave(id);
  }
}