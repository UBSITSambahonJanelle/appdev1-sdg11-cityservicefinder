import { Component, inject, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CityService } from '../../services/city.service';
import { CityService as CityServiceModel } from '../../models/service';

interface SearchResult {
  id: number;
  name: string;
  category: string;
  description: string;
  phone?: string;
  address?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  private cityService = inject(CityService);
  
  // Search
  searchQuery = '';
  showDropdown = false;
  searchResults = signal<SearchResult[]>([]);
  
  // Route tracking
  currentRoute = '';
  showSearchBar = true;
  
  // Mobile menu
  isMobileMenuOpen = false;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
      this.showSearchBar = !(this.currentRoute === '/' || this.currentRoute === '/home');
      this.closeMobileMenu();
    });
    
    const initialUrl = this.router.url;
    this.showSearchBar = !(initialUrl === '/' || initialUrl === '/home');
  }

  private getAllServices(): CityServiceModel[] {
    return this.cityService.getAllServices();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  onSearchInput(): void {
    const query = this.searchQuery.toLowerCase().trim();
    
    if (!query) {
      this.searchResults.set([]);
      this.showDropdown = false;
      return;
    }
    
    const allServices = this.getAllServices();
    const results = allServices.filter(service =>
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      (service.phone && service.phone.includes(query)) ||
      (service.alternativePhone && service.alternativePhone.includes(query))
    );
    
    this.searchResults.set(results.slice(0, 8).map(s => ({
      id: s.id,
      name: s.name,
      category: s.category,
      description: s.description,
      phone: s.phone,
      address: s.address
    })));
    this.showDropdown = results.length > 0;
  }

  selectResult(service: SearchResult): void {
    this.searchQuery = '';
    this.showDropdown = false;
    this.router.navigate(['/city-services', service.id]);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults.set([]);
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(target)) {
      this.showDropdown = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  getCategoryIcon(category: string): string {
    switch(category.toLowerCase()) {
      case 'emergency': return '🚨';
      case 'health': return '🏥';
      case 'welfare': return '🤝';
      case 'employment': return '💼';
      case 'government': return '🏛️';
      case 'transport': return '🚌';
      case 'utilities': return '⚡';
      default: return '📌';
    }
  }

  getCategoryColor(category: string): string {
    switch(category.toLowerCase()) {
      case 'emergency': return '#e74c3c';
      case 'health': return '#2ecc71';
      case 'welfare': return '#9b59b6';
      case 'employment': return '#3498db';
      case 'government': return '#f39c12';
      case 'transport': return '#1abc9c';
      case 'utilities': return '#95a5a6';
      default: return '#666';
    }
  }
}