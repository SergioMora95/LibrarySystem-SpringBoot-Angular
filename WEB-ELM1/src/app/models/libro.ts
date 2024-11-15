import { Autor } from "./autor";
import { Categoria } from "./categoria";
import { Editorial } from "./editorial";

export class Libro {
    constructor(
        public idLibro: number,
        public tituloLibro: string,
        public cantidadLibro: number,
        public descripcionLibro: string,
        public imagenLibro: string,
        public estadoLibro: EstadoLibro,
        public autor: Autor,
        public editorial: Editorial,
        public categoria: Categoria

    ){}
}
export enum EstadoLibro {
    Disponible = 'Disponible',
    Agotado = 'Agotado'
}