import { Categoria } from "./categoria"

export class RecursoVideo {
    constructor(
        public idVideo: number,
        public urlVideo: string,
        public descripcionVideo: string,
        public fechaCarga: Date,
        public categoria: Categoria
    ) {}
}