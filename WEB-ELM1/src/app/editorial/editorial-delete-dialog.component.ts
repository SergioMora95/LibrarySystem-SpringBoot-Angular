import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editorial } from '../models/editorial';

@Component({
  selector: 'app-editorial-delete-dialog',
  templateUrl: './editorial-delete-dialog.component.html',
  styleUrls: ['./editorial-delete-dialog.component.css']
})
export class EditorialDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditorialDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editorial: Editorial }
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}
