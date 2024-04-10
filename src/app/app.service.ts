import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

interface Movie {
  hubmovie?: {
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
  }[];
}
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movie = createStore({ name: 'movie' }, withProps<Movie>({}));

  constructor() {
    console.log('hi');
    const persist = persistState(this.movie, {
      key: 'movie',
      storage: localStorageStrategy,
    });
    this.movie.subscribe((state) => {
      if (state.hubmovie) {
        state.hubmovie.forEach((movie) => {
          console.log('title update:', movie.title, movie);
        });
      } else {
        console.warn('hubmovie is undefined in state');
      }
      console.log('..................');
    });
  }

  getMovieItem$() {
    return this.movie.pipe(select((state) => state.hubmovie));
  }

  updateMovieItems(newMovies: any[]) {
    // Prepend base URL to poster_path and backdrop_path
    const updatedMovies = newMovies.map((movie) => ({
      ...movie,
      poster_path: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
      backdrop_path: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path,
    }));

    this.movie.update((state) => ({
      ...state,
      hubmovie: updatedMovies,
    }));
  }

  fetchDataFromApi() {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=4330f1f9e53b1cb6cdb2f0371cfdf059'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((newMovies) => {
        console.log('fetch success');
        console.log(newMovies.results);
        this.updateMovieItems(newMovies.results);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }
}
