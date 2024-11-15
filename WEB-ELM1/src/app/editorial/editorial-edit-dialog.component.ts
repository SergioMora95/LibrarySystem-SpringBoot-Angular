import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editorial } from '../models/editorial';
import { EditorialService } from '../service/editorial.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editorial-edit-dialog',
  templateUrl: './editorial-edit-dialog.component.html',
  styleUrls: ['./editorial-edit-dialog.component.css']
})
export class EditorialEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditorialEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Editorial,
    private editorialService: EditorialService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.editorialService.update(this.data).subscribe(
      () => {
        this.toastr.success('Editorial Actualizada', 'Éxito', { timeOut: 3000 });
        this.dialogRef.close(this.data); 
      },
      err => {
        this.toastr.error('Error al actualizar la Editorial', 'Error', { timeOut: 3000 });
        console.error(err);
      }
    );
  }  
}
