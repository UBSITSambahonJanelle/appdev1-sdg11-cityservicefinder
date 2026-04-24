import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Country {
  name: { common: string };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  area: number;
  flags: { png: string; svg: string };
  currencies: any;
  languages: any;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private http = inject(HttpClient);
  private apiUrl = 'https://restcountries.com/v3.1';

  getPhilippinesData(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/philippines`);
  }

  getCountryByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`);
  }
}