import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Libro } from '../models/libro';

@Component({
  selector: 'app-libro-delete-dialog',
  templateUrl: './libro-delete-dialog.component.html',
  styleUrls: ['./libro-delete-dialog.component.css']
})
export class LibroDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LibroDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { libro: Libro }
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}
