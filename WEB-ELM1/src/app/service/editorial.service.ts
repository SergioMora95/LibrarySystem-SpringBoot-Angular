import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Editorial } from '../models/editorial';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  editorialURL = environment.editorialURL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(`${this.editorialURL}/lista`);
  }

  getById(id: number): Observable<Editorial> {
    return this.http.get<Editorial>(`${this.editorialURL}/detail/${id}`);
  }

  create(editorial: Editorial): Observable<any> {
    return this.http.post<any>(`${this.editorialURL}/create`, editorial);
  }
  
  update(editorial: Editorial): Observable<Editorial> {
    return this.http.put<Editorial>(`${this.editorialURL}/update/${editorial.idEditorial}`, editorial);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.editorialURL}/delete/${id}`);
  }
}
