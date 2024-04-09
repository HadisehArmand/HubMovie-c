import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Injectable } from '@angular/core';

import { MovieService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss',
})
export class PopularComponent {
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

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovieItem$().subscribe((items) => {
      this.hubmovie = items || [];
    });
    this.movieService.fetchDataFromApi();
  }
}
