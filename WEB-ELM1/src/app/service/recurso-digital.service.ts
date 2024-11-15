import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecursoDigital } from '../models/recurso-digital';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecursoDigitalService {

  recursoDigitalURL = environment.recursoDigitalURL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<RecursoDigital[]> {
    return this.http.get<RecursoDigital[]>(`${this.recursoDigitalURL}/lista`);
  }

  getById(id: number): Observable<RecursoDigital> {
    return this.http.get<RecursoDigital>(`${this.recursoDigitalURL}/detail/${id}`);
  }

  create(recursoDigital: RecursoDigital): Observable<any> {
    return this.http.post<any>(`${this.recursoDigitalURL}/create`, recursoDigital);
  }

  update(recursoDigital: RecursoDigital): Observable<RecursoDigital> {
    return this.http.put<RecursoDigital>(`${this.recursoDigitalURL}/update/${recursoDigital.idRecursoDigital}`, recursoDigital);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.recursoDigitalURL}/delete/${id}`);
  }
}
