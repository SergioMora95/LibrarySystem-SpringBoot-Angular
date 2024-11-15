import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CargarScriptsService } from '../cargar-scripts.service';
import { PrestamoService } from '../service/prestamo.service';
import { TokenService } from '../service/token.service';
import { Prestamo } from '../models/prestamo';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.css']
})
export class LayoutComponentComponent implements OnInit {

  prestamos: Prestamo[] = [];
  isLogged = false;
  isAdmin = false;
  nombreUsuario = '';

  constructor(private tokenService: TokenService, private prestamoService: PrestamoService) { }
  @ViewChild('sidebar', { static: true }) sidebar: ElementRef | undefined;
  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName() || '';
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }

    this.isAdmin = this.tokenService.isAdmin();
    if (this.sidebar) {
      const ps = new PerfectScrollbar(this.sidebar.nativeElement);
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }


}
