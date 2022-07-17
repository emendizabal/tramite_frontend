//import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Proceso } from './proceso';
//import { TipoInstitucion } from '../tipo-institucion/tipo-institucion';
import { ProcesoService} from '../../SERVICES/proceso.service';
import { ProcesoDirective, SortEvent } from './proceso.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css'],
  styles:[`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `],
   encapsulation: ViewEncapsulation.None,
   providers: [ProcesoService, DecimalPipe]
})
export class ProcesoComponent implements OnInit {
  
  closeResult: string;
  countries$: Observable<Proceso[]>;
  total$: Observable<number>;

  personal:any={
    nombre:'',
    id_tipo_institucion:1,
    };
  tipo:any={
    id_tipo_institucion:1,
    descripcion:''
  }

  //personal:any={};
  institucion:any={};  
  personas:any={};
  personass:any={};
  proceso:any={};  
 // tipo:any={};

  equipos:Proceso[]=<any>[];
  //tipo_institucion:TipoInstitucion[]=<any>[];

  subscription: Subscription | undefined;
  @ViewChildren(ProcesoDirective) headers: QueryList<ProcesoDirective> | any;

  constructor(public service: ProcesoService, private router:Router, private activeRoute:ActivatedRoute, public modalService: NgbModal) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.closeResult='';   
  } 
  //constructor() { }

  ngOnInit(): void {
    this.service._search$.next();
    this.subscription=this.service._search$.subscribe(()=>{
    this.service.listarEquipo();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    console.log('Observable Cerrado');
  }

  openXl(content: any) {
    //url='api/instituciones';
    this.service.getTipoInstitucion().subscribe(
      res=>{
        this.tipo=res;
        console.log(this.tipo);
      },
      //err=>console.log(err)
    );
    this.modalService.open(content, { size: 'xl' });
  }

  openLg(content: any, id:number){
    this.service.getUnProceso(id).subscribe(
      res=>{
        this.proceso=res;
      },
      //err=>console.log(err)
    );
    this.modalService.open(content,{ size: 'ms' });
  }

  openMostrarPersona(content: any) {
    this.service.getTipoInstitucion().subscribe(
      res=>{
        this.tipo=res;
        console.log(this.tipo);
      },
      //err=>console.log(err)
    );
    //this.modalService.open(content, { windowClass: 'dark-modal' });
    this.modalService.open(content,{ size: 'ms' });
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header: { sortable: string; direction: string; }) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  eliminar(id:number)
  {
    this.service.deleteEquipo(id).subscribe();
    this.service._search$.next();
  }

  agregar(){
    this.service.addEquipo(this.personal).subscribe();
    this.service._search$.next();
  }

  modificar(){
    this.service.editUnProceso(this.proceso[0].id_proceso,this.proceso[0]).subscribe();
    this.service._search$.next();
  }


}
