import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntadosService } from '../../services/preguntados.service';
import { PexelsService } from '../../services/pexels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./preguntados.component.html`,
  styleUrls: ['./preguntados.component.css'],
})
export class PreguntadosComponent implements OnInit {
  questions: any[] = [];
  currentQuestion: any;
  currentIndex = 0;
  score = 0;
  gameOver = false;
  shuffledAnswers: string[] = [];
  currentImage: string = '';

  constructor(
    private preguntadosService: PreguntadosService,
    private pexelsService: PexelsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.preguntadosService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
        this.loadQuestionWithImage();
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  loadQuestionWithImage() {
    if (this.currentIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentIndex];
      this.shuffleAnswers();

      const searchTerm = this.getSearchTerm(this.currentQuestion.category);
      console.log('Searching for image with term:', searchTerm);

      this.pexelsService.getImage(searchTerm).subscribe(
        (imageUrl) => {
          this.currentImage = imageUrl;
        },
        (error) => {
          console.error('Error fetching image:', error);
          this.currentImage =
            'https://via.placeholder.com/400x200?text=No+Image+Available';
        }
      );
    } else {
      this.gameOver = true;
    }
  }

  getSearchTerm(category: string): string {
    const categoryMap: { [key: string]: string } = {
      general_knowledge: 'general',
      food_and_drink: 'food',
      film_and_tv: 'movie',
      sport_and_leisure: 'sports',
      arts_and_literature: 'art',
      society_and_culture: 'culture',
    };

    // Primero, verifica si hay un mapeo específico para la categoría
    if (categoryMap[category]) {
      return categoryMap[category];
    }

    // Si no hay un mapeo específico, procesa la categoría
    return category
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  shuffleAnswers() {
    this.shuffledAnswers = [
      this.currentQuestion.correctAnswer,
      ...this.currentQuestion.incorrectAnswers,
    ].sort(() => Math.random() - 0.5);
  }

  checkAnswer(selectedAnswer: string) {
    if (selectedAnswer === this.currentQuestion.correctAnswer) {
      this.score++;
    }
    this.currentIndex++;
    this.loadQuestionWithImage();
  }

  restartGame() {
    this.currentIndex = 0;
    this.score = 0;
    this.gameOver = false;
    this.loadQuestions();
  }

  volverAlHome() {
    this.router.navigate(['/home']);
  }
}
