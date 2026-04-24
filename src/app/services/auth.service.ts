import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = signal(false);
  
  isLoggedIn(): boolean {
    const stored = localStorage.getItem('isLoggedIn');
    this.loggedIn.set(stored === 'true');
    return this.loggedIn();
  }
  
  login(email: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedIn.set(true);
  }
  
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.loggedIn.set(false);
  }
}