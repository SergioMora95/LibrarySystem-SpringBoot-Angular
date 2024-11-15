import { Libro } from './libro';
import { Usuario } from './usuario';

export class Prestamo {
  idPrestamo?: number;
  cantidadPrestamo: number;
  fechaDevolucion: Date;
  fechaPrestamo: Date;
  observacionPrestamo: string;
  estadoPrestamo: string;
  vecesRenovado: number;
  ultimaFechaRenovacion: Date;
  libro: Libro;
  usuario: Usuario;

  constructor(
    cantidadPrestamo: number,
    fechaDevolucion: Date,
    fechaPrestamo: Date,
    observacionPrestamo: string,
    estadoPrestamo: string,
    vecesRenovado:number,
    ultimaFechaRenovacion: Date,
    libro: Libro,
    usuario: Usuario
  ) {
    this.cantidadPrestamo = cantidadPrestamo;
    this.fechaDevolucion = fechaDevolucion;
    this.fechaPrestamo = fechaPrestamo;
    this.observacionPrestamo = observacionPrestamo;
    this.estadoPrestamo = estadoPrestamo;
    this.vecesRenovado = vecesRenovado;
    this.ultimaFechaRenovacion = ultimaFechaRenovacion;
    this.libro = libro;
    this.usuario = usuario;
  }
}
