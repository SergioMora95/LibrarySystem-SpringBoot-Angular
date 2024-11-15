import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RecursoVideoService } from '../service/recurso-video.service';
import { RecursoVideo } from '../models/recurso-video';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RecursoVideoAddDialogComponent } from './recurso-video-add-dialog.component';
import { RecursoVideoEditDialogComponent } from './recurso-video-edit-dialog.component';
import { RecursoVideoDeleteDialogComponent } from './recurso-video-delete-dialog.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recurso-video',
  templateUrl: './recurso-video.component.html',
  styleUrls: ['./recurso-video.component.css']
})
export class RecursoVideoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idVideo', 'urlVideo', 'descripcionVideo', 'fechaCarga', 'categoria'];
  dataSource = new MatTableDataSource<RecursoVideo>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedRecursoVideo: RecursoVideo | null = null;
  isAdmin = false;
  isLoading = true; 

  constructor(
    private recursovideoService: RecursoVideoService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Cargar el script de YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    this.listRecursoVideo();
    this.isLoading = true;
    this.recursovideoService.getAll().subscribe(data => {
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

  listRecursoVideo(): void {
    this.recursovideoService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.error(error);
    });
  }

  actualizarTabla() {
    this.listRecursoVideo();
    this.selectedRecursoVideo = null;
    this.cdr.detectChanges();
    this.isLoading = true;
    this.recursovideoService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    });
  }


  selectRecursoVideo(recursovideo: RecursoVideo) {
    this.selectedRecursoVideo = recursovideo;
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(RecursoVideoAddDialogComponent, {
      width: '600px',
      data: { }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource = new MatTableDataSource<RecursoVideo>(this.dataSource.data);
        this.cdr.detectChanges();
        this.actualizarTabla();
      }
    });
  }

  openEditDialog(recursovideo: RecursoVideo): void {
    const recursovideoCopy = { ...recursovideo }; 
    const dialogRef = this.dialog.open(RecursoVideoEditDialogComponent, {
      width: '600px',
      data: recursovideoCopy
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.actualizarTabla();
      if (result) {
        const index = this.dataSource.data.findIndex(a => a.idVideo === result.idVideo);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource<RecursoVideo>(this.dataSource.data); 
          this.actualizarTabla();
        }
      }
    });
  }
  

  editarSeleccionado() {
    if (this.selectedRecursoVideo) {
      this.openEditDialog(this.selectedRecursoVideo);
    }
  }
  
  eliminarSeleccionado() {
    if (this.selectedRecursoVideo) {
      const dialogRef = this.dialog.open(RecursoVideoDeleteDialogComponent, {
        data: { recursovideo: this.selectedRecursoVideo }
      });
  
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.recursovideoService.delete(this.selectedRecursoVideo!.idVideo!).subscribe(
            () => {
              this.toastr.success('recursovideo eliminado', 'Éxito', { timeOut: 3000 });
              this.actualizarTabla();
            },
            err => {
              this.toastr.error('No se pudo eliminar el recursovideo', 'Error', { timeOut: 3000 });
            }
          );
        }
      });
    } else {
      this.toastr.error('No se ha seleccionado un recursovideo.', 'Error', {
        timeOut: 3000, positionClass: 'toast-top-end',
      });
    }
  }
  
  
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    const wbout: Blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(wbout, 'recursovideo.xlsx');
  }
  
  
  exportToPdf(): void {
    const element = document.getElementById('Tablarecursovideo');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'landscape',
        });
        const imgHeight = canvas.height * 208 / canvas.width;
        doc.addImage(imgData, 0, 0, 208, imgHeight);
        doc.save('recursovideo.pdf');
      });
    } else {
      console.error('El elemento no se encuentra en el DOM');
    }
  }
  


}

