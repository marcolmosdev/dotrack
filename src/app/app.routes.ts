import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/code/code.component').then(x => x.CodeComponent)
  },
  {
    path: 'budget',
    loadComponent: () => import('./pages/budget/budget.component').then(x => x.BudgetComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
