import { Prestamo } from './prestamo';

export class HistorialPrestamo  {
    constructor(
   public  id: number,
   public prestamo: Prestamo,
   public fechaCambio: Date,
   public estadoAnterior: string,
   public estadoNuevo: string,
   public descripcion: string,
  ){}
}

