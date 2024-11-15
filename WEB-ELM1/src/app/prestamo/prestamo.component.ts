import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PrestamoService } from '../service/prestamo.service';
import { Prestamo } from '../models/prestamo';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PrestamoAddDialogComponent } from './prestamo-add-dialog.component';
import { PrestamoEditDialogComponent } from './prestamo-edit-dialog.component';
import { PrestamoDeleteDialogComponent } from './prestamo-delete-dialog.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { EmailValuesDTO } from '../models/email-values-dto';
import { EmailPasswordService } from '../service/email-password.service';
import { Usuario } from '../models/usuario';
import { HistorialPrestamo } from '../models/historial-prestamo';
import { HistorialPrestamoService } from '../service/historial-prestamo.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idPrestamo', 'cantidadPrestamo', 'fechaPrestamo', 'fechaDevolucion', 'observacionPrestamo', 'estadoPrestamo', 'libro', 'usuario'];
  displayedColumnsHistorial: string[] = ['id', 'prestamo', 'fechaCambio', 'estadoAnterior', 'estadoNuevo', 'descripcion'];
  dataSource = new MatTableDataSource<Prestamo>();
  dataSourceHistorial = new MatTableDataSource<HistorialPrestamo>();


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedPrestamo: Prestamo | null = null;
  isAdmin = false;
  isLoading = true; 
  mailTo?: string;
  dto?: EmailValuesDTO;
  historialPrestamoList?: HistorialPrestamo[];

  constructor(
    private prestamoService: PrestamoService,
    private email: EmailPasswordService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private historialPrestamoService: HistorialPrestamoService
  ) {}
  formatLocalDate(date: Date | string): string {
    return moment(date).tz('America/Bogota').format('DD-MM-YYYY');
  }
  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    if (this.isAdmin) {
    
      this.prestamoService.getAll().subscribe(
        data => {
          this.dataSource.data = data;
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        }
      );
    } else {
      
      this.prestamoService.getMisPrestamos().subscribe(
        data => {
          this.dataSource.data = data;
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        }
      );
    }
    this.getHistorialPrestamoList();
    
  }

  getHistorialPrestamoList(): void {

      this.historialPrestamoService.getHistorialPrestamoList().subscribe(
        data => {
          this.dataSourceHistorial.data = data;
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listPrestamos(): void {
    if (this.isAdmin) {
      this.prestamoService.getAll().subscribe(
        data => {
          this.dataSource.data = data;
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        }
      );
    } else {
      this.prestamoService.getMisPrestamos().subscribe(
        data => {
          this.dataSource.data = data;
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        }
      );
    }
  }

  prestado(): void {
    this.isLoading = true;
    this.selectedPrestamo = null;
    this.prestamoService.getListPrestados().subscribe(
      data => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  noDevuelto(): void {
    this.isLoading = true;
    this.selectedPrestamo = null;
    this.prestamoService.getListNoDevueltos().subscribe(
      data => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }
  
  Devuelto(): void {
    this.isLoading = true;
    this.selectedPrestamo = null;
    this.prestamoService.getListDevueltos().subscribe(
      data => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  actualizarTabla() {
    this.listPrestamos();
    this.selectedPrestamo = null;
    this.cdr.detectChanges();
    this.isLoading = true;
    this.prestamoService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
  }


  selectPrestamo(prestamo: Prestamo) {
    this.selectedPrestamo = prestamo;
  }  

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
  // Aplicar el filtro para las columnas comunes
  this.dataSource.filter = filterValue;

  // Si hay un paginador, regresar a la primera página
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

  // Aplicar el filtro personalizado para las columnas con datos foráneos
  this.dataSource.filterPredicate = (data, filter) => {
    const libroTitulo = data.libro ? data.libro.tituloLibro.toLowerCase() : '';
    const usuarioNombre = data.usuario ? data.usuario.nombre!.toLowerCase() : '';
    return libroTitulo.includes(filter) || usuarioNombre.includes(filter);
  };
}

  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(PrestamoAddDialogComponent, {
      width: '600px',
      data: { }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource<Prestamo>(this.dataSource.data);
        this.cdr.detectChanges();
        this.actualizarTabla();
      }
    });
  }

  openEditDialog(prestamo: Prestamo): void {
    const prestamoCopy = { ...prestamo }; 
    const dialogRef = this.dialog.open(PrestamoEditDialogComponent, {
      width: '600px',
      data: prestamoCopy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        const index = this.dataSource.data.findIndex(a => a.idPrestamo === result.idPrestamo);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource<Prestamo>(this.dataSource.data); 
          this.actualizarTabla();
        }
      }
    });
  }
  

  editarSeleccionado() {
    if (this.selectedPrestamo) {
      this.openEditDialog(this.selectedPrestamo);
    }
  }
  
  eliminarSeleccionado() {
    if (this.selectedPrestamo) {
      const dialogRef = this.dialog.open(PrestamoDeleteDialogComponent, {
        data: { prestamo: this.selectedPrestamo }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.prestamoService.delete(this.selectedPrestamo!.idPrestamo!).subscribe(
            () => {
              this.toastr.success('prestamo eliminado', 'Éxito', { timeOut: 3000 });
              this.actualizarTabla();
            },
            err => {
              this.toastr.error('No se pudo eliminar el prestamo', 'Error', { timeOut: 3000 });
            }
          );
        }
      });
    } else {
      this.toastr.error('No se ha seleccionado un prestamo.', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-end',
      });
    }
  }
  
  
  exportToExcel(): void {
    this.isLoading = true;
    // Mapear los datos del dataSource para incluir los atributos relacionados
    const dataToExport = this.dataSource.data.map(prestamo => {
      return {
        idPrestamo: prestamo.idPrestamo,
        cantidadPrestamo: prestamo.cantidadPrestamo,
        fechaPrestamo: prestamo.fechaPrestamo,
        fechaDevolucion: prestamo.fechaDevolucion,
        observacionPrestamo: prestamo.observacionPrestamo,
        estadoPrestamo: prestamo.estadoPrestamo,
        vecesRenovado: prestamo.vecesRenovado,
        ultimaFechaRenovacion: prestamo.ultimaFechaRenovacion,
        libro: prestamo.libro ? prestamo.libro.tituloLibro : '',
        autor: prestamo.libro && prestamo.libro.autor ? prestamo.libro.autor.nombreAutor : '',
        editorial: prestamo.libro && prestamo.libro.editorial ? prestamo.libro.editorial.nombreEditorial : '',
        categoria: prestamo.libro && prestamo.libro.categoria ? prestamo.libro.categoria.nombreCategoria : '',
        usuario: prestamo.usuario ? prestamo.usuario.nombre : ''
      };
    });
  
    // Convertir la matriz de datos a una hoja de cálculo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  
    // Crear un libro y agregar la hoja de cálculo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Convertir el libro a un archivo Blob y descargarlo
    const wbout: Blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(wbout, 'prestamos.xlsx');
    this.isLoading = false;
  }
  
  renovarPrestamo(): void {
    this.isLoading = true;
    if (this.selectedPrestamo) {
      this.prestamoService.renovarPrestamo(this.selectedPrestamo.idPrestamo!).subscribe(
        () => {
          this.toastr.success('Préstamo renovado con éxito', 'Éxito', { timeOut: 3000 });
          this.actualizarTabla();
          this.isLoading = false;
        },
        err => {
          this.toastr.error('No se pudo renovar el préstamo', 'Error', { timeOut: 3000 });
          this.isLoading = false;
        }
      );
    } else {
      this.toastr.error('No se ha seleccionado un préstamo para renovar.', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-end',
      });
      this.isLoading = false;
    }
  }

  enviarCorreo(prestamo: Prestamo): void {
    this.isLoading = true;
    this.selectedPrestamo = null;
    const dto: EmailValuesDTO = { 
      mailTo: prestamo.usuario.nombreUsuario!,
    };
  
    this.email.sendEmailPrestamo(dto).subscribe(
      response => {
        this.toastr.success(response.message, 'Correo Enviado Exitosamente');
        this.isLoading = false;
      },
      error => {
        this.toastr.error('Error al enviar el correo', 'Error');
        this.isLoading = false;
      }
    );
  }
  
  onOptionSelected(event: any): void {
    const selectedValue = event.target.value;
    if (selectedValue) {
      switch (selectedValue) {
        case 'Todos':
          this.listPrestamos();
          break;
        case 'prestado':
          this.prestado();
          break;
        case 'noDevuelto':
          this.noDevuelto();
          break;
        case 'Devuelto':
          this.Devuelto();
          break;
        default:
          break;
      }
    }
  }
  
  
  
  exportToPdf(): void {
    this.isLoading = true;
    const element = document.getElementById('Tablaprestamo');
    if (element) {
      const doc = new jsPDF({
        orientation: 'landscape',
      });

      // Contador de páginas
      let pageCount = 0;

      // Función para agregar una página al PDF
      const addPage = () => {
        if (pageCount > 0) {
          doc.addPage();
        }
        pageCount++;
      };

      // Función para agregar la captura de pantalla de cada página al PDF
      const addScreenshotToPdf = (canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
      };

      // Función recursiva para tomar una captura de pantalla de cada página
      const capturePage = (pageNumber: number) => {
        if (pageNumber > 0) {
          this.dataSource.paginator!.pageIndex = pageNumber - 1;
          this.dataSource._updateChangeSubscription();
          setTimeout(() => {
            html2canvas(element).then(canvas => {
              addPage();
              addScreenshotToPdf(canvas);
              capturePage(pageNumber - 1); // Captura la siguiente página
            });
          }, 500); // Ajusta este valor según sea necesario para permitir que se renderice la página antes de la captura de pantalla
        } else {
          this.isLoading = false;
          // Todas las páginas capturadas, guardar el PDF
          doc.save('prestamos.pdf');
        }
      };

      // Iniciar la captura de pantalla de la última página
      const lastPageNumber = Math.ceil(this.dataSource.paginator!.length / this.dataSource.paginator!.pageSize);
      capturePage(lastPageNumber);
    } else {
      console.error('El elemento no se encuentra en el DOM');
    }
  }


  actualizarTablaHistorial() {
    this.getHistorialPrestamoList();
    this.cdr.detectChanges();
    this.isLoading = true;
    this.historialPrestamoService.getHistorialPrestamoList().subscribe(
      data => {
        this.dataSourceHistorial.data = data;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  applyFilterHistorial(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    // Aplicar el filtro para las columnas comunes
    this.dataSourceHistorial.filter = filterValue;
  
    // Si hay un paginador, regresar a la primera página
    if (this.dataSourceHistorial.paginator) {
      this.dataSourceHistorial.paginator.firstPage();
    }
  
    // Aplicar el filtro personalizado para las columnas con datos numéricos
this.dataSourceHistorial.filterPredicate = (data, filter) => {
  const prestamoId = data.prestamo ? data.prestamo.idPrestamo : null;
  const filterNumber = parseInt(filter, 10);
  return prestamoId === filterNumber;
};

  }

  

  exportToExcelHistorial(): void {
    this.isLoading = true;

    // Mapear los datos del dataSource para incluir los atributos relacionados
    const dataToExport = this.dataSourceHistorial.data.map(historialPrestamo => {
      return {
        id: historialPrestamo.id,
        prestamo: historialPrestamo.prestamo.idPrestamo ? historialPrestamo.prestamo.idPrestamo : '',
        fechaCambio: historialPrestamo.fechaCambio,
        estadoAnterior: historialPrestamo.estadoAnterior,
        estadoNuevo: historialPrestamo.estadoNuevo,
        descripcion: historialPrestamo.descripcion,
        
      };
    });
  
    // Convertir la matriz de datos a una hoja de cálculo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  
    // Crear un libro y agregar la hoja de cálculo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Convertir el libro a un archivo Blob y descargarlo
    const wbout: Blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(wbout, 'HistorialPrestamos.xlsx');
    this.isLoading = false;
  }


}