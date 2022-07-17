import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Persona } from './persona';
import { PersonaService, Equipos} from '../../SERVICES/persona.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { tap } from 'rxjs/operators';
import{Router,ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
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
  providers: [PersonaService, DecimalPipe]
})
export class PersonaComponent implements OnInit, OnDestroy {
  //id:number;
  //name:string;
  //persona$:Persona[]=<any>[];
  closeResult: string;
  /*Aqui es donde se carga los datos de la variable persona*/
  countries$: Observable<Persona[]>;

  total$: Observable<number>;
  //countries$:Persona[]=<any>[];
  
  personal:any={
    //id_usuario:'',
    password:'',
    usarname:'',
    estado_usuario:'',
    fecha:'',
    id_persona_usuario:''
    };

  equipos:Equipos[]=<any>[];
  //nPersona:Equipos[]=<any>[];
  subscription: Subscription | undefined;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | any;

  constructor(public service: PersonaService, private router:Router, private activeRoute:ActivatedRoute, public modalService: NgbModal) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.closeResult='';
    //this.equipos=service.PERSONAS;
    //this.id=0;
    //this.name='';    
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

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openMostrarPersona(content: any) {
    //this.modalService.open(content, { windowClass: 'dark-modal' });
    this.modalService.open(content,{ size: 'ms' });
  }

  openSm(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }
  
  openLg(content: any, id:number){
    this.service.getUnEquipo(id).subscribe(
      res=>{
        this.equipos=res;
      },
    );
    this.modalService.open(content,{ size: 'ms' });
  }
 
   /*
  openLg(content: any, country:any){
    this.countries$=country;
    //this.name=name;
    this.modalService.open(content,{ size: 'lg' });
  }
  */

  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }
   /*
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true });
  }

  openModalDialogCustomClass(content: any) {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  */

/*FUNCIONES*/
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
    this.service.deleteEquipo(id).subscribe(
      res=>{
      }
    );
  }

  modificar1(){
    this.service.editEquipo(this.equipos[0].id_usuario,this.equipos[0]).subscribe(
      res=>{
      },    
    );
  }
  agregar(){
    this.service.addEquipo(this.equipos).subscribe();
    console.log(this.equipos);
  }

  modificar(){
    /*
    this.router.navigate(['/edit/'+id]);
    */
    this.service.editEquipo(this.equipos[0].id_usuario,this.equipos[0]).subscribe();
    //this.router.navigate(['/persona']);
    //this.router.navigate(['/persona']);
    this.service._search$.next();
  } 
}