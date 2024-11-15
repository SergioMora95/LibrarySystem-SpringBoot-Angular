import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LibroService } from '../service/libro.service';
import { ToastrService } from 'ngx-toastr';
import { Autor } from '../models/autor';
import { Editorial } from '../models/editorial';
import { Categoria } from '../models/categoria';
import { AutorService } from '../service/autor.service';
import { EditorialService } from '../service/editorial.service';
import { CategoriaService } from '../service/categoria.service';
import { Libro } from '../models/libro';

@Component({
  selector: 'app-libro-add-dialog',
  templateUrl: './libro-add-dialog.component.html',
  styleUrls: ['./libro-add-dialog.component.css']
})
export class LibroAddDialogComponent implements OnInit {
  form: FormGroup;
  autores!: Autor[];
  editoriales!: Editorial[]; 
  categorias!: Categoria[];

  constructor(
    private autorService: AutorService,
    private editorialService: EditorialService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private libroService: LibroService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<LibroAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      tituloLibro: ['', [Validators.required, Validators.maxLength(50)]],
      cantidadLibro: [0, [Validators.required, Validators.min(0)]],
      descripcionLibro: ['', [Validators.required, Validators.maxLength(1000)]],
      imagenLibro: ['', Validators.maxLength(200)],
      estadoLibro: ['', Validators.required],
      autorId: [null, Validators.required],
      editorialId: [null, Validators.required],
      categoriaId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.autorService.getAll().subscribe(autores => this.autores = autores);
  this.editorialService.getAll().subscribe(editoriales => this.editoriales = editoriales);
  this.categoriaService.getAll().subscribe(categorias => this.categorias = categorias);
  }

  onSave(): void {
    if (this.form.valid) {
      const newLibro: Libro = {
        ...this.form.value,
        autor: { idAutor: this.form.value.autorId },
        editorial: { idEditorial: this.form.value.editorialId },
        categoria: { idCategoria: this.form.value.categoriaId }
      };
      this.libroService.create(newLibro).subscribe({
        next: (res) => {
          this.toastr.success('Libro agregado con éxito', 'Éxito');
          this.dialogRef.close(res);
        },
        error: (e) => {
          this.toastr.error('Ocurrió un error al agregar el libro', 'Error');
          console.error(e);
        }
      });
    }
  }
  

  onClose(): void {
    this.dialogRef.close();
  }
}
