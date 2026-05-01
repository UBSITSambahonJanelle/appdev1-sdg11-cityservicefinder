<<<<<<< Updated upstream
import { Component, OnInit, inject, signal } from '@angular/core';
=======
import { Component, inject } from '@angular/core';
>>>>>>> Stashed changes
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, startWith, map } from 'rxjs';
import { CountriesService, Country } from '../../services/countries.service';
<<<<<<< Updated upstream
=======

interface CountryState {
  loading: boolean;
  data: Country | null;
  error: string | null;
}
>>>>>>> Stashed changes

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  private countriesService = inject(CountriesService);
<<<<<<< Updated upstream
  
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
=======

  philippinesState$: Observable<CountryState> =
    this.countriesService.getPhilippinesData().pipe(
      map(countries => ({ loading: false, data: countries[0], error: null })),
      catchError(err => of({ loading: false, data: null, error: err.message as string })),
      startWith({ loading: true, data: null, error: null })
    );
>>>>>>> Stashed changes
}