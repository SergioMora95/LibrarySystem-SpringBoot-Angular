import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Autor } from '../models/autor'; // Asegúrate de que la ruta esté correcta
import { AutorService } from '../service/autor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autor-add-dialog',
  templateUrl: './autor-add-dialog.component.html',
  styleUrls: ['./autor-add-dialog.component.css']
})
export class AutorAddDialogComponent {
  nombreAutor = '';

  constructor(
    public dialogRef: MatDialogRef<AutorAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Autor,
    private autorService: AutorService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const nuevoAutor = new Autor(this.data.nombreAutor);
    this.autorService.create(nuevoAutor).subscribe(
      () => {
        this.toastr.success('Autor Creado', 'Éxito', { timeOut: 3000 });
        this.dialogRef.close(nuevoAutor); // Asegúrate de pasar el nuevo autor como resultado al cerrar
      },
      err => {
        this.toastr.error('Error al crear el autor', 'Error', { timeOut: 3000 });
        console.error(err);
      }
    );
  }
  
  
}
