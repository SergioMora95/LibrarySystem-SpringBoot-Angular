import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositorioExterno } from '../models/repositorio-externo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositorioExternoService {

  repositorioExternoURL = environment.repositorioExternoURL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<RepositorioExterno[]> {
    return this.http.get<RepositorioExterno[]>(`${this.repositorioExternoURL}/lista`);
  }

  getById(id: number): Observable<RepositorioExterno> {
    return this.http.get<RepositorioExterno>(`${this.repositorioExternoURL}/detail/${id}`);
  }

  create(repositorioExterno: RepositorioExterno): Observable<any> {
    return this.http.post<any>(`${this.repositorioExternoURL}/create`, repositorioExterno);
  }


  update(repositorioExterno: RepositorioExterno): Observable<RepositorioExterno> {
    return this.http.put<RepositorioExterno>(`${this.repositorioExternoURL}/update/${repositorioExterno.idRepositorio}`, repositorioExterno);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.repositorioExternoURL}/delete/${id}`);
  }
}
