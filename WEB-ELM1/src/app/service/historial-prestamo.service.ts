import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialPrestamo } from '../models/historial-prestamo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialPrestamoService {

    historialPrestamoURL = environment.historialPrestamoURL;

  constructor(private http: HttpClient) { }

  getHistorialPrestamoList(): Observable<HistorialPrestamo[]> {
    return this.http.get<HistorialPrestamo[]>(`${this.historialPrestamoURL}/lista`);
  }
}
