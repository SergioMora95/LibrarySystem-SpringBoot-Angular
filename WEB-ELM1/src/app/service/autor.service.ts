import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorService {


  autorURL = environment.autorURL;

  constructor(private http:HttpClient) { }

  getAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.autorURL}/lista`);
  }

  getOne(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.autorURL}/detail/${id}`);
  }

  create(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(`${this.autorURL}/create`, autor);
  }

  update(autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.autorURL}/update/${autor.idAutor}`, autor);
  }

  delete(id: number): Observable<Autor> {
    return this.http.delete<Autor>(`${this.autorURL}/delete/${id}`);
  }
}