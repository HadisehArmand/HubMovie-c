import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BaseService } from '../base-component/base.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list-movie',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatPaginatorModule,
    InfiniteScrollModule,
  ],
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss'],
})
export class ListMovieComponent implements OnInit {
  @ViewChild('searchResults') searchResults: ElementRef<HTMLDivElement>;
  queryParamName: string = '';
  isGener: boolean = false;

  constructor(public baseService: BaseService, private route: ActivatedRoute) {
    this.searchResults = {} as ElementRef<HTMLDivElement>;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.queryParamName = data['queryParamName'];
      this.isGener = data['isGener'];
      this.route.params.subscribe((params) => {
        this.baseService.queryParam = params[this.queryParamName];
        this.baseService.pageRange = 1;
        this.baseService.isGener = this.isGener;
        this.baseService.fetchCategoryData();
      });
    });
  }

  onMovieClick(movieId: number): void {
    this.baseService.onMovieClick(movieId);
  }

  onScroll(): void {
    this.baseService.onScroll();
  }

  get hubmovie() {
    return this.baseService.hubmovie;
  }
}
