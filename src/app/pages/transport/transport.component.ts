import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {
  selectedFilter = 'All Routes';
  filters = ['All Routes', 'Jeepney', 'Taxi', 'Bus'];
  
  routes = [
    { code: 'J-1', name: 'SM City – Session Road', from: 'SM City Baguio', to: 'Session Road', fare: 13, schedule: '5:30 AM – 9:00 PM', stops: 'Burnham Park - Harrison Road - Session Road', type: 'jeepney' },
    { code: 'J-2', name: 'Magsaysay – Mines View', from: 'Magsaysay Avenue', to: 'Mines View Park', fare: 15, schedule: '6:00 AM – 7:00 PM', stops: 'City Hall - Good Shepherd - Mines View Park', type: 'jeepney' },
    { code: 'J-3', name: 'Dangwa – Baguio Market', from: 'Dangwa Terminal', to: 'City Market', fare: 13, schedule: '5:00 AM – 8:00 PM', stops: 'Kayang St - Magsaysay Ave - City Market', type: 'jeepney' },
    { code: 'T-1', name: 'City Taxi', from: 'Anywhere', to: 'Anywhere', fare: 40, schedule: '24 hours', stops: 'Available citywide', type: 'taxi' },
    { code: 'B-1', name: 'Victory Liner', from: 'Baguio Terminal', to: 'Manila', fare: 450, schedule: 'Hourly trips', stops: 'Terminal to Terminal', type: 'bus' }
  ];
  
  get filteredRoutes() {
    if (this.selectedFilter === 'All Routes') return this.routes;
    return this.routes.filter(r => r.type === this.selectedFilter.toLowerCase());
  }
}