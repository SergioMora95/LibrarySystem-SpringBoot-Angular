import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LibroService } from '../service/libro.service';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from '../models/prestamo';
import { Usuario } from '../models/usuario';
import { Libro } from '../models/libro';
import { PrestamoService } from '../service/prestamo.service';
import { UsuarioService } from '../service/usuario.service';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-prestamo-add-dialog',
  templateUrl: './prestamo-add-dialog.component.html',
  styleUrls: ['./prestamo-add-dialog.component.css']
})
export class PrestamoAddDialogComponent implements OnInit {
  form: FormGroup;
  usuario!: Usuario[]; 
  libro!: Libro[];
  fechaActual: Date = new Date(); // Obtener la fecha actual

  constructor(
    private libroService: LibroService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private prestamoService: PrestamoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<PrestamoAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      idPrestamo: [0],
      cantidadPrestamo: ['', [Validators.required, Validators.min(1)]], // Validar que no sea menor o igual a 0
      fechaPrestamo: [this.fechaActual.toISOString().split('T')[0], Validators.required], // Campo de fecha de solo lectura
      fechaDevolucion: ['', [Validators.required, this.fechaDevolucionValidator]], // Aplicar validación personalizada
      observacionPrestamo: ['', Validators.required],
      estadoPrestamo: ['', Validators.required],
      libro: ['', Validators.required],
      id: ['', Validators.required],
    });
  }
  formatLocalDate(date: Date | string): string {
    return moment(date).tz('America/Bogota').format('DD-MM-YYYY');
  }
  ngOnInit(): void {
    this.libroService.getDisponibles().subscribe(libro => this.libro = libro);
    this.usuarioService.getAll().subscribe(usuario => this.usuario = usuario);
  }

  onSave(): void {
    if (this.form.valid) {
      const cantidadPrestamo: number = this.form.value.cantidadPrestamo;
      const libroSeleccionado: Libro | undefined = this.libro.find(l => l.idLibro === this.form.value.libro);
  
      if (libroSeleccionado) {
        const cantidadDisponible = libroSeleccionado.cantidadLibro - cantidadPrestamo;
  
        if (cantidadDisponible >= 0) {
          const newPrestamo: Prestamo = {
            ...this.form.value,
            usuario: { id: this.form.value.id },
            libro: { idLibro: this.form.value.libro },
          };
          this.prestamoService.create(newPrestamo).subscribe({
            next: (res) => {
              this.toastr.success('Préstamo agregado con éxito', 'Éxito');
              this.dialogRef.close(res);
            },
            error: (e) => {
              this.toastr.error('Ocurrió un error al agregar el préstamo', 'Error');
              console.error(e);
            }
          });
        } else {
          // Aquí se modifica el mensaje para incluir la cantidad disponible
          this.toastr.error(`No hay suficientes ejemplares disponibles. Solo quedan ${libroSeleccionado.cantidadLibro} en stock.`, 'Error');
        }
      } else {
        // Si no se encuentra el libro seleccionado, se muestra este mensaje de error
        this.toastr.error('El libro seleccionado no existe', 'Error');
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  // Validador personalizado para la fecha de devolución
  fechaDevolucionValidator(control: import("@angular/forms").AbstractControl): { [key: string]: any } | null {
    const fechaDevolucion = new Date(control.value);
    const fechaActual = new Date();

    if (fechaDevolucion < fechaActual) {
      return { 'fechaInvalida': true };
    }

    return null;
  }
}
