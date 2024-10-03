import {
  ApplicationConfig,
  EnvironmentInjector,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: {
        projectId: 'sala-de-juegos-toranzo',
        appId: '1:764804087887:web:f5cc7f66902002ce21aa3a',
        storageBucket: 'sala-de-juegos-toranzo.appspot.com',
        apiKey: 'AIzaSyDiewGef6AN0FO9QqTf5xmJRqW5qBb89tY',
        authDomain: 'sala-de-juegos-toranzo.firebaseapp.com',
        messagingSenderId: '764804087887',
      },
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sala-de-juegos-toranzo',
        appId: '1:764804087887:web:f5cc7f66902002ce21aa3a',
        storageBucket: 'sala-de-juegos-toranzo.appspot.com',
        apiKey: 'AIzaSyDiewGef6AN0FO9QqTf5xmJRqW5qBb89tY',
        authDomain: 'sala-de-juegos-toranzo.firebaseapp.com',
        messagingSenderId: '764804087887',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
