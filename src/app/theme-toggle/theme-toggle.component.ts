import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  standalone: true,
  styleUrls: ['./theme-toggle.component.scss'],
  imports: [MatIconModule],
})
export class ThemeToggleComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
