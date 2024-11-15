import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { ProdGuardService } from './guards/prod-guard.service';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { AutorComponent } from './autor/autor.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EditorialComponent } from './editorial/editorial.component';
import { LibroComponent } from './libro/libro.component';
import { RecursoDigital } from './models/recurso-digital';
import { RecursoDigitalComponent } from './recurso-digital/recurso-digital.component';
import { RecursoVideoComponent } from './recurso-video/recurso-video.component';
import { RepositorioExternoComponent } from './repositorio-externo/repositorio-externo.component';
import { PrestamoComponent } from './prestamo/prestamo.component';
import { LoginGuard } from './guards/login.guard';
import { ChangePasswordComponent } from './changepassword/change-password.component';
import { SendEmailComponent } from './changepassword/send-email.component';
import { BienvenidaAdminComponent } from './bienvenida/bienvenida-admin.component';
import { BienvenidaLectorComponent } from './bienvenida/bienvenida-lector.component';




const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]  },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'sendemail', component: SendEmailComponent, canActivate: [LoginGuard] },
  { path: 'change-password/:tokenPassword', component: ChangePasswordComponent, canActivate: [LoginGuard] },
  {
    path: '',
    component: LayoutComponentComponent, 
    children: [
      { path: 'admin', component: BienvenidaAdminComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
      { path: 'lector', component: BienvenidaLectorComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
      { path: 'autores/lista', component: AutorComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
      { path: 'categorias/lista', component: CategoriaComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
      { path: 'editoriales/lista', component: EditorialComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin'] } },
      { path: 'libros/lista', component: LibroComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
      { path: 'recursodigital/lista', component: RecursoDigitalComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
      { path: 'recursovideo/lista', component: RecursoVideoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
      { path: 'repositorioexterno/lista', component: RepositorioExternoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
      { path: 'prestamos/lista', component: PrestamoComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },

    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
