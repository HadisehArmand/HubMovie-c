import { Routes } from '@angular/router';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { DetailmovieComponent } from './detailmovie/detailmovie.component';

export const routes: Routes = [
  {
    path: 'category/:categoryName',
    component: ListMovieComponent,
    data: { queryParamName: 'categoryName', isGener: false },
  },
  {
    path: 'gener/:generName',
    component: ListMovieComponent,
    data: { queryParamName: 'generName', isGener: true },
  },
  { path: 'movies/:id', component: DetailmovieComponent },
];
