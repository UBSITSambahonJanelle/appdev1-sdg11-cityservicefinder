import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasUnsavedChanges } from '../../guards/unsaved.guard';

@Component({
  selector: 'app-report-issue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent implements HasUnsavedChanges {
  category    = '';
  location    = '';
  description = '';
  submitted   = false;
  errorMsg    = '';

  categories = [
    'Road Damage / Pothole',
    'Fallen Tree / Landslide Hazard',
    'Flooding',
    'Broken Street Light',
    'Illegal Dumping',
    'Public Safety Concern',
    'Water Supply Issue',
    'Other',
  ];

  hasUnsavedChanges(): boolean {
    return (this.description.trim().length > 0 || this.location.trim().length > 0) && !this.submitted;
  }

  submit(): void {
    if (!this.category || !this.location || !this.description.trim()) {
      this.errorMsg = 'Please fill in all fields before submitting.';
      return;
    }
    this.errorMsg  = '';
    this.submitted = true;
  }

  reset(): void {
    this.category = ''; this.location = ''; this.description = ''; this.submitted = false;
  }
}