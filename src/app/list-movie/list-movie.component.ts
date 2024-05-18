import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { RouterOutlet, ActivatedRoute, Params } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BaseService } from '../base-component/base.service';
import { Subscription, take } from 'rxjs';

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
export class ListMovieComponent implements OnInit, OnDestroy {
  @ViewChild('searchResults') searchResults: ElementRef<HTMLDivElement>;
  queryParamName: string = '';
  isGener: boolean = false;
  private routeSub: Subscription | undefined;

  constructor(public baseService: BaseService, private route: ActivatedRoute) {
    this.searchResults = {} as ElementRef<HTMLDivElement>;
  }

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe((data) => {
      this.queryParamName = data['queryParamName'];
      this.isGener = data['isGener'];

      this.route.params.subscribe((params: Params) => {
        this.baseService.queryParam = params[this.queryParamName];
        this.baseService.pageRange = 1;
        this.baseService.isGener = this.isGener;
        this.baseService.fetchCategoryData();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
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
