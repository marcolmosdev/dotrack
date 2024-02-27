import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

export const BudgetGuard: CanActivateFn = (route, state) => {
  return typeof inject(ProjectService).project() !== 'undefined' ? true : inject(Router).createUrlTree(['']);
};
