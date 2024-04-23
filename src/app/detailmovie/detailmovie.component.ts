import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../app.service';
import { Genre } from '../app.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detailmovie',
  templateUrl: './detailmovie.component.html',
  styleUrls: ['./detailmovie.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink],
})
export class DetailmovieComponent implements OnInit {
  movieId: number;
  movie: any;
  genres: Genre[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {
    this.movieId = 0;
  }
  goBack() {
    // window.history.back();
    this.location.back();

    console.log('goBack()...');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = parseInt(params['id']);
      this.fetchMovieDetails();
    });
    this.movieService.getGenres$().subscribe((genres) => {
      this.genres = genres;
    });
  }

  fetchMovieDetails(): void {
    this.movieService.getMovieById(this.movieId).subscribe(
      (movie) => {
        this.movie = movie;
      },
      (error) => {
        console.error('Error fetching movie details:', error);
      }
    );
  }
}
