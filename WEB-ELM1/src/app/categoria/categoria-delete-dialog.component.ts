import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-categoria-delete-dialog',
  templateUrl: './categoria-delete-dialog.component.html',
  styleUrls: ['./categoria-delete-dialog.component.css']
})
export class CategoriaDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoriaDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoria: Categoria }
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}
