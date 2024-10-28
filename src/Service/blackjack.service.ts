import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/Card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlackjackService {
  private url = 'https://localhost:7200/api/game';
  constructor(private http: HttpClient) {}

  public GetGame(): Observable<any> {
    return this.http.post<any>(`${this.url}/get-game`, {});
  }

  public StartGame(betValue: number): Observable<any> {
    return this.http.post<any>(`${this.url}/start-game`, { betValue });
  }

  public Hit(): Observable<any> {
    return this.http.post<any>(`${this.url}/hit`, {});
  }

  public Stand(): Observable<any> {
    return this.http.post<any>(`${this.url}/stand`, {});
  }

  public EndGame(betValue: number): Observable<any> {
    return this.http.post<any>(`${this.url}/end-game`, { betValue });
  }
}
