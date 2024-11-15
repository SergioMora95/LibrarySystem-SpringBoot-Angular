import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecursoVideoService } from '../service/recurso-video.service';
import { ToastrService } from 'ngx-toastr';
import { Autor } from '../models/autor';
import { Categoria } from '../models/categoria';
import { AutorService } from '../service/autor.service';
import { CategoriaService } from '../service/categoria.service';
import { RecursoVideo } from '../models/recurso-video';

@Component({
  selector: 'app-recurso-video-add-dialog',
  templateUrl: './recurso-video-add-dialog.component.html',
  styleUrls: ['./recurso-video-add-dialog.component.css']
})
export class RecursoVideoAddDialogComponent implements OnInit {
  form: FormGroup;
  autores!: Autor[];
  categorias!: Categoria[];
  videoId: string = '';

  constructor(
    private autorService: AutorService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private recursovideoService: RecursoVideoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RecursoVideoAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      urlVideo: ['', Validators.required],
      descripcionVideo: ['', Validators.required],
      fechaCarga: ['', Validators.required],
      categoriaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargar el script de YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    this.autorService.getAll().subscribe(autores => this.autores = autores);
    this.categoriaService.getAll().subscribe(categorias => this.categorias = categorias);
  }

  onSave(): void {
    if (this.form.valid) {
      const newRecursoVideo: RecursoVideo = {
        ...this.form.value,
        autor: { idAutor: this.form.value.autorId },
        categoria: { idCategoria: this.form.value.categoriaId }
      };
      this.recursovideoService.create(newRecursoVideo).subscribe({
        next: (res) => {
          this.toastr.success('Recurso Video agregado con éxito', 'Éxito');
          this.dialogRef.close(res);
        },
        error: (e) => {
          this.toastr.error('Ocurrió un error al agregar el Recurso Video', 'Error');
          console.error(e);
        }
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  updateVideoId(): void {
    this.videoId = this.form.get('urlVideo')?.value;
  }
}
