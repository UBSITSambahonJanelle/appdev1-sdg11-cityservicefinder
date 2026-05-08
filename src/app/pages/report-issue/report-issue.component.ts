import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';  // ← ADD THIS
import { HasUnsavedChanges } from '../../guards/unsaved.guard';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-issue',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],  // ← ADD FormsModule HERE
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent implements HasUnsavedChanges {
  private reportService = inject(ReportService);
  
  category = '';
  location = '';
  description = '';
  submitted = false;
  errorMsg = '';
  lastReportId: number | null = null;
  
  categories = [
    'Road Damage / Pothole',
    'Fallen Tree / Landslide',
    'Flooding',
    'Broken Street Light',
    'Illegal Dumping',
    'Public Safety Concern',
    'Water Supply Issue',
    'Other'
  ];
  
  hasUnsavedChanges(): boolean {
    return (this.description.trim().length > 0 || this.location.trim().length > 0) && !this.submitted;
  }
  
  submit(): void {
    if (!this.category || !this.location || !this.description.trim()) {
      this.errorMsg = 'Please fill in all fields';
      return;
    }
    
    this.errorMsg = '';
    
    this.reportService.createReport({
      category: this.category,
      location: this.location,
      description: this.description,
      userEmail: 'user@example.com'
    });
    
    this.submitted = true;
  }
  
  reset(): void {
    this.category = '';
    this.location = '';
    this.description = '';
    this.submitted = false;
  }
}