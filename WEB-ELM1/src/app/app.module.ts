import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// external
import  {  CommonModule  }  from  '@angular/common' ; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { AutorComponent } from './autor/autor.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CargarScriptsService } from './cargar-scripts.service';
import { SoloLetrasDirective } from './solo-letras.directive';
import { MaterialModule } from './modules/material/material.module';
import { AutorAddDialogComponent } from './autor/autor-add-dialog.component';
import { AutorEditDialogComponent } from './autor/autor-edit-dialog.component';
import { AutorDeleteDialogComponent } from './autor/autor-delete-dialog.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaAddDialogComponent } from './categoria/categoria-add-dialog.component';
import { CategoriaEditDialogComponent } from './categoria/categoria-edit-dialog.component';
import { CategoriaDeleteDialogComponent } from './categoria/categoria-delete-dialog.component';
import { EditorialComponent } from './editorial/editorial.component';
import { EditorialAddDialogComponent } from './editorial/editorial-add-dialog.component';
import { EditorialEditDialogComponent } from './editorial/editorial-edit-dialog.component';
import { EditorialDeleteDialogComponent } from './editorial/editorial-delete-dialog.component';
import { LibroComponent } from './libro/libro.component';
import { LibroAddDialogComponent } from './libro/libro-add-dialog.component';
import { LibroEditDialogComponent } from './libro/libro-edit-dialog.component';
import { LibroDeleteDialogComponent } from './libro/libro-delete-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RecursoVideoComponent } from './recurso-video/recurso-video.component';
import { RecursoVideoAddDialogComponent } from './recurso-video/recurso-video-add-dialog.component';
import { RecursoVideoEditDialogComponent } from './recurso-video/recurso-video-edit-dialog.component';
import { RecursoVideoDeleteDialogComponent } from './recurso-video/recurso-video-delete-dialog.component';
import { RecursoDigitalComponent } from './recurso-digital/recurso-digital.component';
import { RecursoDigitalAddDialogComponent } from './recurso-digital/recurso-digital-add-dialog.component';
import { RecursoDigitalEditDialogComponent } from './recurso-digital/recurso-digital-edit-dialog.component';
import { RecursoDigitalDeleteDialogComponent } from './recurso-digital/recurso-digital-delete-dialog.component';
import { RepositorioExternoComponent } from './repositorio-externo/repositorio-externo.component';
import { RepositorioExternoAddDialogComponent } from './repositorio-externo/repositorio-externo-add-dialog.component';
import { RepositorioExternoEditDialogComponent } from './repositorio-externo/repositorio-externo-edit-dialog.component';
import { RepositorioExternoDeleteDialogComponent } from './repositorio-externo/repositorio-externo-delete-dialog.component';
import { PrestamoAddDialogComponent } from './prestamo/prestamo-add-dialog.component';
import { PrestamoEditDialogComponent } from './prestamo/prestamo-edit-dialog.component';
import { PrestamoDeleteDialogComponent } from './prestamo/prestamo-delete-dialog.component';
import { PrestamoComponent } from './prestamo/prestamo.component';
import { SendEmailComponent } from './changepassword/send-email.component';
import { ChangePasswordComponent } from './changepassword/change-password.component';
import { BienvenidaAdminComponent } from './bienvenida/bienvenida-admin.component';
import { BienvenidaLectorComponent } from './bienvenida/bienvenida-lector.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    LayoutComponentComponent,
    AutorComponent,
    SoloLetrasDirective,
    AutorAddDialogComponent,
    AutorEditDialogComponent,
    AutorDeleteDialogComponent,
    CategoriaComponent,
    CategoriaAddDialogComponent,
    CategoriaEditDialogComponent,
    CategoriaDeleteDialogComponent,
    EditorialComponent,
    EditorialAddDialogComponent,
    EditorialEditDialogComponent,
    EditorialDeleteDialogComponent,
    LibroComponent,
    LibroAddDialogComponent,
    LibroEditDialogComponent,
    LibroDeleteDialogComponent,
    RecursoVideoComponent,
    RecursoVideoAddDialogComponent,
    RecursoVideoEditDialogComponent,
    RecursoVideoDeleteDialogComponent,
    RecursoDigitalComponent,
    RecursoDigitalAddDialogComponent,
    RecursoDigitalEditDialogComponent,
    RecursoDigitalDeleteDialogComponent,
    RepositorioExternoComponent,
    RepositorioExternoAddDialogComponent,
    RepositorioExternoEditDialogComponent,
    RepositorioExternoDeleteDialogComponent,
    PrestamoComponent,
    PrestamoAddDialogComponent,
    PrestamoEditDialogComponent,
    PrestamoDeleteDialogComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    BienvenidaAdminComponent,
    BienvenidaLectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    MatCardModule,
    YouTubePlayerModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxChartsModule,
    
  ],
  providers: [interceptorProvider, CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
