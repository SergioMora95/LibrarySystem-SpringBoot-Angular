import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prestamo } from '../models/prestamo';

@Component({
  selector: 'app-prestamo-delete-dialog',
  templateUrl: './prestamo-delete-dialog.component.html',
  styleUrls: ['./prestamo-delete-dialog.component.css']
})
export class PrestamoDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PrestamoDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { prestamo: Prestamo }
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}