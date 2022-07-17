import { Component, OnInit } from '@angular/core';
import { UsuarioService,Equipos } from '../../SERVICES/usuario.service';
import { Router }  from '@angular/router';
//import { NgModel } from '@angular/forms';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { interval } from 'rxjs';
//import { take } from 'rxjs/operators';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  ListaEquipos:Equipos[]=<any>[];
   //data:any=[];
  //lista=[];
  constructor(private usuarioservice: UsuarioService, private router:Router ) { }

  ngOnInit(): void {
    this.listarEquipo();
    //enableProdMode.call('A');  
  }

  listarEquipo() {
    this.usuarioservice.getEquipos().subscribe(
      res => {
        this.ListaEquipos = <any>res;
        //console.log(this.data);
        console.log(this.ListaEquipos);
      }
    );
  }


/*
const source$ = interval(1000).pipe(take(4));

async function getTotal() {
  let total = 0;
  
  await source$.forEach(value => {
        total += value;
        console.log('observable -> ', value);
      });
  
      return total;
   }
  
   getTotal().then(
      total => console.log('Total:', total)
  )
*/
/*
eliminar(id:number)
{
  this.EquipoService.deleteEquipo(id).subscribe(
    res=>{
      console.log('equipo eliminado');
      this.listarEquipo();
    },
    err=>console.log(err)
  );
}
*/
/*
eliminar(id:number)
{
  this.service.deleteEquipo(id).subscribe();
  this.service._search$.next();
}


  eliminar(id:number)
  {
    this.usuarioservice.deleteUsuario(id).subscribe(
      res=>{
        console.log('equipo eliminado');
        this.listarEquipo();
      },
      err=>console.log(err)
    );
  }
*/
  eliminar(id:number)
  {
    this.usuarioservice.deleteUsuario(id).subscribe();
    //console.log('usuario eliminado');
    this.listarEquipo();
  }


  ///-----------------------------------------------///
  modificar(id:number){
    this.listarEquipo();
    this.router.navigate(['/edit/'+id]);
  }
  
 
  paginate(reload:number, page:number, tpages:number, adjacents:number){
	let prevlabel = "&lsaquo; Prev";
	let nextlabel = "Next &rsaquo;";
	let out = '<ul class="pagination pagination-large">';
	// previous label
	if(page==1) {
		out+= "<li class='disabled'><span><a>$prevlabel</a></span></li>";
	} else if(page==2) {
		out+= "<li><span><a href='javascript:void(0);' onclick='load(1)'>$prevlabel</a></span></li>";
	}else {
		out+= "<li><span><a href='javascript:void(0);' onclick='load("+(page-1)+")'>$prevlabel</a></span></li>";
	}
	// first label
	if(page>(adjacents+1)) {
		out+= "<li><a href='javascript:void(0);' onclick='load(1)'>1</a></li>";
	}
	// interval
	if(page>(adjacents+2)) {
		out+= "<li><a>...</a></li>";
	}
	// pages
	let pmin = (page>adjacents) ? (page-adjacents) : 1;
	let pmax = (page<(tpages-adjacents)) ? (page+adjacents) : tpages;
	for(let i=pmin; i<=pmax; i++) {
		if(i==page) {
			out+= "<li class='active'><a>$i</a></li>";
		}else if(i==1) {
			out+= "<li><a href='javascript:void(0);' onclick='load(1)'>$i</a></li>";
		}else {
			out+= "<li><a href='javascript:void(0);' onclick='load("+i+")'>$i</a></li>";
		}
	}
	// interval
	if(page<(tpages-adjacents-1)) {
		out+= "<li><a>...</a></li>";
	}
	// last
	if(page<(tpages-adjacents)) {
		out+= "<li><a href='javascript:void(0);' onclick='load($tpages)'>$tpages</a></li>";
	}
	// next
	if(page<tpages) {
		out+= "<li><span><a href='javascript:void(0);' onclick='load("+(page+1)+")'>$nextlabel</a></span></li>";
	}else {
		out+= "<li class='disabled'><span><a>$nextlabel</a></span></li>";
	}
	out+= "</ul>";
	return out;
  }
  
}
