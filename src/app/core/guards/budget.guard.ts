import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CodeService } from '../services/code.service';

export const BudgetGuard: CanActivateFn = (route, state) => {
  return inject(CodeService).code() !== '' ? true : inject(Router).createUrlTree(['']);
};
