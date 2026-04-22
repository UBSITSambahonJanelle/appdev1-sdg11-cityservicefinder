import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../../services/city';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-detail.html',
})
export class ServiceDetailComponent {
  private route = inject(ActivatedRoute);
  private cityService = inject(CityService);

  service = this.cityService.getServiceById(
    Number(this.route.snapshot.paramMap.get('id'))
  );
}