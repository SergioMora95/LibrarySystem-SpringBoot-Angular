import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositorioExterno } from '../models/repositorio-externo';

@Component({
  selector: 'app-repositorio-externo-delete-dialog',
  templateUrl: './repositorio-externo-delete-dialog.component.html',
  styleUrls: ['./repositorio-externo-delete-dialog.component.css']
})
export class RepositorioExternoDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RepositorioExternoDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { repositorioexterno: RepositorioExterno }
  ) {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}

