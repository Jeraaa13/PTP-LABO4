import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  estaLogeado: boolean = false;
  user: any = null;
  title = 'PTP-LABO4';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated().then((res) => {
      this.estaLogeado = res;
      if (res) {
        this.authService.getUser().then((user) => {
          this.user = user;
        });
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
