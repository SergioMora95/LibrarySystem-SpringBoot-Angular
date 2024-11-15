import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = environment.usuarioURL;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.usuarioURL}/lista`);
  }
}
