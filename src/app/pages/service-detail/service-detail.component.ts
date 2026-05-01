import { Component, Input, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  @Input() id!: string;

  private cityService = inject(CityService);
  private _service = signal<CityServiceModel | undefined>(undefined);
  service  = computed(() => this._service());
  isSaved  = computed(() => this.cityService.isSaved(Number(this.id)));

  ngOnInit(): void {
    this._service.set(this.cityService.getServiceById(Number(this.id)));
  }

  toggleSave(): void {
    this.cityService.toggleSave(Number(this.id));
  }
}