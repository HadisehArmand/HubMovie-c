import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'popular',
    loadComponent: () =>
      import('./popular/popular.component').then((mod) => mod.PopularComponent),
  },
  {
    path: 'top rated',
    loadComponent: () =>
      import('./toprated/toprated.component').then(
        (mod) => mod.TopratedComponent
      ),
  },
  {
    path: 'upcoming',
    loadComponent: () =>
      import('./upcoming/upcoming.component').then(
        (mod) => mod.UpcomingComponent
      ),
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('./detailmovie/detailmovie.component').then(
        (mod) => mod.DetailmovieComponent
      ),
  },
];
