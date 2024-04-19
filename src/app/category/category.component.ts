import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../app.service';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatPaginatorModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    this.queryParam = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.queryParam = params['categoryName'];
      this.fetchCategoryData();
    });
  }

  fetchCategoryData(): void {
    this.movieService.getMovieItem$().subscribe((items) => {
      this.hubmovie = items || [];
    });
    this.movieService.fetchDataFromApi(this.queryParam);
  }

  onMovieClick(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  getCurrentPageItems(): any[] {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.hubmovie.slice(startIndex, endIndex);
  }
}
