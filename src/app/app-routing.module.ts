import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './COMPONENTES/login/login.component';
import { PersonaComponent } from './COMPONENTES/persona/persona.component';
import { AreaComponent } from './COMPONENTES/area/area.component';
import { InstitucionComponent } from './COMPONENTES/institucion/institucion.component';
import { InstitucionesComponent } from './COMPONENTES/instituciones/instituciones.component';
import { TramiteComponent } from './COMPONENTES/tramite/tramite.component';
import { ProcesoComponent } from './COMPONENTES/proceso/proceso.component';

import { TipoInstitucionComponent } from './COMPONENTES/tipo-institucion/tipo-institucion.component';
import { UsuarioComponent } from './COMPONENTES/usuario/usuario.component';
import { RegistroComponent } from './COMPONENTES/registro/registro.component';



import { LoginGuard } from './login.guard';
import { LoginService } from './SERVICES/login.service';
import { RolesGuard } from './roles.guard';
import { AgregarComponent } from './COMPONENTES/agregar/agregar.component';
import { ModificarComponent } from './COMPONENTES/modificar/modificar.component';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login', 
  component:LoginComponent}, 
  {path:'usuario', 
  component:UsuarioComponent,
  canActivate:[LoginGuard,RolesGuard],
    data:{
      expect:['Admin']
    }
  },
  {path:'persona', 
  component:PersonaComponent,
  canActivate:[LoginGuard,RolesGuard],
    data:{
      expect:['Admin']
    }
  },
  {path:'area', 
    component:AreaComponent//,
    //canActivate:[LoginGuard]
  },
  {path:'add', 
  component:AgregarComponent//,
  //canActivate:[LoginGuard]
  },
  {path:'edit/:id', 
  component:ModificarComponent//,
  //canActivate:[LoginGuard]
  },
  {path:'institucion', 
    component:InstitucionComponent,
    //canActivate:[LoginGuard]
    canActivate:[LoginGuard,RolesGuard],
    data:{
      expect:['Admin']
    }
  },
  {path:'instituciones', 
    component:InstitucionesComponent,
    //canActivate:[LoginGuard]
    canActivate:[LoginGuard,RolesGuard],
    data:{
      expect:['Admin']
    }
  },
  {path:'tipoinstitucion', 
    component:TipoInstitucionComponent,
    //canActivate:[LoginGuard]
    canActivate:[LoginGuard,RolesGuard],
    data:{
      expect:['Admin']
    }
  },
  {path:'areas', 
    component:TipoInstitucionComponent,
    canActivate:[LoginGuard,RolesGuard],
    data:{
      expect:['Admin','Editor']
    }
  }
  ,
  {path:'registro',
    component:RegistroComponent,
    canActivate:[LoginGuard,RolesGuard],
    data:{
      expect:['Admin']
    }
  }
  ,
  {path:'tramite', 
    component:TramiteComponent,
    canActivate:[LoginGuard,RolesGuard],
    data:{
      expect:['Admin']
    }
  }
  ,
  {path:'proceso', 
    component:ProcesoComponent,
    canActivate:[LoginGuard,RolesGuard],
    data:{
      expect:['Admin']
    }
  }
  /*,
  {path:'edit/:id', 
    //component:ModificarComponent,
    //canActivate:[LoginGuard]
  }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }