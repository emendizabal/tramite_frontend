import { Component, OnInit } from '@angular/core';
import { UsuarioService, Equipos } from 'src/app/SERVICES/usuario.service';
import { Router } from '@angular/router';
//import { UsuarioComponent } from '../usuario/usuario.component';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  equipos:any={
    //id_usuario:null,
    username:'',
    password:'',
    estado_usuario:'',
    fecha:'',
    id_persona_usuario:null,
    permiso:''
  };

  constructor(private usuarioService:UsuarioService,private router:Router) { }
  //private EquipoService:EquipoService, private router:Router
  ngOnInit(): void {
  }
  agregar(){
    //delete this.equipos.id_usuario;
    this.usuarioService.addEquipo(this.equipos).subscribe();
    //this.usuarioServi
    //this.user.listarEquipo();
    //---------------------
    this.router.navigate(['/usuario']);
  }
}