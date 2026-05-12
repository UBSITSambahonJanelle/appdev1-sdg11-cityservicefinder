import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CityService } from '../../services/city.service';
import { CityService as CityServiceModel } from '../../models/service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  private cityService = inject(CityService);
  private route = inject(ActivatedRoute);
  
  service: CityServiceModel | undefined;
  isSaved = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service = this.cityService.getServiceById(id);
    if (this.service) {
      this.isSaved = this.cityService.isSaved(this.service.id);
    }
  }

  toggleSave(): void {
    if (this.service) {
      this.cityService.toggleSave(this.service.id);
      this.isSaved = this.cityService.isSaved(this.service.id);
    }
  }
}