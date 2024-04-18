import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  standalone: true,
  styleUrls: ['./theme-toggle.component.scss'],
  imports: [MatIconModule],
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = localStorage.getItem('isDarkMode') === 'true';
  }

  ngOnInit(): void {
    this.themeService.setDarkMode(this.isDarkMode);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', this.isDarkMode.toString());
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
