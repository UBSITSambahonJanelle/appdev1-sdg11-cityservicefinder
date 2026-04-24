import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmergencyComponent } from './pages/emergency/emergency.component';
import { TransportComponent } from './pages/transport/transport.component';
import { CityServicesComponent } from './pages/city-services/city-services.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'emergency', component: EmergencyComponent },
  { path: 'transport', component: TransportComponent },
  { path: 'city-services', component: CityServicesComponent },
  { path: 'city-services/:id', component: CityServicesComponent },  // URL parameter
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },  // Protected route
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }  // Wildcard route
];