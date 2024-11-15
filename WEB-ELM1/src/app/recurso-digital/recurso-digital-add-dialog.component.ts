import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecursoDigitalService } from '../service/recurso-digital.service';
import { ToastrService } from 'ngx-toastr';
import { Autor } from '../models/autor';
import { Categoria } from '../models/categoria';
import { AutorService } from '../service/autor.service';
import { CategoriaService } from '../service/categoria.service';
import { RecursoDigital } from '../models/recurso-digital';
import { MediaService } from '../service/media.service';

@Component({
  selector: 'app-recurso-digital-add-dialog',
  templateUrl: './recurso-digital-add-dialog.component.html',
  styleUrls: ['./recurso-digital-add-dialog.component.css']
})
export class RecursoDigitalAddDialogComponent implements OnInit {
 

  form: FormGroup;
  autores!: Autor[];
  categorias!: Categoria[];
  url1?: string;
  url2?: string;

  constructor(
    private mediaService: MediaService,
    private autorService: AutorService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private recursodigitalService: RecursoDigitalService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RecursoDigitalAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombreRecurso: ['', Validators.required],
      imagenRecurso: ['', Validators.required],
      archivoRecurso: ['', Validators.required],
      estadoRecursoDigital: ['', Validators.required],
      autorId: ['', Validators.required],
      categoriaId: ['', Validators.required]
    });
  }

  upload(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      this.mediaService.uploadFile(formData)
        .subscribe(response => {
          console.log('response', response);
  
          if (response) {
            const fileName = file.name; // Obtiene el nombre del archivo
            const mediaUrl = 'https://wksvzctx-4200.use2.devtunnels.ms/assets/mediafiles/' + fileName; // Construye la URL completa
            
            if (file.type.startsWith('image')) {
              this.form.patchValue({ imagenRecurso: mediaUrl }); // Asigna la URL completa al campo de la imagen en el formulario
              this.url1 = mediaUrl;  // Actualiza la variable de la imagen
            } else {
              this.form.patchValue({ archivoRecurso: mediaUrl }); // Asigna la URL completa al campo del archivo en el formulario
              this.url2 = mediaUrl;  // Actualiza la variable del archivo
            }
          }
        });
    }
  }

  ngOnInit(): void {
    this.autorService.getAll().subscribe(autores => this.autores = autores);
    this.categoriaService.getAll().subscribe(categorias => this.categorias = categorias);
  }

  onSave(): void {
    if (this.form.valid) {
      const newRecursoDigital: RecursoDigital = {
        ...this.form.value,
        autor: { idAutor: this.form.value.autorId },
        categoria: { idCategoria: this.form.value.categoriaId }
      };
      this.recursodigitalService.create(newRecursoDigital).subscribe({
        next: (res) => {
          this.toastr.success('Recurso Digital agregado con éxito', 'Éxito');
          this.dialogRef.close(res);
        },
        error: (e) => {
          this.toastr.error('Ocurrió un error al agregar el Recurso Digital', 'Error');
          console.error(e);
        }
      });
    }
  }
  

  onClose(): void {
    this.dialogRef.close();
  }
}