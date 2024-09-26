import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  async sendMessage(message: string) {
    try {
      const user: User | null = await this.authService.getUser();

      if (user) {
        return this.firestore.collection('messages').add({
          text: message,
          user: user.email,
          timestamp: new Date(),
        });
      } else {
        console.error('No hay usuario logeado para enviar mensajes.');
        return null;
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      return null;
    }
  }

  getMessages(): Observable<any[]> {
    return this.firestore
      .collection('messages', (ref) => ref.orderBy('timestamp', 'asc'))
      .valueChanges();
  }
}
