import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-issue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-issue.html',
})
export class ReportIssueComponent {
  hasChanges = false;

  onInput() {
    this.hasChanges = true;
  }

  canDeactivate(): boolean {
    return !this.hasChanges || confirm('Discard changes?');
  }
}