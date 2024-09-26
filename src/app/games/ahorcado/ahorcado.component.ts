import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export class AhorcadoComponent implements OnInit {
  constructor(private router: Router) {}

  palabras: string[] = [
    'ANGULAR',
    'TYPESCRIPT',
    'JAVASCRIPT',
    'DESARROLLO',
    'PROGRAMACION',
  ];
  palabraActual: string = '';
  letrasAdivinadas: Set<string> = new Set();
  intentosRestantes: number = 6;
  mensaje: string = '';
  letras: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  imagenActual: string = '/games/AHORCADO0.png';

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.palabraActual =
      this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.letrasAdivinadas.clear();
    this.intentosRestantes = 6;
    this.mensaje = '';
    this.actualizarImagen();
  }

  adivinarLetra(letra: string) {
    if (this.letrasAdivinadas.has(letra)) return;

    this.letrasAdivinadas.add(letra);

    if (!this.palabraActual.includes(letra)) {
      this.intentosRestantes--;
      this.actualizarImagen();
      if (this.intentosRestantes === 0) {
        this.mensaje = `¡Perdiste! La palabra era ${this.palabraActual}`;
      }
    } else if (this.palabraCompleta()) {
      this.mensaje = '¡Ganaste!';
    }
  }

  palabraCompleta(): boolean {
    return [...this.palabraActual].every((letra) =>
      this.letrasAdivinadas.has(letra)
    );
  }

  mostrarLetra(letra: string): string {
    return this.letrasAdivinadas.has(letra) ? letra : '_';
  }

  actualizarImagen() {
    this.imagenActual = `/games/AHORCADO${6 - this.intentosRestantes}.png`;
  }

  volverAlHome() {
    this.router.navigate(['/home']);
  }
}
