import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BaseService } from '../base-component/base.service';
import { ActivatedRoute } from '@angular/router';

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
  styleUrls: ['./gener.component.scss'],
})
export class GenerComponent implements OnInit {
  @ViewChild('searchResults') searchResults: ElementRef<HTMLDivElement>;

  constructor(public baseService: BaseService, private route: ActivatedRoute) {
    this.searchResults = {} as ElementRef<HTMLDivElement>;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.baseService.queryParam = params['generName'];
      this.baseService.pageRange = 1;
      this.baseService.isGener = true;
      this.baseService.fetchCategoryData();
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
