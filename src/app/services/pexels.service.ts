import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PexelsService {
  private apiUrl = 'https://api.pexels.com/v1/search';
  private apiKey = 'vPAZ7jlAk4d9A3Q7Fytja66JHUgK9r7tpYPt79uxOc3xgWGvUQTRVrLQ';

  constructor(private http: HttpClient) {}

  getImage(query: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey,
    });

    return this.http
      .get(`${this.apiUrl}?query=${query}&per_page=1`, { headers })
      .pipe(
        map((response: any) => {
          if (response.photos && response.photos.length > 0) {
            return response.photos[0].src.medium;
          }
          return '';
        })
      );
  }
}
