import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Autor } from '../models/autor';

@Component({
  selector: 'app-autor-delete-dialog',
  templateUrl: './autor-delete-dialog.component.html',
  styleUrls: ['./autor-delete-dialog.component.css']
})
export class AutorDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AutorDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { autor: Autor }
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}
