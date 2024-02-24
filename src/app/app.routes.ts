import { Routes } from '@angular/router';
import { BudgetGuard } from './core/guards/budget.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/code/code.component').then(x => x.CodeComponent)
  },
  {
    path: 'budget',
    canActivate: [BudgetGuard],
    loadComponent: () => import('./pages/budget/budget.component').then(x => x.BudgetComponent)
  },  
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
