import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../app.service';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gener',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatPaginatorModule,
    InfiniteScrollModule,
  ],
  templateUrl: './gener.component.html',
  styleUrl: './gener.component.scss',
})
export class GenerComponent {
  @ViewChild('searchResults') searchResults: ElementRef<HTMLDivElement>;
  queryParam: string;
  hubmovie: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[] = [];
  pageIndex = 0;
  pageSize = 5;
  pageRange = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    this.queryParam = '';
    this.searchResults = {} as ElementRef<HTMLDivElement>;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.queryParam = params['generName'];
      this.pageRange = 1;
      this.fetchCategoryData();
    });
  }

  fetchCategoryData(): void {
    this.movieService
      .getMovieItem$()
      .pipe(take(1))
      .subscribe((items) => {
        console.log(items);
        this.hubmovie = items || [];
      });

    this.movieService.fetchDataFromApi(this.queryParam, this.pageRange, true);
  }

  onMovieClick(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }
  onScroll(): void {
    this.pageRange += 1;
    this.fetchCategoryData();
  }
}
