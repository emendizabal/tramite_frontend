import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { NgbdSortableHeader } from './COMPONENTES/persona/sortable.directive';
//import {NgbdTable}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginGuard } from './login.guard';

import { TokenInterceptorService } from './SERVICES/token-interceptor.service';

import { LoginComponent } from './COMPONENTES/login/login.component';
import { PersonaComponent } from './COMPONENTES/persona/persona.component';
import { AreaComponent } from './COMPONENTES/area/area.component';
import { UsuarioComponent } from './COMPONENTES/usuario/usuario.component';
import { TipoInstitucionComponent } from './COMPONENTES/tipo-institucion/tipo-institucion.component';
import { InstitucionComponent } from './COMPONENTES/institucion/institucion.component';
import { TipoInstitucionDirective } from './COMPONENTES/tipo-institucion/tipo-institucion.directive';
import { InstitucionesDirective } from './COMPONENTES/instituciones/instituciones.directive';
import { InstitucionesComponent } from './COMPONENTES/instituciones/instituciones.component';
import { ProcesoComponent } from './COMPONENTES/proceso/proceso.component';
import { TramiteComponent } from './COMPONENTES/tramite/tramite.component';
import { RegistroComponent } from './COMPONENTES/registro/registro.component';
import { ProcesoDirective } from './COMPONENTES/proceso/proceso.directive';
import { RegistroDirective } from './COMPONENTES/registro/registro.directive';
import { TramiteDirective } from './COMPONENTES/tramite/tramite.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { MatFormFieldModule} from '@angular/material/form-field';
//import { MatInputModule} from '@angular/material/input';
//import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MaterialExampleModule } from './material.module';
import { AgregarComponent } from './COMPONENTES/agregar/agregar.component';
import { ModificarComponent } from './COMPONENTES/modificar/modificar.component';
//import { ReactiveFormsModule } from '@angular/forms';
//import { AutoCompleteLibModule} from 'angular-ng-autocomplete';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonaComponent,
    AreaComponent,
    UsuarioComponent,
    TipoInstitucionComponent,
    InstitucionComponent,
    NgbdSortableHeader,
    TipoInstitucionDirective,
    InstitucionesDirective,
    InstitucionesComponent,
    ProcesoComponent,
    TramiteComponent,
    RegistroComponent,
    ProcesoDirective,
    RegistroDirective,
    TramiteDirective,
    AgregarComponent,
    ModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ReactiveFormsModule
  ],
  //declarations: [AppComponent,NgbdSortableHeader],
  exports:[AppComponent],
  bootstrap: [AppComponent],
  providers: [
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
  

})
export class AppModule { }