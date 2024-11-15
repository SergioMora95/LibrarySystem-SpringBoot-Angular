export class RepositorioExterno {
    idRepositorio?: number;
    fechaCarga: Date;
    urlRepositorio: string;
    descripcionRepositorio: string;
  
    constructor(
      fechaCarga: Date,
      urlRepositorio: string,
      descripcionRepositorio: string
    ) {
      this.fechaCarga = fechaCarga;
      this.urlRepositorio = urlRepositorio;
      this.descripcionRepositorio = descripcionRepositorio;
    }
  }
  