import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-detailmovie',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatListModule, RouterLink],
  templateUrl: './detailmovie.component.html',
  styleUrl: './detailmovie.component.scss',
})
export class DetailmovieComponent {}
