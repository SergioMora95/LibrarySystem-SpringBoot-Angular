import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AutorService } from '../service/autor.service';
import { Autor } from '../models/autor';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AutorAddDialogComponent } from './autor-add-dialog.component';
import { AutorEditDialogComponent } from './autor-edit-dialog.component';
import { AutorDeleteDialogComponent } from './autor-delete-dialog.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idAutor', 'nombreAutor'];
  dataSource = new MatTableDataSource<Autor>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombreAutor = '';
  selectedAutor: Autor | null = null;
  isAdmin = false;
  isLoading = true; 

  constructor(
    private autorService: AutorService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listAutores();
    this.isLoading = true;
    this.autorService.getAll().subscribe(data => {
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

  listAutores(): void {
    this.autorService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error(error);
    });
  }

  actualizarTabla() {
    this.listAutores();
    this.selectedAutor = null;
    this.cdr.detectChanges();
    this.isLoading = true;
    this.autorService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
  }


  selectAutor(autor: Autor) {
    this.selectedAutor = autor;
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AutorAddDialogComponent, {
      width: '250px',
      data: { nombreAutor: '' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Autor) { 
        this.listAutores();
        this.actualizarTabla();
      }
    });
  }

  openEditDialog(autor: Autor): void {
    const autorCopy = { ...autor }; 
    const dialogRef = this.dialog.open(AutorEditDialogComponent, {
      width: '250px',
      data: autorCopy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(a => a.idAutor === result.idAutor);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource<Autor>(this.dataSource.data); 
          this.cdr.detectChanges();
          this.actualizarTabla();
        }
      }
    });
  }
  

  editarSeleccionado() {
    if (this.selectedAutor) {
      this.openEditDialog(this.selectedAutor);
    }
  }
  
  eliminarSeleccionado() {
    if (this.selectedAutor) {
      const dialogRef = this.dialog.open(AutorDeleteDialogComponent, {
        data: { autor: this.selectedAutor }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.autorService.delete(this.selectedAutor!.idAutor!).subscribe(
            () => {
              this.toastr.success('Autor eliminado', 'Éxito', { timeOut: 3000 });
              this.actualizarTabla();
            },
            err => {
              this.toastr.error('No se pudo eliminar el autor', 'Error', { timeOut: 3000 });
            }
          );
        }
      });
    } else {
      this.toastr.error('No se ha seleccionado un autor.', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-end',
      });
    }
  }
  
  
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const wbout: Blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(wbout, 'Autores.xlsx');
  }
  
  
  exportToPdf(): void {
    const element = document.getElementById('TablaAutor');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'landscape',
        });
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        doc.save('Autores.pdf');
      });
    } else {
      console.error('El elemento no se encuentra en el DOM');
    }
  }
  


}

