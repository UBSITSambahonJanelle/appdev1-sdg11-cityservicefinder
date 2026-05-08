import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  private supportService = inject(SupportService);
  
  name = '';
  email = '';
  subject = '';
  message = '';
  priority: string = 'medium';
  submitted = false;
  errorMsg = '';
  
  priorities = [
    { value: 'low', label: '🟢 Low - General question' },
    { value: 'medium', label: '🟡 Medium - Need assistance' },
    { value: 'high', label: '🔴 High - Urgent issue' }
  ];
  
  submit(): void {
    if (!this.name.trim() || !this.email.trim() || !this.subject.trim() || !this.message.trim()) {
      this.errorMsg = 'Please fill in all fields';
      return;
    }
    
    if (!this.email.includes('@')) {
      this.errorMsg = 'Please enter a valid email address';
      return;
    }
    
    this.errorMsg = '';
    
    this.supportService.sendMessage({
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
      priority: this.priority as 'low' | 'medium' | 'high'
    });
    
    this.submitted = true;
  }
  
  reset(): void {
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
    this.priority = 'medium';
    this.submitted = false;
  }
}