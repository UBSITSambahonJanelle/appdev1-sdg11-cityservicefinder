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
  
  philippines$!: Observable<Country[]>;
  seAsia$!: Observable<Country[]>;

  
  countryError = '';

  ngOnInit(): void {
    this.philippines$ = this.countriesService.getPhilippinesData();
    this.seAsia$      = this.countriesService.getSEAsiaCountries();

   
    this.philippines$.subscribe({
      error: (err: Error) => { this.countryError = err.message; }
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