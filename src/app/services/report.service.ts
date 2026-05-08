import { Injectable, signal } from '@angular/core';

export interface Report {
  id: number;
  category: string;
  location: string;
  description: string;
  status: 'pending' | 'reviewing' | 'in-progress' | 'resolved';
  createdAt: Date;
  userEmail: string;
  adminResponse?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reports = signal<Report[]>([]);
  
  getReports() {
    return this.reports.asReadonly();
  }
  
  createReport(report: Omit<Report, 'id' | 'createdAt' | 'status'>): void {
    const newReport: Report = {
      id: Date.now(),
      ...report,
      status: 'pending',
      createdAt: new Date()
    };
    this.reports.update(current => [newReport, ...current]);
    console.log('Report created:', newReport);
  }
  
  updateReportStatus(id: number, status: Report['status'], response?: string): void {
    this.reports.update(current =>
      current.map(report =>
        report.id === id
          ? { ...report, status, adminResponse: response }
          : report
      )
    );
  }
  
  getReportById(id: number): Report | undefined {
    return this.reports().find(r => r.id === id);
  }
  
  getUserReports(email: string): Report[] {
    return this.reports().filter(r => r.userEmail === email);
  }
}