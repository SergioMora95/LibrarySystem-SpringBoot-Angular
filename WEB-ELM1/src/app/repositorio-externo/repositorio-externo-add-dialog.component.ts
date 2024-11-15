import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositorioExternoService } from '../service/repositorio-externo.service';
import { ToastrService } from 'ngx-toastr';
import { RepositorioExterno } from '../models/repositorio-externo';

@Component({
  selector: 'app-repositorio-externo-add-dialog',
  templateUrl: './repositorio-externo-add-dialog.component.html',
  styleUrls: ['./repositorio-externo-add-dialog.component.css']
})
export class RepositorioExternoAddDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private repositorioexternoService: RepositorioExternoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RepositorioExternoAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      urlRepositorio: ['', Validators.required],
      descripcionRepositorio: ['', Validators.required],
      fechaCarga: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    if (this.form.valid) {
      const newRepositorioExterno: RepositorioExterno = {
        ...this.form.value,
        autor: { idAutor: this.form.value.autorId },
        categoria: { idCategoria: this.form.value.categoriaId }
      };
      this.repositorioexternoService.create(newRepositorioExterno).subscribe({
        next: (res) => {
          this.toastr.success('repositorio externo agregado con éxito', 'Éxito');
          this.dialogRef.close(res);
        },
        error: (e) => {
          this.toastr.error('Ocurrió un error al agregar el repositorio externo', 'Error');
          console.error(e);
        }
      });
    }
  }
  

  onClose(): void {
    this.dialogRef.close();
  }
}
