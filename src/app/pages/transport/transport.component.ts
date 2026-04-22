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
    { code: 'J-1', name: 'SM City – Session Road', route: 'SM City Baguio → Session Road', fare: '₱13', schedule: '5:30 AM – 9:00 PM', stops: 'Burnham Park - Harrison Road - Session Road', type: 'Jeepney' },
    { code: 'J-2', name: 'Magsaysay – Mines View', route: 'Magsaysay Avenue → Mines View Park', fare: '₱15', schedule: '6:00 AM – 7:00 PM', stops: 'City Hall - Good Shepherd - Mines View Park', type: 'Jeepney' },
    { code: 'J-3', name: 'Dangwa – Baguio Market', route: 'Dangwa Terminal → City Market', fare: '₱13', schedule: '5:00 AM – 8:00 PM', stops: 'Kayang St - Magsaysay Ave - City Market', type: 'Jeepney' },
    { code: 'T-1', name: 'City Taxi', route: 'Anywhere → Anywhere', fare: '₱40 flag down', schedule: '24 hours', stops: 'Available citywide', type: 'Taxi' },
    { code: 'B-1', name: 'Victory Liner', route: 'Baguio → Manila', fare: '₱450', schedule: 'Hourly trips', stops: 'Terminal to Terminal', type: 'Bus' }
  ];
  
  get filteredRoutes() {
    if (this.selectedFilter === 'All Routes') return this.routes;
    return this.routes.filter(r => r.type === this.selectedFilter);
  }
  
  setFilter(filter: string) {
    this.selectedFilter = filter;
  }
}