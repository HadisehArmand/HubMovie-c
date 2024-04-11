import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../app.service';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gener',
  standalone: true,
  imports: [RouterOutlet, MatCardModule],
  templateUrl: './gener.component.html',
  styleUrl: './gener.component.scss',
})
export class GenerComponent {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    this.queryParam = '';
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.queryParam = params['generName'];
      this.fetchCategoryData();
    });
  }

  fetchCategoryData(): void {
    this.movieService.getMovieItem$().subscribe((items) => {
      this.hubmovie = items || [];
    });
    this.movieService.fetchGenerDataFromApi(this.queryParam);
  }
  onMovieClick(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }
}
