import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecursoDigital } from '../models/recurso-digital';

@Component({
  selector: 'app-recurso-digital-delete-dialog',
  templateUrl: './recurso-digital-delete-dialog.component.html',
  styleUrls: ['./recurso-digital-delete-dialog.component.css']
})
export class RecursoDigitalDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RecursoDigitalDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recursodigital: RecursoDigital }
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}
