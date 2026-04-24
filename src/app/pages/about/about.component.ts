import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService, Country } from '../../services/countries.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private countriesService = inject(CountriesService);
  
  // Using signals for reactive state
  countryData = signal<Country | null>(null);
  loading = signal(true);
  error = signal(false);
  
  ngOnInit() {
    this.fetchPhilippinesData();
  }
  
  fetchPhilippinesData() {
    this.loading.set(true);
    this.error.set(false);
    
    // Set timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (this.loading()) {
        this.loading.set(false);
        this.error.set(true);
      }
    }, 8000);
    
    this.countriesService.getPhilippinesData().subscribe({
      next: (data: Country[]) => {
        clearTimeout(timeout);
        if (data && data[0]) {
          this.countryData.set(data[0]);
          this.loading.set(false);
          this.error.set(false);
        } else {
          this.loading.set(false);
          this.error.set(true);
        }
      },
      error: (err) => {
        clearTimeout(timeout);
        console.error('API Error:', err);
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }
}