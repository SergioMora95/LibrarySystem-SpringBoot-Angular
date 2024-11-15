import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../service/categoria.service';
import { RecursoVideoService } from '../service/recurso-video.service';
import { ToastrService } from 'ngx-toastr';
import { Autor } from '../models/autor';
import { Categoria } from '../models/categoria';
import { RecursoVideo } from '../models/recurso-video';

@Component({
  selector: 'app-recurso-video-edit-dialog',
  templateUrl: './recurso-video-edit-dialog.component.html',
  styleUrls: ['./recurso-video-edit-dialog.component.css']
})
export class RecursoVideoEditDialogComponent implements OnInit {
  editForm: FormGroup;
  autores: Autor[] = [];
  categorias: Categoria[] = [];
  videoId: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecursoVideoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecursoVideo,
    private categoriaService: CategoriaService,
    private recursovideoService: RecursoVideoService,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      idVideo: [data.idVideo],
      urlVideo: [data.urlVideo, Validators.required],
      descripcionVideo: [data.descripcionVideo, Validators.required],
      fechaCarga: [data.fechaCarga, Validators.required],
      categoriaId: [data.categoria?.idCategoria, Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoriaService.getAll().subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.updateVideoId(); // Llama al método updateVideoId() en la inicialización del componente
  }

  onSave() {
    if (this.editForm.valid) {
      const recursovideo: RecursoVideo = {
        ...this.data,
        ...this.editForm.value,
        autor: this.autores.find(a => a.idAutor === this.editForm.value.autorId),
        categoria: this.categorias.find(c => c.idCategoria === this.editForm.value.categoriaId)
      };

      this.recursovideoService.update(recursovideo).subscribe(
        data => {
          this.toastr.success('Recurso Video actualizado correctamente', 'Actualización exitosa');
          this.dialogRef.close(data);
        },
        error => {
          this.toastr.error('Hubo un error al actualizar el Recurso Video', 'Error');
          console.error(error);
        }
      );
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  updateVideoId(): void {
    this.videoId = this.editForm.get('urlVideo')?.value;
  }
}
