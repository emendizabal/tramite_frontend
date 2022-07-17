//import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { debounceTime, map, Observable, OperatorFunction, startWith, Subscriber, Subscription } from 'rxjs';
import { Tramite } from './tramite';
//import { TipoInstitucion } from '../tipo-institucion/tipo-institucion';
import { TramiteService } from '../../SERVICES/tramite.service';
import { TramiteDirective, SortEvent } from './tramite.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

//import { Instituciones } from '../instituciones/instituciones';
//import { Instituciones } from '../instituciones/instituciones';
import { InstitucionesService } from 'src/app/SERVICES/instituciones.service';
//import { InstitucionesDirective, SortEvent } from '../instituciones/instituciones.directive';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.css'],
  styles: [`
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
  providers: [TramiteService, DecimalPipe]
})

export class TramiteComponent implements OnInit {
  closeResult: string;
  countries$: Observable<Tramite[]>;
  total$: Observable<number>;

  personal: any = {
    descripcion_tramite: '',
    id_tramite: 1,
  };
  tipo: any = {
    id_tramite: 1,
    descripcion_tramite: ''
  }
  tramite_nuevo:any = {
    descripcion_tramite: '',
    costo_tramite:0
  }
  //equipos: Tramite[] = <any>[];
  //tipo_institucion:TipoInstitucion[]=<any>[];
  //public model: any;
  //public personas: any;
  personas:any={};
  //id:number;
  //personal:any={};
  institucion:any={};  
  //personas:any={};
  personass:any={};
  tramites:any={};  
  //tipo:any={};
  
  nuevo_tramite_area:any={
    id_area:1,
    id_tramite:1,
    numero_paso:1
  };
  nuevo_tramite_requisito:any={
    id_requisito:1,
    id_tramite:1
  };
  
  tramite_area:any;
  tramite_requisito:any;
  
  area:any;
  requisito:any;
  id_t:number=0;
  equipos:Tramite[]=<any>[];
  

  subscription: Subscription | undefined;
  @ViewChildren(TramiteDirective) headers: QueryList<TramiteDirective> | any;

  constructor(public pipe: DecimalPipe, public service: TramiteService, private router: Router, private activeRoute: ActivatedRoute, public modalService: NgbModal) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.closeResult = '';
    //this.mostrarpersona();
  }

  //constructor() { }

  ngOnInit(): void {
    this.service._search$.next();
    this.subscription = this.service._search$.subscribe(() => {
      this.service.listarEquipo();
    });
    //this.mostrartipos();
    //this.mostrarinstitucion();
    //this.mostrarpersona();
    //this.mostrartramite(); 
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    console.log('Observable Cerrado');
  }

/*
  formatterr = (x: {nombre: string}) => x.nombre;
  search: OperatorFunction<string, readonly {nombre: string, id_persona: number}[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term => term === '' ? []
      : this.personas.filter((v: { nombre: string; }) => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )
*/
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

/*
  Buscar(content: any){
    //this.countries$=country;
    //this.name=name;
    this.service.getPersona().subscribe(
      res=>{
        this.personas=res;
        console.log(this.personas);
      },
      //err=>console.log(err)
    );
    this.modalService.open(content,{ size: 'xl' });
  }
*/


  /*
  openXl(content: any) {
    //url='api/instituciones';
    this.service.getTipoInstitucion().subscribe(
      res => {
        this.tipo = res;
        console.log(this.tipo);
      },
      //err=>console.log(err)
    );
    this.modalService.open(content, { size: 'xl' });
  }
  */
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

  modificar(){
    this.service.editEquipo(this.equipos[0].id_tramite,this.equipos[0]).subscribe();
    this.service._search$.next();
  }

  openTramiteRequisito(content: any, id:number){
    this.service.getUnTramiteRequisito(id).subscribe(
      res=>{
        this.tramite_requisito=res;
      },
      //err=>console.log(err)
    );
    this.nuevo_tramite_requisito.id_tramite=id;
    this.service.getRequisito().subscribe(
      res => {
        this.requisito = res;
        //console.log('Este es el ID del Tramite:'+id);
        //console.log(this.tramite_area);
      },
      //err=>console.log(err)
    );
    this.modalService.open(content,{ size: 'xl' });
  }

  openTramiteArea(content: any, id: number) {
    
    this.service.getUnTramiteArea(id).subscribe(
      res => {
        this.tramite_area = res;
        //console.log('Este es el ID del Tramite:'+id);
        //console.log(this.tramite_area);
      },
      //err=>console.log(err)
    );
    this.nuevo_tramite_area.id_tramite=id;
    this.service.getArea().subscribe(
      res => {
        this.area = res;
        //console.log('Este es el ID del Tramite:'+id);
        //console.log(this.tramite_area);
      },
      //err=>console.log(err)
    );
    this.modalService.open(content, { size: 'xl' });
  }

  eliminar(id: number) {
    this.service.deleteEquipo(id).subscribe();
    this.service._search$.next();
  }

  agregar_tramite_area()
  {
    this.service.addTramiteArea(this.nuevo_tramite_area).subscribe();
    
    this.service._search$.next();
  }

  agregar_tramite_requisitos()
  {
    this.service.addTramiteRequisito(this.nuevo_tramite_requisito).subscribe();

    this.service._search$.next();
  }

  agregar() {
    this.service.addEquipo(this.tramite_nuevo).subscribe();
    this.service._search$.next();
  }
  /*
  modificar() {
    this.service.editEquipo(this.equipos[0].id_tramite, this.equipos[0]).subscribe();
    this.service._search$.next();
  }
  */
}


