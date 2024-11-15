import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  libroURL = environment.libroURL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.libroURL}/lista`);
  }

  getDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.libroURL}/disponibles`);
  }

  getAgotados(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.libroURL}/agotados`);
  }

  getById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.libroURL}/detail/${id}`);
  }

  create(libro: Libro): Observable<any> {
    return this.http.post<any>(`${this.libroURL}/create`, libro);
  }

  update(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.libroURL}/update/${libro.idLibro}`, libro);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.libroURL}/delete/${id}`);
  }
}
