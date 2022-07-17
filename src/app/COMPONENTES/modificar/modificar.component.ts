import { Component, OnInit } from '@angular/core';
import { UsuarioService, Equipos } from 'src/app/SERVICES/usuario.service';
import { UsuarioComponent } from '../usuario/usuario.component';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  equipos:Equipos[]=<any>[];

  constructor(private usuarioService:UsuarioService, private router:Router, private activeRoute:ActivatedRoute/*, private usuario:UsuarioComponent*/) { }

  ngOnInit(): void {
        /*Esta es la funcion que recoge el el dato del parametro enviado */
        const id_entrada=<number>this.activeRoute.snapshot.params['id'];
        if(id_entrada){
          this.usuarioService.getUnEquipo(id_entrada).subscribe(
            res=>{
              this.equipos=res;
              console.log('Cuando inicia la actualizacion');
              console.log(res);
              console.log('Cuando inicia la actualizacion 2');
              console.log(this.equipos);
            },
            err=>console.log(err)
          );
        }
  }
  /*
  modificar(){
    //let id=Number(this.equipos.id_usuario);
    //const id=<number>this.equipos.id_usuario;
    this.usuarioService.editEquipo(this.equipos[0].id_usuario,this.equipos[0]).subscribe(
      res=>{
        console.log('Estos son los datos que recoge la funcion modificar():'+this.equipos[0].id_usuario);
        console.log(res);
      },
      err=>console.log(err)
    );
    this.router.navigate(['/usuario']);
  } 
*/
  modificar(){
    //let id=Number(this.equipos.id_usuario);
    //const id=<number>this.equipos.id_usuario;
    this.usuarioService.editEquipo(this.equipos[0].id_usuario,this.equipos[0]).subscribe();
    //this.inicio.listarEquipo();
    //this.usuario.listarEquipo();
    this.router.navigate(['/usuario']);
  }
}
