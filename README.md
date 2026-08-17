# PTP-LABO4 (Game Room, earlier version)

Earlier version of the game room assignment, built for the Laboratorio IV course at UTN. Same
core idea as [PrograIV-TP1-Toranzo](https://github.com/Jeraaa13/PrograIV-TP1-Toranzo) (the
professor reused the assignment for Programacion IV), built independently with a different
backend.

## Features

- Auth (login/register) with Firebase
- Four games: Hangman, Higher-or-Lower, Trivia (Preguntados), Minesweeper
- "Who am I" guessing game using the Pexels API
- Chat

## Stack

Angular (standalone components), Firebase (Auth + Firestore + Storage), Pexels API

## Running locally

```bash
cd PTP-LABO4
npm install
ng serve
```

Firebase config is inline in `src/app/app.config.ts` (small student project, not meant for
production use).
