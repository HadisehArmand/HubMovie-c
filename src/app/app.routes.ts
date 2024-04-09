import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'popular',
    loadComponent: () =>
      import('./popular/popular.component').then((mod) => mod.PopularComponent),
  },
];
