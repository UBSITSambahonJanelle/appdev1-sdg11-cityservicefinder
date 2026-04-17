import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = signal<boolean>(false);
  readonly displayName = computed(() =>
    this.loggedIn() ? 'Baguio Resident' : 'Guest'
  );

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  login(): void {
    this.loggedIn.set(true);
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}
