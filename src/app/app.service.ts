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
export interface Genre {
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
    });
  }

  getMovieItem$() {
    return this.movie.pipe(select((state) => state.hubmovie));
  }

  getGenres$() {
    return this.genres.pipe();
  }

  // updateMovieItems(newMovies: any[]) {
  //   const updatedMovies = newMovies.map((movie) => ({
  //     ...movie,
  //     poster_path: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
  //     backdrop_path: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path,
  //     release_date: movie.release_date.slice(0, 4),
  //   }));

  //   this.movie.update((state) => ({
  //     ...state,
  //     hubmovie: updatedMovies,
  //   }));
  // }

  updateMovieItems(newMovies: any[]) {
    const updatedMovies = newMovies.map((movie) => ({
      ...movie,
      poster_path: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
      backdrop_path: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path,
      release_date: movie.release_date.slice(0, 4),
    }));

    this.movie.update((state) => ({
      ...state,
      hubmovie: state.hubmovie
        ? // ? state.hubmovie.concat(updatedMovies)
          state.hubmovie.concat(updatedMovies)
        : updatedMovies,
    }));
    console.log('run');
  }

  updateGenres(newGenres: Genre[]) {
    this.genres.update(() => newGenres);
  }

  fetchGenresFromApi(): Promise<Genre[]> {
    return fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=4330f1f9e53b1cb6cdb2f0371cfdf059'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => data.genres)
      .catch((error) => {
        console.error('Error fetching genres from API:', error);
        return [];
      });
  }

  fetchDataFromApi(q: string, n: number, isgenre?: boolean) {
    this.movie.next({ hubmovie: [] });

    if (isgenre) {
      this.fetchGenresFromApi()
        .then((genres) => {
          const genre = genres.find((genre) => genre.name === q);
          const genreId = genre ? genre.id : null;
          if (genreId) {
            this.fetchMovies('discover/movie', n, true, genreId);
          }
        })
        .catch((error) => {
          console.error('Error in fetching genres:', error);
        });
    } else {
      this.fetchMovies(`movie/${q}`, n);
    }
  }

  private fetchMovies(
    endpoint: string,
    page: number,
    isgenre?: boolean,
    genreId?: number
  ) {
    let apiRoot = `https://api.themoviedb.org/3/${endpoint}?api_key=4330f1f9e53b1cb6cdb2f0371cfdf059&page=${page}`;
    if (isgenre) {
      apiRoot = `https://api.themoviedb.org/3/${endpoint}?api_key=4330f1f9e53b1cb6cdb2f0371cfdf059&with_genres=${genreId}&page=${page}`;
    }
    fetch(apiRoot)
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
  // new
  getMovieById(id: number) {
    return this.movie.pipe(
      select((state) => {
        const movie = state.hubmovie?.find((movie) => movie.id === id);
        console.log(state.hubmovie?.find((movie) => movie.id === id));
        return movie || null;
      })
    );
  }
}
