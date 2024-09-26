import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css'],
})
export class MayorMenorComponent implements OnInit {
  constructor(private router: Router) {}

  palos: string[] = ['♠️', '♥️', '♣️', '♦️'];
  valores: string[] = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  mazo: string[] = [];
  cartaActual: string = '';
  cartaSiguiente: string = '';
  puntaje: number = 0;
  mensaje: string = '';

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.mazo = [];
    this.puntaje = 0;
    this.mensaje = '';

    for (let palo of this.palos) {
      for (let valor of this.valores) {
        this.mazo.push(`${valor} ${palo}`);
      }
    }

    this.mezclarMazo();

    this.cartaActual = this.sacarCarta();
    this.cartaSiguiente = this.sacarCarta();
  }

  mezclarMazo() {
    for (let i = this.mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];
    }
  }

  sacarCarta(): string {
    return this.mazo.pop() || '';
  }

  adivinar(esMayor: boolean) {
    const valorActual = this.obtenerValorNumerico(this.cartaActual);
    const valorSiguiente = this.obtenerValorNumerico(this.cartaSiguiente);

    if (
      (esMayor && valorSiguiente > valorActual) ||
      (!esMayor && valorSiguiente < valorActual)
    ) {
      this.puntaje++;
      this.mensaje = '¡Correcto!';
    } else if (valorSiguiente === valorActual) {
      this.mensaje = 'Iguales. No se suma punto.';
    } else {
      this.mensaje = 'Incorrecto.';
    }

    this.cartaActual = this.cartaSiguiente;
    this.cartaSiguiente = this.sacarCarta();

    if (!this.cartaSiguiente) {
      this.mensaje = `Juego terminado. Puntaje final: ${this.puntaje}`;
    }
  }

  obtenerValorNumerico(carta: string): number {
    const valor = carta.split(' ')[0];
    switch (valor) {
      case 'A':
        return 1;
      case 'J':
        return 11;
      case 'Q':
        return 12;
      case 'K':
        return 13;
      default:
        return parseInt(valor);
    }
  }

  volverAlHome() {
    this.router.navigate(['/home']);
  }
}
