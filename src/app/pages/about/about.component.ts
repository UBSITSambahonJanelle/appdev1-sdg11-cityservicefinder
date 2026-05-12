import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface CountryData {
  name: {
    common: string;
  };
  capital: string[];
  population: number;
  region: string;
  area: number;
}

interface ApiState {
  loading: boolean;
  error: boolean;
  data: CountryData | null;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private http = inject(HttpClient);
  
  private philippinesSubject = new BehaviorSubject<ApiState>({
    loading: true,
    error: false,
    data: null
  });
  
  philippinesState$ = this.philippinesSubject.asObservable();

  ngOnInit(): void {
    this.fetchPhilippinesData();
  }

  private fetchPhilippinesData(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/name/philippines')
      .pipe(
        catchError((err) => {
          console.error('API Error:', err);
          this.philippinesSubject.next({
            loading: false,
            error: true,
            data: null
          });
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response && response[0]) {
          const country = response[0];
          const countryData: CountryData = {
            name: { common: country.name?.common || 'Philippines' },
            capital: country.capital || ['Manila'],
            population: country.population || 114123600,
            region: country.region || 'Asia',
            area: country.area || 342353
          };
          this.philippinesSubject.next({
            loading: false,
            error: false,
            data: countryData
          });
        } else {
          this.philippinesSubject.next({
            loading: false,
            error: true,
            data: null
          });
        }
      });
  }

  refreshData(): void {
    this.philippinesSubject.next({
      loading: true,
      error: false,
      data: null
    });
    this.fetchPhilippinesData();
  }
}