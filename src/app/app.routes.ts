import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { GenerComponent } from './gener/gener.component';
import { DetailmovieComponent } from './detailmovie/detailmovie.component';

export const routes: Routes = [
  {
    path: 'category/:categoryName',
    component: CategoryComponent,
  },
  {
    path: 'gener/:generName',
    component: GenerComponent,
  },
  { path: 'movies/:id', component: DetailmovieComponent },
];
