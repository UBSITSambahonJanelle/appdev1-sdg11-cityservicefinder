import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

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
  private http = inject(HttpClient);
  private apiUrl = 'https://restcountries.com/v3.1';

  getPhilippinesData(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/PHL`).pipe(
      catchError(err => {
        console.error('CountriesService error:', err);
        return throwError(() => new Error('Could not load country data.'));
      })
    );
  }

  getCountryByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      catchError(err => throwError(() => new Error('Could not load country data.')))
    );
  }

  getSEAsiaCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/subregion/South-Eastern%20Asia?fields=name,population,capital,flags`).pipe(
      map((list: Country[]) => list.sort((a, b) => b.population - a.population).slice(0, 6)),
      catchError(err => throwError(() => new Error('Could not load regional data.')))
    );
  }
}