import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const DeveloperLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  authService.getCurrentUser();
  return typeof authService.currentGithubUser() !== 'undefined' ? true : inject(Router).createUrlTree(['']);
};
