import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { unsavedGuard } from './guards/unsaved.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { EmergencyComponent } from './pages/emergency/emergency.component';
import { TransportComponent } from './pages/transport/transport.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CityServicesComponent } from './pages/city-services/city-services.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { SavedServicesComponent } from './pages/saved-services/saved-services.component';
import { ReportIssueComponent } from './pages/report-issue/report-issue.component';

import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  // Default redirect
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'emergency', component: EmergencyComponent },
  { path: 'transport', component: TransportComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'city-services', component: CityServicesComponent, canActivate: [authGuard] },
  { path: 'city-services/:id', component: ServiceDetailComponent, canActivate: [authGuard] },
  { path: 'saved', component: SavedServicesComponent, canActivate: [authGuard] },

  {
    path: 'report',
    component: ReportIssueComponent,
    canActivate: [authGuard],
    canDeactivate: [unsavedGuard]
  },

  // Wildcard route
  { path: '**', component: NotFoundComponent }
];
