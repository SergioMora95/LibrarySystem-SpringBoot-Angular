import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EditorialService } from '../service/editorial.service';
import { Editorial } from '../models/editorial';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditorialAddDialogComponent } from './editorial-add-dialog.component';
import { EditorialEditDialogComponent } from './editorial-edit-dialog.component';
import { EditorialDeleteDialogComponent } from './editorial-delete-dialog.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idEditorial', 'nombreEditorial'];
  dataSource = new MatTableDataSource<Editorial>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombreEditorial = '';
  selectedEditorial: Editorial | null = null;
  isAdmin = false;
  isLoading = true; 

  constructor(
    private editorialService: EditorialService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listEditoriales();
    this.isLoading = true;
    this.editorialService.getAll().subscribe(data => {
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

  listEditoriales(): void {
    this.editorialService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error(error);
    });
  }

  actualizarTabla() {
    this.listEditoriales();
    this.selectedEditorial = null;
    this.cdr.detectChanges();
    this.isLoading = true;
    this.editorialService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
  }


  selectEditorial(editorial: Editorial) {
    this.selectedEditorial = editorial;
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(EditorialAddDialogComponent, {
      width: '250px',
      data: { nombreEditorial: '' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Editorial) { 
        this.listEditoriales();
        this.actualizarTabla();
      }
    });
  }

  openEditDialog(editorial: Editorial): void {
    const editorialCopy = { ...editorial }; 
    const dialogRef = this.dialog.open(EditorialEditDialogComponent, {
      width: '250px',
      data: editorialCopy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(a => a.idEditorial === result.idEditorial);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource<Editorial>(this.dataSource.data); 
          this.cdr.detectChanges();
          this.actualizarTabla();
        }
      }
    });
  }
  

  editarSeleccionado() {
    if (this.selectedEditorial) {
      this.openEditDialog(this.selectedEditorial);
    }
  }
  
  eliminarSeleccionado() {
    if (this.selectedEditorial) {
      const dialogRef = this.dialog.open(EditorialDeleteDialogComponent, {
        data: { editorial: this.selectedEditorial }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.editorialService.delete(this.selectedEditorial!.idEditorial!).subscribe(
            () => {
              this.toastr.success('Editorial eliminada', 'Éxito', { timeOut: 3000 });
              this.actualizarTabla();
            },
            err => {
              this.toastr.error('No se pudo eliminar la Editorial', 'Error', { timeOut: 3000 });
            }
          );
        }
      });
    } else {
      this.toastr.error('No se ha seleccionado una Editorial.', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-end',
      });
    }
  }
  
  
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const wbout: Blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(wbout, 'Editoriales.xlsx');
  }
  
  
  exportToPdf(): void {
    const element = document.getElementById('TablaEditorial');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'landscape',
        });
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        doc.save('Editoriales.pdf');
      });
    } else {
      console.error('El elemento no se encuentra en el DOM');
    }
  }
  


}

