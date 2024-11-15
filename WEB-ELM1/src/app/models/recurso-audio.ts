import { Categoria } from './categoria';

export class RecursoAudio {

  constructor(
    public fechaCarga: Date,
    public urlAudio: string,
    public descripcionAudio: string,
    public categoria: Categoria
  ) {}
}

