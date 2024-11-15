import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // Importa el servicio TokenService si es necesario

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService // Agrega el servicio TokenService al constructor si es necesario
  ) { }

  uploadFile(formData: FormData): Observable<any> {
    // Obtiene el token de autenticación del TokenService
    const token = this.tokenService.getToken();
    
    // Configura los encabezados para incluir el token de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realiza la solicitud HTTP con los encabezados configurados
    return this.http.post('http://localhost:8080/media/upload', formData, { headers });
  }

}