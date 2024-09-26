import { Injectable } from '@angular/core';
import { Auth, User, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      this.logAuthStateChange();
    });
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((res) => {
      onAuthStateChanged(this.auth, (user) => {
        res(!!user);
      });
    });
  }

  getUser(): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(user);
      });
    });
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  private async logAuthStateChange() {
    const logsRef = collection(this.firestore, 'logs');
    await addDoc(logsRef, {
      email: this.user ? this.user.email : 'Guest',
      fechaIngreso: new Date(),
    });
  }
}
