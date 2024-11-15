
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Autor } from '../models/autor';
import { Categoria } from '../models/categoria';
import { RecursoDigital } from '../models/recurso-digital';
import { AutorService } from '../service/autor.service';
import { CategoriaService } from '../service/categoria.service';
import { RecursoDigitalService } from '../service/recurso-digital.service';
import { MediaService } from '../service/media.service';

@Component({
  selector: 'app-recurso-digital-edit-dialog',
  templateUrl: './recurso-digital-edit-dialog.component.html',
  styleUrls: ['./recurso-digital-edit-dialog.component.css']
})
export class RecursoDigitalEditDialogComponent implements OnInit {

  editForm: FormGroup;
  autores: Autor[] = [];
  categorias: Categoria[] = [];
  url1?: string;
  url2?: string;

  constructor(
    private mediaService: MediaService,
    private autorService: AutorService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecursoDigitalEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecursoDigital,
    private toastr: ToastrService,
    private recursodigitalService: RecursoDigitalService
  ) {
    this.editForm = this.fb.group({
      idRecursoDigital: [data.idRecursoDigital],
      nombreRecurso: [data.nombreRecurso, Validators.required],
      imagenRecurso: [data.imagenRecurso],
      archivoRecurso: [data.archivoRecurso],
      estadoRecursoDigital: [data.estadoRecursoDigital],
      autorId: [data.autor?.idAutor, Validators.required],
      categoriaId: [data.categoria?.idCategoria, Validators.required]
    });

    // Establecer la URL de la imagen existente
    if (data.imagenRecurso) {
      this.url1 = data.imagenRecurso;
    }

    // Establecer la URL del PDF existente
    if (data.archivoRecurso) {
      this.url2 = data.archivoRecurso;
    }
  }

  upload(event: any, isImage: boolean) {
    const file = event.target.files[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      this.mediaService.uploadFile(formData)
        .subscribe(response => {
          console.log('response', response);
  
          if (response) {
            const fileName = file.name; // Obtiene el nombre del archivo
            const mediaUrl = 'http://localhost:4200/assets/mediafiles/' + fileName; // Construye la URL completa
            
            if (isImage) {
              this.editForm.patchValue({ imagenRecurso: mediaUrl }); // Asigna la URL completa al campo de la imagen en el formulario
              this.url1 = mediaUrl;  // Actualiza la variable de la imagen
            } else {
              this.editForm.patchValue({ archivoRecurso: mediaUrl }); // Asigna la URL completa al campo del archivo en el formulario
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
    if (this.editForm.valid) {
      const recursodigital: RecursoDigital = {
        ...this.data,
        ...this.editForm.value,
        autor: this.autores.find(a => a.idAutor === this.editForm.value.autorId),
        categoria: this.categorias.find(c => c.idCategoria === this.editForm.value.categoriaId)
      };

      this.recursodigitalService.update(recursodigital).subscribe(
        data => {
          this.toastr.success('Recurso Digital actualizado correctamente', 'Actualización exitosa');
          this.dialogRef.close(data);
        },
        error => {
          this.toastr.error('Hubo un error al actualizar el Recurso Digital', 'Error');
          console.error(error);
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}