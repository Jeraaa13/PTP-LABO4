import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscaminas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buscaminas.component.html',
  styleUrls: ['./buscaminas.component.css'],
})
export class BuscaminasComponent implements OnInit {
  grid: Cell[][] = [];
  flagsLeft = 10;
  timer = 0;
  gameOver = false;
  timerInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    this.grid = [];
    this.flagsLeft = 10;
    this.timer = 0;
    this.gameOver = false;
    clearInterval(this.timerInterval); // Reiniciar el temporizador
    this.startTimer();

    // Inicializar la cuadrícula con celdas vacías
    for (let i = 0; i < 8; i++) {
      // Tablero de 8x8 por ejemplo
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        row.push({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        });
      }
      this.grid.push(row);
    }

    // Colocar minas aleatoriamente
    let minesPlaced = 0;
    while (minesPlaced < 10) {
      // Suponiendo 10 minas
      const row = Math.floor(Math.random() * 8);
      const col = Math.floor(Math.random() * 8);

      if (!this.grid[row][col].isMine) {
        this.grid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calcular las minas adyacentes
    this.calculateAdjacentMines();
  }

  calculateAdjacentMines() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (!this.grid[i][j].isMine) {
          let adjacentMines = 0;

          // Contar las minas en las celdas adyacentes
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              const newRow = i + x;
              const newCol = j + y;

              if (
                newRow >= 0 &&
                newRow < 8 &&
                newCol >= 0 &&
                newCol < 8 &&
                this.grid[newRow][newCol].isMine
              ) {
                adjacentMines++;
              }
            }
          }

          this.grid[i][j].adjacentMines = adjacentMines;
        }
      }
    }
  }

  revealCell(row: number, col: number) {
    const cell = this.grid[row][col];

    if (cell.isRevealed || cell.isFlagged || this.gameOver) return;

    cell.isRevealed = true;

    if (cell.isMine) {
      this.gameOver = true;
      alert('¡Juego terminado! Pisaste una mina.');
      clearInterval(this.timerInterval);
      this.resetGame();
    } else if (cell.adjacentMines === 0) {
      // Revelar las celdas adyacentes si no hay minas cercanas
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const newRow = row + x;
          const newCol = col + y;

          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            this.revealCell(newRow, newCol); // Revelación recursiva
          }
        }
      }
    }

    // Verificar si el jugador ha ganado
    this.checkWinCondition();
  }

  checkWinCondition() {
    let cellsRevealed = 0;

    for (let row of this.grid) {
      for (let cell of row) {
        if (cell.isRevealed && !cell.isMine) {
          cellsRevealed++;
        }
      }
    }

    if (cellsRevealed === 64 - 10) {
      // 64 celdas totales menos 10 minas
      alert('¡Ganaste! Has encontrado todas las minas.');
      this.gameOver = true;
      clearInterval(this.timerInterval);
    }
  }

  flagCell(row: number, col: number) {
    const cell = this.grid[row][col];

    // Si el juego ya terminó o la celda ya fue revelada, no hacer nada
    if (this.gameOver || cell.isRevealed) return;

    // Si la celda no está marcada, marcarla si quedan banderas
    if (!cell.isFlagged && this.flagsLeft > 0) {
      cell.isFlagged = true;
      this.flagsLeft--;
    }
    // Si la celda está marcada, desmarcarla
    else if (cell.isFlagged) {
      cell.isFlagged = false;
      this.flagsLeft++;
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  getCellContent(cell: Cell): string {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    return cell.adjacentMines > 0 ? cell.adjacentMines.toString() : '';
  }

  volverAlHome() {
    this.router.navigate(['/home']);
  }
}

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}
