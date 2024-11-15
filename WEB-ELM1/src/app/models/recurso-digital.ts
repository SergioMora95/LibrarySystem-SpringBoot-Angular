import { Autor } from "./autor";
import { Categoria } from "./categoria";

export class RecursoDigital {
    constructor(
        public idRecursoDigital: number,
        public nombreRecurso: string,
        public imagenRecurso: string,
        public archivoRecurso: string,
        public estadoRecursoDigital: EstadoRecursoDigital,
        public autor: Autor,
        public categoria: Categoria
    ) {}
}

export enum EstadoRecursoDigital {
    Activo = 'Activo',
    Inactivo = 'Inactivo'
}
