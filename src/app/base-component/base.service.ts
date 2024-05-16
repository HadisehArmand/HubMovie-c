import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../app.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  queryParam: string = '';
  hubmovie: any[] = [];
  pageRange: number = 1;
  isGener: boolean = false;

  constructor(private router: Router, private movieService: MovieService) {}

  fetchCategoryData(): void {
    console.log(
      'Fetching data for:',
      this.queryParam,
      'with page range:',
      this.pageRange
    );
    this.movieService
      .getMovieItem$()
      .pipe(take(1))
      .subscribe((items) => {
        console.log('Fetched items:', items);
        this.hubmovie = items || [];
      });

    this.movieService.fetchDataFromApi(
      this.queryParam,
      this.pageRange,
      this.isGener
    );
  }

  onMovieClick(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }

  onScroll(): void {
    this.pageRange += 1;
    this.fetchCategoryData();
  }
}
