import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PTP-LABO4';

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
