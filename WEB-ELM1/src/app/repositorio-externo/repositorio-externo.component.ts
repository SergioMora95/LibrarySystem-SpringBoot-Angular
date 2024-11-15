import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RepositorioExternoService } from '../service/repositorio-externo.service';
import { RepositorioExterno } from '../models/repositorio-externo';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RepositorioExternoAddDialogComponent } from './repositorio-externo-add-dialog.component';
import { RepositorioExternoEditDialogComponent } from './repositorio-externo-edit-dialog.component';
import { RepositorioExternoDeleteDialogComponent } from './repositorio-externo-delete-dialog.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-repositorio-externo',
  templateUrl: './repositorio-externo.component.html',
  styleUrls: ['./repositorio-externo.component.css']
})
export class RepositorioExternoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idRepositorio', 'fechaCarga', 'urlRepositorio', 'descripcionRepositorio'];
  dataSource = new MatTableDataSource<RepositorioExterno>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedRepositorioExterno: RepositorioExterno | null = null;
  isAdmin = false;
  isLoading = true; 

  constructor(
    private repositorioexternoService: RepositorioExternoService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listRepositorioExterno();
    this.isLoading = true;
    this.repositorioexternoService.getAll().subscribe(data => {
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

  listRepositorioExterno(): void {
    this.repositorioexternoService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error(error);
    });
  }

  actualizarTabla() {
    this.listRepositorioExterno();
    this.selectedRepositorioExterno = null;
    this.cdr.detectChanges();
    this.isLoading = true;
    this.repositorioexternoService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
  }


  selectRepositorioExterno(repositorioexterno: RepositorioExterno) {
    this.selectedRepositorioExterno = repositorioexterno;
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(RepositorioExternoAddDialogComponent, {
      width: '600px',
      data: { }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource<RepositorioExterno>(this.dataSource.data);
        this.cdr.detectChanges();
        this.actualizarTabla();
      }
    });
  }

  openEditDialog(repositorioexterno: RepositorioExterno): void {
    const repositorioexternoCopy = { ...repositorioexterno }; 
    const dialogRef = this.dialog.open(RepositorioExternoEditDialogComponent, {
      width: '600px',
      data: repositorioexternoCopy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        const index = this.dataSource.data.findIndex(a => a.idRepositorio === result.idRepositorio);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource<RepositorioExterno>(this.dataSource.data); 
          this.actualizarTabla();
        }
      }
    });
  }
  

  editarSeleccionado() {
    if (this.selectedRepositorioExterno) {
      this.openEditDialog(this.selectedRepositorioExterno);
    }
  }
  
  eliminarSeleccionado() {
    if (this.selectedRepositorioExterno) {
      const dialogRef = this.dialog.open(RepositorioExternoDeleteDialogComponent, {
        data: { repositorioexterno: this.selectedRepositorioExterno }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.repositorioexternoService.delete(this.selectedRepositorioExterno!.idRepositorio!).subscribe(
            () => {
              this.toastr.success('repositorioexterno eliminado', 'Éxito', { timeOut: 3000 });
              this.actualizarTabla();
            },
            err => {
              this.toastr.error('No se pudo eliminar el repositorioexterno', 'Error', { timeOut: 3000 });
            }
          );
        }
      });
    } else {
      this.toastr.error('No se ha seleccionado un repositorioexterno.', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-end',
      });
    }
  }
  
  
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const wbout: Blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(wbout, 'repositorioexterno.xlsx');
  }
  
  
  exportToPdf(): void {
    const element = document.getElementById('Tablarepositorioexterno');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'landscape',
        });
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        doc.save('repositorioexterno.pdf');
      });
    } else {
      console.error('El elemento no se encuentra en el DOM');
    }
  }
  


}

