import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecursoAudio } from '../models/recurso-audio';

@Injectable({
  providedIn: 'root'
})
export class RecursoAudioService {

  private apiUrl: string = 'http://localhost:8080/recursoAudio';

  constructor(private http: HttpClient) { }

  getList(): Observable<RecursoAudio[]> {
    return this.http.get<RecursoAudio[]>(`${this.apiUrl}/lista`);
  }

  getById(id: number): Observable<RecursoAudio> {
    return this.http.get<RecursoAudio>(`${this.apiUrl}/detail/${id}`);
  }

  create(recursoAudio: RecursoAudio): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, recursoAudio);
  }

  update(id: number, recursoAudio: RecursoAudio): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, recursoAudio);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
