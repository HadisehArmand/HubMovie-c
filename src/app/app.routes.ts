import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { GenerComponent } from './gener/gener.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export const routes: Routes = [
  {
    path: 'category/:categoryName',
    component: CategoryComponent,
  },
  {
    path: 'gener/:generName',
    component: GenerComponent,
  },
  { path: 'movies/:id', component: MovieDetailComponent },
];
