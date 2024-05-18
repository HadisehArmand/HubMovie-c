import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MovieService } from './app.service';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
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
declare var localStorage: Storage;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    RouterLink,
    ThemeToggleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent implements OnInit {
  queryParamName: string = '';
  isGener: boolean = false;

  title = 'HubMovie';
  genres: any[] = [];
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.genres = [];
  }
  ngOnInit(): void {
    this.movieService.fetchGenresFromApi().then((genres) => {
      this.genres = genres;
    });
    this.route.data.subscribe((data) => {
      this.queryParamName = data['queryParamName'];
      this.isGener = data['isGener'];
    });
  }
}
