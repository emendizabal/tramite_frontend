import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UsuarioComponent } from '../COMPONENTES/usuario/usuario.component';
import { isThisTypeNode } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url='/api';
  constructor(private http:HttpClient) { }

  //get equipos
  getEquipos()
  {
    return this.http.get(this.url+'/usuario');
  }
  
  //get un Equipo
  getUnEquipo(id:number){
    return this.http.get<any>(this.url+'/usuario/'+id);
  }

  //agregar equipo
  addEquipo(equipo:any){
    //----------------------------//
    //return this.http.post(this.url+'/usuario',equipo);
    //this.http.post(this.url+'/usuario',equipo);
    //return this.getEquipos();
    return this.http.post(this.url+'/usuario',equipo);
    //
  }

  //eliminar
  deleteUsuario(id:number){
    //--------------------//  
    //return this.http.delete(this.url+'/usuario/'+id);
    //this.http.delete(this.url+'/usuario/'+id);
    //return this.getEquipos();
    return this.http.delete(this.url+'/usuario/'+id);
  }
  //modificar equipo
  editEquipo(id:number,equipo:any){
    //return this.http.put(this.url+'/usuario/'+id,equipo);
    //return this.getEquipos();
    //this.http.put(this.url+'/usuario/'+id,equipo);
    //return this.getEquipos();
    return this.http.put(this.url+'/usuario/'+id,equipo);
  }
}

export interface Equipos{
  id_usuario:number;
  username:string;
  password:string;
  estado_usuario:string;
  fecha:string;
  id_persona_usuario:number;
  permiso:string;
}