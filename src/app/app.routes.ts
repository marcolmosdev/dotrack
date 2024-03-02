import { Routes } from '@angular/router';
import { BudgetGuard } from './core/guards/budget.guard';
import { DeveloperLoggedInGuard } from './core/guards/developer-logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(x => x.HomeComponent)
  },
  {
    path: 'code',
    loadComponent: () => import('./pages/code/code.component').then(x => x.CodeComponent)
  },
  {
    path: 'budget',
    canActivate: [BudgetGuard],
    loadComponent: () => import('./pages/budget/budget.component').then(x => x.BudgetComponent)
  },
  {
    path: 'developer',
    canActivate: [DeveloperLoggedInGuard],
    loadComponent: () => import('./pages/developer/developer.component').then(x => x.DeveloperComponent)
  },
  {
    path: 'github/callback',
    loadComponent: () =>
      import('./pages/github-callback/github-callback.component').then(x => x.GithubCallbackComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
