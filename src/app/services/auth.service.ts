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
  private readonly USER_KEY = 'currentUser';
  private readonly USERS_KEY = 'registered_users';
  
  private isAuthenticatedSignal = signal<boolean>(false);
  private currentUserSignal = signal<User | null>(null);
  
  isLoggedIn = computed(() => this.isAuthenticatedSignal());
  currentUser = computed(() => this.currentUserSignal());
  userName = computed(() => this.currentUserSignal()?.name || 'Guest');
  userAvatar = computed(() => this.currentUserSignal()?.avatar || '👤');
  
  constructor() {
    this.initUserStorage();
    this.checkAuthState();
  }
  
  private initUserStorage(): void {
    if (!localStorage.getItem(this.USERS_KEY)) {
      const demoUsers = [
        { id: 1, email: 'demo@example.com', password: '123456', name: 'Demo User', role: 'user', avatar: '👤' },
        { id: 2, email: 'user@example.com', password: '123456', name: 'Test User', role: 'user', avatar: '👤' }
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(demoUsers));
      console.log('Demo users created. Try: demo@example.com / 123456');
    }
  }
  
  private checkAuthState(): void {
    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSignal.set(user);
      this.isAuthenticatedSignal.set(true);
    }
  }
  
  login(email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> {
    return new Promise((resolve) => {
      if (!email || !email.trim()) {
        resolve({ success: false, message: 'Please enter your email address.' });
        return;
      }
      if (!email.includes('@')) {
        resolve({ success: false, message: 'Please enter a valid email address.' });
        return;
      }
      if (!password || password.trim().length === 0) {
        resolve({ success: false, message: 'Please enter your password.' });
        return;
      }
      
      const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        // Create user object WITHOUT password for storage
        const loggedInUser: User = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar || '👤'
        };
        localStorage.setItem(this.USER_KEY, JSON.stringify(loggedInUser));
        this.currentUserSignal.set(loggedInUser);
        this.isAuthenticatedSignal.set(true);
        resolve({ success: true, message: `Welcome back, ${user.name}!`, user: loggedInUser });
      } else {
        const emailExists = users.find((u: any) => u.email === email);
        if (emailExists) {
          resolve({ success: false, message: 'Incorrect password. Please try again.' });
        } else {
          resolve({ success: false, message: 'No account found with this email. Please sign up first.' });
        }
      }
    });
  }
  
  signup(name: string, email: string, password: string): Promise<{ success: boolean; message?: string }> {
    return new Promise((resolve) => {
      if (!name || name.trim().length < 2) {
        resolve({ success: false, message: 'Please enter your full name (at least 2 characters).' });
        return;
      }
      if (!email || !email.trim()) {
        resolve({ success: false, message: 'Please enter your email address.' });
        return;
      }
      if (!email.includes('@')) {
        resolve({ success: false, message: 'Please enter a valid email address.' });
        return;
      }
      if (!password) {
        resolve({ success: false, message: 'Please enter a password.' });
        return;
      }
      if (password.length < 6) {
        resolve({ success: false, message: 'Password must be at least 6 characters.' });
        return;
      }
      
      let users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
      const existingUser = users.find((u: any) => u.email === email);
      
      if (existingUser) {
        resolve({ success: false, message: 'An account with this email already exists. Please login.' });
        return;
      }
      
      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email,
        password: password,
        role: 'user',
        avatar: '👤'
      };
      
      users.push(newUser);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      
      resolve({ success: true, message: 'Account created successfully! Please login.' });
    });
  }
  
  logout(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(this.USER_KEY);
      this.currentUserSignal.set(null);
      this.isAuthenticatedSignal.set(false);
      resolve();
    });
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  
  isEmailRegistered(email: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    return users.some((u: any) => u.email === email);
  }
}