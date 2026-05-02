import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, startWith, map } from 'rxjs';
import { CountriesService, Country } from '../../services/countries.service';

interface CountryState {
  loading: boolean;
  data: Country | null;
  error: string | null;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  private countriesService = inject(CountriesService);

  philippinesState$: Observable<CountryState> =
    this.countriesService.getPhilippinesData().pipe(
      map(countries => ({ loading: false, data: countries[0], error: null })),
      catchError(err => of({ loading: false, data: null, error: err.message as string })),
      startWith({ loading: true, data: null, error: null })
    );
}