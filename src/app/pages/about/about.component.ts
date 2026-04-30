

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService, Country } from '../../services/countries.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private countriesService = inject(CountriesService);

  
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
}
