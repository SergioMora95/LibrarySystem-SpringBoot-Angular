import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editorial } from '../models/editorial'; // Asegúrate de que la ruta esté correcta
import { EditorialService } from '../service/editorial.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editorial-add-dialog',
  templateUrl: './editorial-add-dialog.component.html',
  styleUrls: ['./editorial-add-dialog.component.css']
})
export class EditorialAddDialogComponent {
  nombreEditorial = '';

  constructor(
    public dialogRef: MatDialogRef<EditorialAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Editorial,
    private editorialService: EditorialService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const nuevoEditorial = new Editorial(this.data.nombreEditorial);
    this.editorialService.create(nuevoEditorial).subscribe(
      () => {
        this.toastr.success('Editorial Creada', 'Éxito', { timeOut: 3000 });
        this.dialogRef.close(nuevoEditorial);
      },
      err => {
        this.toastr.error('Error al crear la editorial', 'Error', { timeOut: 3000 });
        console.error(err);
      }
    );
  }
  
  
}
