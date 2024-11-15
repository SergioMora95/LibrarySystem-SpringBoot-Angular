import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../service/categoria.service';
import { RepositorioExternoService } from '../service/repositorio-externo.service';
import { ToastrService } from 'ngx-toastr';
import { Autor } from '../models/autor';
import { Categoria } from '../models/categoria';
import { RepositorioExterno } from '../models/repositorio-externo';

@Component({
  selector: 'app-repositorio-externo-edit-dialog',
  templateUrl: './repositorio-externo-edit-dialog.component.html',
  styleUrls: ['./repositorio-externo-edit-dialog.component.css']
})
export class RepositorioExternoEditDialogComponent implements OnInit {
  editForm: FormGroup;
  autores: Autor[] = [];
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RepositorioExternoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RepositorioExterno,
    private repositorioexternoService: RepositorioExternoService,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      idRepositorio: [data.idRepositorio],
      urlRepositorio: [data.urlRepositorio, Validators.required],
      descripcionRepositorio: [data.descripcionRepositorio, Validators.required],
      fechaCarga: [data.fechaCarga, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSave() {
    if (this.editForm.valid) {
      const repositorioexterno: RepositorioExterno = {
        ...this.data,
        ...this.editForm.value,
        autor: this.autores.find(a => a.idAutor === this.editForm.value.autorId),
        categoria: this.categorias.find(c => c.idCategoria === this.editForm.value.categoriaId)
      };

      this.repositorioexternoService.update(repositorioexterno).subscribe(
        data => {
          this.toastr.success('Repositorio Externo actualizado correctamente', 'Actualización exitosa');
          this.dialogRef.close(data);
        },
        error => {
          this.toastr.error('Hubo un error al actualizar el Repositorio Externo', 'Error');
          console.error(error);
        }
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
