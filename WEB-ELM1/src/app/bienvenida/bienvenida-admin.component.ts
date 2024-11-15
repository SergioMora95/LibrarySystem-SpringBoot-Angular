import { Component, OnInit } from '@angular/core';
import { LibroService } from '../service/libro.service';
import { PrestamoService } from '../service/prestamo.service';

@Component({
  selector: 'app-bienvenida-admin',
  templateUrl: './bienvenida-admin.component.html',
  styleUrls: ['./bienvenida-admin.component.css']
})
export class BienvenidaAdminComponent implements OnInit {
  prestamosPrestados = 0;
  prestamosNoDevueltos = 0;
  prestamosDevueltos = 0;
  prestamosTodos?: number;
  barChartData: any[] = [];

  librosDisponibles = 0;
  librosAgotados = 0;
  totalLibros = 0;
  pieChartData: any[] = [];
  

  constructor(
    private libroService: LibroService,
    private prestamoService: PrestamoService
  ) { }

  ngOnInit(): void {
    this.obtenerEstadisticasPrestamos();
    this.obtenerEstadisticasLibros();
  }

  obtenerEstadisticasPrestamos(): void {
    this.prestamoService.getListPrestados().subscribe(
      prestamosPrestados => {
        this.prestamosPrestados = prestamosPrestados.length;
        this.actualizarChartData();
      },
      error => {
        console.error('Error al obtener los prestamos prestados:', error);
      }
    );
  
    this.prestamoService.getListNoDevueltos().subscribe(
      prestamosNoDevueltos => {
        this.prestamosNoDevueltos = prestamosNoDevueltos.length;
        this.actualizarChartData();
      },
      error => {
        console.error('Error al obtener los prestamos no devueltos:', error);
      }
    );
  
    this.prestamoService.getListDevueltos().subscribe(
      prestamosDevueltos => {
        this.prestamosDevueltos = prestamosDevueltos.length;
        this.obtenerTotalPrestamos();
      },
      error => {
        console.error('Error al obtener los prestamos devueltos:', error);
      }
    );
  }

  obtenerTotalPrestamos() {
    this.prestamoService.getAll().subscribe(
      prestamosTodos => {
        this.prestamosTodos = prestamosTodos.length - this.prestamosDevueltos;
        this.actualizarChartData();
      },
      error => {
        console.error('Error al obtener los préstamos:', error);
      }
    );
  }

  actualizarChartData() {
    this.barChartData = [
      { name: 'Todos', value: this.prestamosTodos },
      { name: 'Prestados', value: this.prestamosPrestados },
      { name: 'Sin retorno', value: this.prestamosNoDevueltos },
      { name: 'Devueltos', value: this.prestamosDevueltos }
      
    ];
  }

  obtenerEstadisticasLibros(): void {
    this.libroService.getDisponibles().subscribe(
      librosDisponibles => {
        this.librosDisponibles = librosDisponibles.length;
        this.actualizarChartPieData();
      },
      error => {
        console.error('Error al obtener los libros disponibles:', error);
      }
    );

    this.libroService.getAgotados().subscribe(
      librosAgotados => {
        this.librosAgotados = librosAgotados.length;
        this.actualizarChartPieData();
      },
      error => {
        console.error('Error al obtener los libros agotados:', error);
      }
    );

    this.libroService.getAll().subscribe(
      libros => {
        this.totalLibros = libros.length;
        this.actualizarChartPieData();
      },
      error => {
        console.error('Error al obtener todos los libros:', error);
      }
    );
  }

  actualizarChartPieData() {
    this.pieChartData = [
      { name: 'Disponibles', value: this.librosDisponibles },
      { name: 'Agotados', value: this.librosAgotados },
      { name: 'Total', value: this.totalLibros }
    ];
  }
}
