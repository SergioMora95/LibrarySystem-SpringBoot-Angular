import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestamo } from '../models/prestamo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  prestamoURL = environment.prestamoURL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.prestamoURL}/lista`);
  }

  getById(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.prestamoURL}/detail/${id}`);
  }

  create(prestamo: Prestamo): Observable<any> {
    return this.http.post<any>(`${this.prestamoURL}/create`, prestamo);
  }

  update(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.prestamoURL}/update/${prestamo.idPrestamo}`, prestamo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.prestamoURL}/delete/${id}`);
  }

  getListDevueltos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.prestamoURL}/devueltos`);
  }

  getListNoDevueltos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.prestamoURL}/noDevueltos`);
  }

  getListPrestados(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.prestamoURL}/prestados`);
  }

  getMisPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.prestamoURL}/misPrestamos`);
}

renovarPrestamo(id: number): Observable<any> {
  return this.http.put<any>(`${this.prestamoURL}/renovar/${id}`, {});
}

}
