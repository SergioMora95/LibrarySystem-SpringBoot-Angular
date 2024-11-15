import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutorService } from '../service/autor.service';
import { EditorialService } from '../service/editorial.service';
import { CategoriaService } from '../service/categoria.service';
import { LibroService } from '../service/libro.service';
import { ToastrService } from 'ngx-toastr';
import { Autor } from '../models/autor';
import { Editorial } from '../models/editorial';
import { Categoria } from '../models/categoria';
import { Libro } from '../models/libro';

@Component({
  selector: 'app-libro-edit-dialog',
  templateUrl: './libro-edit-dialog.component.html',
  styleUrls: ['./libro-edit-dialog.component.css']
})
export class LibroEditDialogComponent implements OnInit {
  editForm: FormGroup;
  autores: Autor[] = [];
  editoriales: Editorial[] = [];
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LibroEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Libro,
    private autorService: AutorService,
    private editorialService: EditorialService,
    private categoriaService: CategoriaService,
    private libroService: LibroService,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      tituloLibro: [data.tituloLibro, Validators.required],
      cantidadLibro: [data.cantidadLibro, Validators.required],
      descripcionLibro: [data.descripcionLibro, Validators.required],
      imagenLibro: [data.imagenLibro],
      estadoLibro: [data.estadoLibro, Validators.required],
      autorId: [data.autor?.idAutor, Validators.required],
      editorialId: [data.editorial?.idEditorial, Validators.required],
      categoriaId: [data.categoria?.idCategoria, Validators.required]
    });
  }

  ngOnInit(): void {
    this.autorService.getAll().subscribe((autores) => {
      this.autores = autores;
    });
    this.editorialService.getAll().subscribe((editoriales) => {
      this.editoriales = editoriales;
    });
    this.categoriaService.getAll().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  onSave() {
    if (this.editForm.valid) {
      const libro: Libro = {
        ...this.data,
        ...this.editForm.value,
        autor: this.autores.find(a => a.idAutor === this.editForm.value.autorId),
        editorial: this.editoriales.find(e => e.idEditorial === this.editForm.value.editorialId),
        categoria: this.categorias.find(c => c.idCategoria === this.editForm.value.categoriaId)
      };

      this.libroService.update(libro).subscribe(
        data => {
          this.toastr.success('Libro actualizado correctamente', 'Actualización exitosa');
          this.dialogRef.close(data);
        },
        error => {
          this.toastr.error('Hubo un error al actualizar el libro', 'Error');
          console.error(error);
        }
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
