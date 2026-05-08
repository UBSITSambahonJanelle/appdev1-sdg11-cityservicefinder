import { inject } from '@angular/core';
import { Router, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) return true;

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};