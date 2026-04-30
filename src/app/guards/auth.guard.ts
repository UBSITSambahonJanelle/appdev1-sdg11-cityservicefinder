import { inject } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) return true;

  // Redirect to /login and remember where the user was going
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};