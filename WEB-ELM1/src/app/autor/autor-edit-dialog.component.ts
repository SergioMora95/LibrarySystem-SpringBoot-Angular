import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Autor } from '../models/autor';
import { AutorService } from '../service/autor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-autor-edit-dialog',
  templateUrl: './autor-edit-dialog.component.html',
  styleUrls: ['./autor-edit-dialog.component.css']
})
export class AutorEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AutorEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Autor,
    private autorService: AutorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.autorService.update(this.data).subscribe(
      () => {
        this.toastr.success('Autor Actualizado', 'Éxito', { timeOut: 3000 });
        this.dialogRef.close(this.data); 
      },
      err => {
        this.toastr.error('Error al actualizar el autor', 'Error', { timeOut: 3000 });
        console.error(err);
      }
    );
  }  
}
