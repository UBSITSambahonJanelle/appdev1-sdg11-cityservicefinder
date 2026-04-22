import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService, Country } from '../../services/countries';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
})
export class AboutComponent implements OnInit {
  private countriesService = inject(CountriesService);
  
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';
  loading: boolean = true;

  ngOnInit() {
    this.countriesService.getAllCountries().subscribe({
      next: (data: Country[]) => {
        this.countries = data;
        this.filteredCountries = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    
    this.filteredCountries = this.countries.filter((country: Country) =>
      country.name.common.toLowerCase().includes(this.searchTerm)
    );
  }

  getCapital(country: Country): string {
    return country.capital && country.capital[0] ? country.capital[0] : 'N/A';
  }
}