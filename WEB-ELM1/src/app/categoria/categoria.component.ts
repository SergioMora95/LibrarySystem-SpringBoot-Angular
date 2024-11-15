import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../models/categoria';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaAddDialogComponent } from './categoria-add-dialog.component';
import { CategoriaEditDialogComponent } from './categoria-edit-dialog.component';
import { CategoriaDeleteDialogComponent } from './categoria-delete-dialog.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idCategoria', 'nombreCategoria'];
  dataSource = new MatTableDataSource<Categoria>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombreCategoria = '';
  selectedCategoria: Categoria | null = null;
  isAdmin = false;
  isLoading = true; 

  constructor(
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listCategorias();
    this.isLoading = true;
    this.categoriaService.getAll().subscribe(data => {
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

  listCategorias(): void {
    this.categoriaService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error(error);
    });
  }

  actualizarTabla() {
    this.listCategorias();
    this.selectedCategoria = null;
    this.cdr.detectChanges();
    this.isLoading = true;
    this.categoriaService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
  }


  selectCategoria(categoria: Categoria) {
    this.selectedCategoria = categoria;
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(CategoriaAddDialogComponent, {
      width: '250px',
      data: { nombreCategoria: '' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Categoria) { 
        this.listCategorias();
        this.actualizarTabla();
      }
    });
  }

  openEditDialog(categoria: Categoria): void {
    const categoriaCopy = { ...categoria }; 
    const dialogRef = this.dialog.open(CategoriaEditDialogComponent, {
      width: '250px',
      data: categoriaCopy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(a => a.idCategoria === result.idCategoria);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource<Categoria>(this.dataSource.data); 
          this.cdr.detectChanges();
          this.actualizarTabla();
        }
      }
    });
  }
  

  editarSeleccionado() {
    if (this.selectedCategoria) {
      this.openEditDialog(this.selectedCategoria);
    }
  }
  
  eliminarSeleccionado() {
    if (this.selectedCategoria) {
      const dialogRef = this.dialog.open(CategoriaDeleteDialogComponent, {
        data: { categoria: this.selectedCategoria }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.categoriaService.delete(this.selectedCategoria!.idCategoria!).subscribe(
            () => {
              this.toastr.success('categoria eliminada', 'Éxito', { timeOut: 3000 });
              this.actualizarTabla();
            },
            err => {
              this.toastr.error('No se pudo eliminar la categoria', 'Error', { timeOut: 3000 });
            }
          );
        }
      });
    } else {
      this.toastr.error('No se ha seleccionado una categoria.', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-end',
      });
    }
  }
  
  
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const wbout: Blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(wbout, 'categorias.xlsx');
  }
  
  
  exportToPdf(): void {
    const element = document.getElementById('TablaCategoria');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'landscape',
        });
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        doc.save('categorias.pdf');
      });
    } else {
      console.error('El elemento no se encuentra en el DOM');
    }
  }
  


}

