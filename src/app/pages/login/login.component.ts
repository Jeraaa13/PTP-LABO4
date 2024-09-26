import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {}

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const logRef = collection(this.firestore, 'logs');
        addDoc(logRef, {
          email: user.email,
          fechaIngreso: new Date(),
        });
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.errorMessage = 'Email o contraseña incorrectos.';
        console.error('Login error', error);
      });
  }

  loginRapido(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
