import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LibroService } from '../service/libro.service';
import { Libro } from '../models/libro';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LibroAddDialogComponent } from './libro-add-dialog.component';
import { LibroEditDialogComponent } from './libro-edit-dialog.component';
import { LibroDeleteDialogComponent } from './libro-delete-dialog.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idLibro', 'tituloLibro', 'cantidadLibro', 'descripcionLibro', 'imagenLibro', 'estadoLibro', 'autor', 'editorial', 'categoria'];
  dataSource = new MatTableDataSource<Libro>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombreLibro = '';
  selectedLibro: Libro | null = null;
  isAdmin = false;
  isLoading = true; 

  constructor(
    private libroService: LibroService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listLibros();
    this.isLoading = true;
    this.libroService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
    this.isAdmin = this.tokenService.isAdmin();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listLibros(): void {
    this.libroService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error(error);
    });
  }

  actualizarTabla() {
    this.listLibros();
    this.selectedLibro = null;
    this.cdr.detectChanges();
    this.isLoading = true;
    this.libroService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
  }


  selectLibro(libro: Libro) {
    this.selectedLibro = libro;
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(LibroAddDialogComponent, {
      width: '600px',
      data: { }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource<Libro>(this.dataSource.data);
        this.cdr.detectChanges();
        this.actualizarTabla();
      }
    });
  }

  openEditDialog(libro: Libro): void {
    const libroCopy = { ...libro }; 
    const dialogRef = this.dialog.open(LibroEditDialogComponent, {
      width: '600px',
      data: libroCopy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        const index = this.dataSource.data.findIndex(a => a.idLibro === result.idLibro);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource<Libro>(this.dataSource.data); 
          this.actualizarTabla();
        }
      }
    });
  }
  

  editarSeleccionado() {
    if (this.selectedLibro) {
      this.openEditDialog(this.selectedLibro);
    }
  }
  
  eliminarSeleccionado() {
    if (this.selectedLibro) {
      const dialogRef = this.dialog.open(LibroDeleteDialogComponent, {
        data: { libro: this.selectedLibro }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.libroService.delete(this.selectedLibro!.idLibro!).subscribe(
            () => {
              this.toastr.success('Libro eliminado', 'Éxito', { timeOut: 3000 });
              this.actualizarTabla();
            },
            err => {
              this.toastr.error('No se pudo eliminar el libro', 'Error', { timeOut: 3000 });
            }
          );
        }
      });
    } else {
      this.toastr.error('No se ha seleccionado un libro.', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-end',
      });
    }
  }
  
  
  exportToExcel(): void {
    // Crear una nueva matriz de objetos para almacenar los datos a exportar
    const dataToExport = this.dataSource.data.map(libro => {
        return {
            idLibro: libro.idLibro,
            tituloLibro: libro.tituloLibro,
            cantidadLibro: libro.cantidadLibro,
            descripcionLibro: libro.descripcionLibro,
            autor: libro.autor ? libro.autor.nombreAutor : '',
            editorial: libro.editorial ? libro.editorial.nombreEditorial : '',
            categoria: libro.categoria ? libro.categoria.nombreCategoria : ''
        };
    });

    // Convertir la matriz de datos a una hoja de cálculo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

    // Crear un libro y agregar la hoja de cálculo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convertir el libro a un archivo Blob y descargarlo
    const wbout: Blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(wbout, 'Libros.xlsx');
}
  
  
  exportToPdf(): void {
    const element = document.getElementById('TablaLibro');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'landscape',
        });
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        doc.save('Libros.pdf');
      });
    } else {
      console.error('El elemento no se encuentra en el DOM');
    }
  }
  


}

