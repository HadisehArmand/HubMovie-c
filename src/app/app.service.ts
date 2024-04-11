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
interface Genre {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movie = createStore({ name: 'movie' }, withProps<Movie>({}));
  private genres = createStore({ name: 'genres' }, withProps<Genre[]>([]));

  constructor() {
    const persist = persistState(this.movie, {
      key: 'movie',
      storage: localStorageStrategy,
    })
  }

  getMovieItem$() {
    return this.movie.pipe(select((state) => state.hubmovie));
  }

  getGenres$() {
    return this.genres.pipe();
  }

  updateMovieItems(newMovies: any[]) {
    const updatedMovies = newMovies.map((movie) => ({
      ...movie,
      poster_path: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
      backdrop_path: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path,
    }));

    this.movie.update((state) => ({
      ...state,
      hubmovie: updatedMovies,
    }));
    console.log(this.movie.getValue());
  }

  updateGenres(newGenres: Genre[]) {
    this.genres.update(() => newGenres);
  }

  fetchDataFromApi(q: string) {
    this.movie.update((state) => ({
      ...state,
      hubmovie: [],
    }));

    fetch(`https://api.themoviedb.org/3/movie/${q}?api_key=4330f1f9e53b1cb6cdb2f0371cfdf059`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((newMovies) => {
        this.updateMovieItems(newMovies.results);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }
  fetchGenerDataFromApi(q: any) {
    let qId: any;
    this.movie.update((state) => ({
      ...state,
      hubmovie: [],
    }));
    this.fetchGenresFromApi()
      .then(genres => {
        const genre = genres.find(genre => genre.name === q);
        qId = genre ? genre.id : null;
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4330f1f9e53b1cb6cdb2f0371cfdf059&with_genres=${qId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((newMovies) => {
          this.updateMovieItems(newMovies.results);
        })
        .catch((error) => {
          console.error('Error fetching data from API:', error);
        });
      });
  }
  fetchGenresFromApi(): Promise<Genre[]> {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4330f1f9e53b1cb6cdb2f0371cfdf059')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: { genres: Genre[] }) => {
        return data.genres;
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
        return [];
      });
  }

}