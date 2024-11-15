import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../models/categoria'; // Asegúrate de que la ruta esté correcta
import { CategoriaService } from '../service/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-add-dialog',
  templateUrl: './categoria-add-dialog.component.html',
  styleUrls: ['./categoria-add-dialog.component.css']
})
export class CategoriaAddDialogComponent {
  nombreCategoria = '';

  constructor(
    public dialogRef: MatDialogRef<CategoriaAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categoria,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const nuevoCategoria = new Categoria(this.data.nombreCategoria);
    this.categoriaService.create(nuevoCategoria).subscribe(
      () => {
        this.toastr.success('Categoria Creada', 'Éxito', { timeOut: 3000 });
        this.dialogRef.close(nuevoCategoria);
      },
      err => {
        this.toastr.error('Error al crear la categoria', 'Error', { timeOut: 3000 });
        console.error(err);
      }
    );
  }
  
  
}
