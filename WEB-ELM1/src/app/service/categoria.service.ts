import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaURL = environment.categoriaURL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.categoriaURL}/lista`);
  }

  getById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.categoriaURL}/detail/${id}`);
  }

  create(categoria: Categoria): Observable<any> {
    return this.http.post<any>(`${this.categoriaURL}/create`, categoria);
  }

  update(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.categoriaURL}/update/${categoria.idCategoria}`, categoria);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.categoriaURL}/delete/${id}`);
  }
}
