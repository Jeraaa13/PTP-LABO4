import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PTP-LABO4';

  private router = inject(Router);
  private auth = inject(Auth);

  irAlLogin() {
    this.router.navigateByUrl('login');
  }

  cerrarSesion() {
    this.auth.signOut();
  }
}
