import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RecursoDigitalService } from '../service/recurso-digital.service';
import { RecursoDigital } from '../models/recurso-digital';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RecursoDigitalAddDialogComponent } from './recurso-digital-add-dialog.component';
import { RecursoDigitalEditDialogComponent } from './recurso-digital-edit-dialog.component';
import { RecursoDigitalDeleteDialogComponent } from './recurso-digital-delete-dialog.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recurso-digital',
  templateUrl: './recurso-digital.component.html',
  styleUrls: ['./recurso-digital.component.css']
})
export class RecursoDigitalComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idRecursoDigital', 'nombreRecurso', 'imagenRecurso', 'archivoRecurso', 'estadoRecursoDigital', 'categoria', 'autor'];
  dataSource = new MatTableDataSource<RecursoDigital>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedRecursoDigital: RecursoDigital | null = null;
  isAdmin = false;
  isLoading = true; 

  constructor(
    private recursodigitalService: RecursoDigitalService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listRecursoDigital();
    this.isLoading = true;
    this.recursodigitalService.getAll().subscribe(data => {
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

  listRecursoDigital(): void {
    this.recursodigitalService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error(error);
    });
  }

  actualizarTabla() {
    this.listRecursoDigital();
    this.selectedRecursoDigital = null;
    this.cdr.detectChanges();
    this.isLoading = true;
    this.recursodigitalService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
  }


  selectRecursoDigital(recursodigital: RecursoDigital) {
    this.selectedRecursoDigital = recursodigital;
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(RecursoDigitalAddDialogComponent, {
      width: '600px',
      data: { }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource<RecursoDigital>(this.dataSource.data);
        this.cdr.detectChanges();
        this.actualizarTabla();
      }
    });
  }

  openEditDialog(recursodigital: RecursoDigital): void {
    const recursodigitalCopy = { ...recursodigital }; 
    const dialogRef = this.dialog.open(RecursoDigitalEditDialogComponent, {
      width: '600px',
      data: recursodigitalCopy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        const index = this.dataSource.data.findIndex(a => a.idRecursoDigital === result.idRecursoDigital);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource<RecursoDigital>(this.dataSource.data); 
          this.actualizarTabla();
        }
      }
    });
  }
  

  editarSeleccionado() {
    if (this.selectedRecursoDigital) {
      this.openEditDialog(this.selectedRecursoDigital);
    }
  }
  
  eliminarSeleccionado() {
    if (this.selectedRecursoDigital) {
      const dialogRef = this.dialog.open(RecursoDigitalDeleteDialogComponent, {
        data: { recursodigital: this.selectedRecursoDigital }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.recursodigitalService.delete(this.selectedRecursoDigital!.idRecursoDigital!).subscribe(
            () => {
              this.toastr.success('recursodigital eliminado', 'Éxito', { timeOut: 3000 });
              this.actualizarTabla();
            },
            err => {
              this.toastr.error('No se pudo eliminar el recursodigital', 'Error', { timeOut: 3000 });
            }
          );
        }
      });
    } else {
      this.toastr.error('No se ha seleccionado un recursodigital.', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-end',
      });
    }
  }
  
  
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const wbout: Blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(wbout, 'recursodigital.xlsx');
  }
  
  
  exportToPdf(): void {
    const element = document.getElementById('Tablarecursodigital');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'landscape',
        });
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        doc.save('recursodigital.pdf');
      });
    } else {
      console.error('El elemento no se encuentra en el DOM');
    }
  }
  


}

