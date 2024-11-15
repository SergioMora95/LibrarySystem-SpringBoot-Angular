import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../service/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoria-edit-dialog',
  templateUrl: './categoria-edit-dialog.component.html',
  styleUrls: ['./categoria-edit-dialog.component.css']
})
export class CategoriaEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategoriaEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categoria,
    private categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.categoriaService.update(this.data).subscribe(
      () => {
        this.toastr.success('Categoria Actualizada', 'Éxito', { timeOut: 3000 });
        this.dialogRef.close(this.data); 
      },
      err => {
        this.toastr.error('Error al actualizar la Categoria', 'Error', { timeOut: 3000 });
        console.error(err);
      }
    );
  }  
}
