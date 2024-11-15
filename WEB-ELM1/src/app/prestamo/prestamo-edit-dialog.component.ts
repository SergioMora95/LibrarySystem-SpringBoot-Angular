import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutorService } from '../service/autor.service';
import { EditorialService } from '../service/editorial.service';
import { CategoriaService } from '../service/categoria.service';
import { PrestamoService } from '../service/prestamo.service';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from '../models/prestamo';
import { Libro } from '../models/libro';
import { Usuario } from '../models/usuario';
import { LibroService } from '../service/libro.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-prestamo-edit-dialog',
  templateUrl: './prestamo-edit-dialog.component.html',
  styleUrls: ['./prestamo-edit-dialog.component.css']
})
export class PrestamoEditDialogComponent implements OnInit {
  editForm: FormGroup;
  libro: Libro[] = [];
  usuario: Usuario[] = [];
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PrestamoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prestamo,
    private libroService: LibroService,
    private usuarioService: UsuarioService,
    private prestamoService: PrestamoService,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      idPrestamo: [data.idPrestamo],
      cantidadPrestamo: [data.cantidadPrestamo, Validators.required],
      fechaPrestamo: [data.fechaPrestamo, Validators.required],
      fechaDevolucion: [data.fechaDevolucion, Validators.required],
      observacionPrestamo: [data.observacionPrestamo, Validators.required],
      estadoPrestamo: [data.estadoPrestamo],
      libro: [data.libro.idLibro, Validators.required],
      id: [data.usuario?.id, Validators.required],
    });
  }

  ngOnInit(): void {
    this.libroService.getAll().subscribe((libro) => {
      this.libro = libro;
    });
    this.usuarioService.getAll().subscribe((usuario) => {
      this.usuario = usuario;
    });
  }
  
  onSave() {
    if (this.editForm.valid) {
      const idUsuario = this.editForm.value.id;
      const idLibro = this.editForm.value.libro;
      
      const prestamo: Prestamo = {
        ...this.data,
        ...this.editForm.value,
        usuario: this.usuario.find(u => u.id === idUsuario),
        libro: this.libro.find(l => l.idLibro === idLibro)
      };
  
      this.prestamoService.update(prestamo).subscribe(
        data => {
          this.toastr.success('Prestamo actualizado correctamente', 'Actualización exitosa');
          this.dialogRef.close(data);
        },
        error => {
          this.toastr.error('Hubo un error al actualizar el Prestamo', 'Error');
          console.error(error);
        }
      );
    }
  }
  

  onClose() {
    this.dialogRef.close();
  }
}
