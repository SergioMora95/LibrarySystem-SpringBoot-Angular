import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecursoVideo } from '../models/recurso-video';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecursoVideoService {

  recursoVideoURL = environment.recursoVideoURL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<RecursoVideo[]> {
    return this.http.get<RecursoVideo[]>(`${this.recursoVideoURL}/lista`);
  }

  getById(id: number): Observable<RecursoVideo> {
    return this.http.get<RecursoVideo>(`${this.recursoVideoURL}/detail/${id}`);
  }

  create(recursoVideo: RecursoVideo): Observable<any> {
    return this.http.post<any>(`${this.recursoVideoURL}/create`, recursoVideo);
  }

  update(recursoVideo: RecursoVideo): Observable<RecursoVideo> {
    return this.http.put<RecursoVideo>(`${this.recursoVideoURL}/update/${recursoVideo.idVideo}`, recursoVideo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.recursoVideoURL}/delete/${id}`);
  }
}
