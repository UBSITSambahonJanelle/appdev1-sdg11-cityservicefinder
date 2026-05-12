import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, WeatherWidgetComponent, QuickActionsComponent, ServiceCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private cityService = inject(CityService);
  private router = inject(Router);
  
  searchQuery = '';
  searchResults: any[] = [];
  searchSuggestions: string[] = [];
  showResults = false;
  showSuggestions = false;
  
  
  popularSearches = [
    'Police Station', 'Hospital', 'Fire Station', 'City Hall',
    'Market', 'Public Transport', 'Health Center', 'Welfare Office',
    'Employment', 'Water District', 'BENECO', 'Tourism'
  ];
  
  stats = [
    { value: '24/7', label: 'Emergency hotlines' },
    { value: '12', label: 'Jeepney routes' },
    { value: '6', label: 'City services listed' }
  ];

  get featuredServices() {
    return this.cityService.getAllServices().slice(0, 6);
  }

  isSaved(id: number): boolean {
    return this.cityService.isSaved(id);
  }

  onToggleSave(serviceId: number): void {
    this.cityService.toggleSave(serviceId);
  }
  
  onSearchFocus() {
    if (!this.searchQuery) {
      this.showSuggestions = true;
      this.showResults = false;
      this.updateSuggestions();
    } else {
      this.showSuggestions = true;
      this.updateSuggestions();
    }
  }
  
  onSearchBlur() {
    
    setTimeout(() => {
      this.showSuggestions = false;
      this.showResults = false;
    }, 200);
  }
  
  onSearchInput() {
    if (!this.searchQuery.trim()) {
      this.showSuggestions = true;
      this.showResults = false;
      this.searchResults = [];
      this.updateSuggestions();
      return;
    }
    
    this.showSuggestions = true;
    this.updateSuggestions();
    this.performSearch();
  }
  
  updateSuggestions() {
    const query = this.searchQuery.toLowerCase();
    const allServices = this.cityService.getAllServices();
    
    
    const matchingServices = allServices
      .filter(service => service.name.toLowerCase().includes(query))
      .slice(0, 5)
      .map(service => service.name);
    
    
    const matchingPopular = this.popularSearches
      .filter(popular => popular.toLowerCase().includes(query))
      .slice(0, 3);
    
    this.searchSuggestions = [...new Set([...matchingServices, ...matchingPopular])];
  }
  
  performSearch() {
    const query = this.searchQuery.toLowerCase();
    const allServices = this.cityService.getAllServices();
    
    this.searchResults = allServices.filter(service => 
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.address?.toLowerCase().includes(query)
    );
    
    this.showResults = true;
    this.showSuggestions = false;
  }
  
  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.showSuggestions = false;
    this.performSearch();
  }
  
  clearSearch() {
    this.searchQuery = '';
    this.showResults = false;
    this.showSuggestions = true;
    this.searchResults = [];
    this.updateSuggestions();
  }
  
  goToService(serviceId: number) {
    this.router.navigate(['/city-services', serviceId]);
    this.clearSearch();
  }
}