import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface ChatMessage {
  text: string;
  user: string;
  timestamp: any;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = '';
  messages: ChatMessage[] = [];
  user: any;
  private messagesSubscription?: Subscription;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUser().then((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.messagesSubscription = this.chatService
          .getMessages()
          .subscribe((messages) => {
            this.messages = messages as ChatMessage[];
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  volverAlHome() {
    this.router.navigate(['/home']);
  }
}
