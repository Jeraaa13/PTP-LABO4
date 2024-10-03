import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  private apiUrl = 'https://the-trivia-api.com/v2/questions/';

  constructor(private http: HttpClient) {}

  getQuestions(limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?limit=${limit}`);
  }
}
