import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'quien-soy',
    loadComponent: () =>
      import('./pages/quien-soy/quien-soy.component').then(
        (c) => c.QuienSoyComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat.component').then((c) => c.ChatComponent),
  },
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./games/ahorcado/ahorcado.component').then(
        (c) => c.AhorcadoComponent
      ),
  },
  {
    path: 'mayor-menor',
    loadComponent: () =>
      import('./games/mayor-menor/mayor-menor.component').then(
        (c) => c.MayorMenorComponent
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
