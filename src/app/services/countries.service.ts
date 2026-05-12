import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Country {
  name: { common: string; official: string };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  area: number;
  flags: { png: string; svg: string; alt?: string };
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private http   = inject(HttpClient);
  private apiUrl = 'https://restcountries.com/v3.1';

  
  getPhilippinesData(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/PHL`).pipe(
      catchError(err =>
        throwError(() => new Error('Could not load country data. Check your internet connection.'))
      )
    );
  }

  getCountryByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      catchError(err =>
        throwError(() => new Error(`Could not load data for country code: ${code}.`))
      )
    );
  }
}