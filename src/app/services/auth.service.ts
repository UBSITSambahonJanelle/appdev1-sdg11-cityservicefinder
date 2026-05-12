import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private readonly USERS_KEY = 'registered_users';
  
  
  private isAuthenticatedSignal = signal<boolean>(false);
  private currentUserSignal = signal<User | null>(null);
  
 
  isLoggedIn = computed(() => this.isAuthenticatedSignal());
  currentUser = computed(() => this.currentUserSignal());
  userName = computed(() => this.currentUserSignal()?.name || 'Guest');
  userAvatar = computed(() => this.currentUserSignal()?.avatar || '👤');
  
  constructor() {
    this.checkAuthState();
    this.initUserStorage();
  }
  
  private initUserStorage(): void {
    
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
    }
  }
  
  private checkAuthState(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY);
    
    if (token && userData) {
      this.isAuthenticatedSignal.set(true);
      this.currentUserSignal.set(JSON.parse(userData));
    }
  }
  
  login(email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> {
    return new Promise((resolve) => {
      
      if (!email || !email.includes('@')) {
        resolve({ success: false, message: 'Please enter a valid email address.' });
        return;
      }
      
     
      if (!password || password.length < 1) {
        resolve({ success: false, message: 'Please enter your password.' });
        return;
      }
      
      
      const storedUsers = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
      const user = storedUsers.find((u: any) => u.email === email);
      
      
      if (!user) {
        resolve({ success: false, message: 'No account found with this email. Please create an account first.' });
        return;
      }
      
     
      localStorage.setItem(this.TOKEN_KEY, 'demo_token_' + Date.now());
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      this.isAuthenticatedSignal.set(true);
      this.currentUserSignal.set(user);
      
      resolve({ 
        success: true, 
        message: 'Welcome back, ' + user.name + '!',
        user 
      });
    });
  }
  
  signup(name: string, email: string, password: string): Promise<{ success: boolean; message?: string }> {
    return new Promise((resolve) => {
     
      if (!name || name.trim().length < 2) {
        resolve({ success: false, message: 'Please enter your full name.' });
        return;
      }
      
     
      if (!email || !email.includes('@')) {
        resolve({ success: false, message: 'Please enter a valid email address.' });
        return;
      }
      
     
      if (!password || password.length < 6) {
        resolve({ success: false, message: 'Password must be at least 6 characters.' });
        return;
      }
      
      
      const storedUsers = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
      const existingUser = storedUsers.find((u: any) => u.email === email);
      
      if (existingUser) {
        resolve({ success: false, message: 'An account with this email already exists. Please login.' });
        return;
      }
      
      
      const newUser: User = {
        id: Date.now(),
        email: email,
        name: name.trim(),
        role: 'user',
        avatar: '👤'
      };
      
      storedUsers.push(newUser);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(storedUsers));
      
      resolve({ 
        success: true, 
        message: 'Account created successfully! Please login.'
      });
    });
  }
  
  logout(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      this.isAuthenticatedSignal.set(false);
      this.currentUserSignal.set(null);
      resolve();
    });
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  isEmailRegistered(email: string): boolean {
    const storedUsers = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    return storedUsers.some((u: any) => u.email === email);
  }
}