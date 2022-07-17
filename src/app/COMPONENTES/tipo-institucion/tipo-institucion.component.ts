import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { TipoInstitucion } from './tipo-institucion';
import { TipoInstitucionService} from '../../SERVICES/tipo-institucion.service';
import { TipoInstitucionDirective, SortEvent } from './tipo-institucion.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-institucion',
  templateUrl: './tipo-institucion.component.html',
  styleUrls: ['./tipo-institucion.component.css'],
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
   providers: [TipoInstitucionService, DecimalPipe]
})

export class TipoInstitucionComponent implements OnInit {

  closeResult: string;
  countries$: Observable<TipoInstitucion[]>;
  total$: Observable<number>;

  personal:any={
    descripcion:'Datos Persona'
    };
  equipos:TipoInstitucion[]=<any>[];
  subscription: Subscription | undefined;
  @ViewChildren(TipoInstitucionDirective) headers: QueryList<TipoInstitucionDirective> | any;

  constructor(public service: TipoInstitucionService, private router:Router, private activeRoute:ActivatedRoute, public modalService: NgbModal) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.closeResult='';   
  }  


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
    this.modalService.open(content, { size: 'xl' });
  }

  openLg(content: any, id:number){
    this.service.getUnEquipo(id).subscribe(
      res=>{
        this.equipos=res;
      },
      //err=>console.log(err)
    );
    this.modalService.open(content,{ size: 'ms' });
  }

  openMostrarPersona(content: any) {
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
    this.service.editEquipo(this.equipos[0].id_tipo_institucion,this.equipos[0]).subscribe();
    this.service._search$.next();
  }
}