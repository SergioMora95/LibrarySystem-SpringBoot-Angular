import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecursoVideo } from '../models/recurso-video';

@Component({
  selector: 'app-recurso-video-delete-dialog',
  templateUrl: './recurso-video-delete-dialog.component.html',
  styleUrls: ['./recurso-video-delete-dialog.component.css']
})
export class RecursoVideoDeleteDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<RecursoVideoDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recursovideo: RecursoVideo }
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}
