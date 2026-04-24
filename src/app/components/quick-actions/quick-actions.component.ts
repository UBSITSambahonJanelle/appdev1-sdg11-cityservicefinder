import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="quick-actions">
      <h3>Quick Actions</h3>
      <div class="action-grid">
        <a routerLink="/emergency" class="action emergency">🚨 Emergency Contacts</a>
        <a routerLink="/transport" class="action transport">🚍 Jeepney Routes</a>
        <a routerLink="/city-services" class="action services">🏛️ City Services</a>
        <a routerLink="/report" class="action report">📝 Report an Issue</a>
        <a routerLink="/saved" class="action saved">⭐ Saved Services</a>
      </div>
    </div>
  `,
  styles: [`
    .quick-actions h3 {
      color: #1C1E20;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
    .action-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 0.75rem;
    }
    .action {
      padding: 0.6rem;
      text-align: center;
      text-decoration: none;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 500;
      transition: transform 0.2s;
    }
    .action:hover {
      transform: translateY(-2px);
    }
    .emergency { background: #C0392B; color: white; }
    .transport { background: #5B8FA8; color: white; }
    .services { background: #D4622A; color: white; }
    .report { background: #3A7D44; color: white; }
    .saved { background: #1B4332; color: white; }
  `]
})
export class QuickActionsComponent {}