//import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, Subscriber, Subscription, switchMap, OperatorFunction } from 'rxjs';
import { Registros } from './registro';
//import { TipoInstitucion } from '../tipo-institucion/tipo-institucion';
import { RegistroService} from '../../SERVICES/registro.service';
import { RegistroDirective, SortEvent } from './registro.directive';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { Form } from '@angular/forms';
//import { AutoCompleteLibModule} from 'angular-ng-autocomplete';
///////////////---------------------/////////////
/*
const statesWithFlags: {name: string, flag: string}[] = [
  {'name': 'Alabama', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},
  {'name': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},
  {'name': 'Arizona', 'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},
  {'name': 'Arkansas', 'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},
  {'name': 'California', 'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},
  {'name': 'Colorado', 'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},
  {'name': 'Connecticut', 'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},
  {'name': 'Delaware', 'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},
  {'name': 'Florida', 'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},
  {
    'name': 'Georgia',
    'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
  },
  {'name': 'Hawaii', 'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},
  {'name': 'Idaho', 'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},
  {'name': 'Illinois', 'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},
  {'name': 'Indiana', 'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},
  {'name': 'Iowa', 'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},
  {'name': 'Kansas', 'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},
  {'name': 'Kentucky', 'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},
  {'name': 'Louisiana', 'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},
  {'name': 'Maine', 'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},
  {'name': 'Maryland', 'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},
  {'name': 'Massachusetts', 'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},
  {'name': 'Michigan', 'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},
  {'name': 'Minnesota', 'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},
  {'name': 'Mississippi', 'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},
  {'name': 'Missouri', 'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},
  {'name': 'Montana', 'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},
  {'name': 'Nebraska', 'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},
  {'name': 'Nevada', 'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},
  {'name': 'New Hampshire', 'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},
  {'name': 'New Jersey', 'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},
  {'name': 'New Mexico', 'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},
  {'name': 'New York', 'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},
  {'name': 'North Carolina', 'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},
  {'name': 'North Dakota', 'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},
  {'name': 'Ohio', 'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},
  {'name': 'Oklahoma', 'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},
  {'name': 'Oregon', 'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},
  {'name': 'Pennsylvania', 'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},
  {'name': 'Rhode Island', 'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},
  {'name': 'South Carolina', 'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},
  {'name': 'South Dakota', 'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},
  {'name': 'Tennessee', 'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},
  {'name': 'Texas', 'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},
  {'name': 'Utah', 'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},
  {'name': 'Vermont', 'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},
  {'name': 'Virginia', 'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},
  {'name': 'Washington', 'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},
  {'name': 'West Virginia', 'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},
  {'name': 'Wisconsin', 'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},
  {'name': 'Wyoming', 'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}
];
*/
//////////////////////////-------//////////////////
/*
const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
*/

//type genericModel = {object: string};

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  
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
   providers: [RegistroService, DecimalPipe]
})

export class RegistroComponent implements OnInit {
  
  closeResult: string;
  countries$: Observable<Registros[]>;
  total$: Observable<number>;
  //Declaramos el modelo de datos//
  public model: any;
  //Declaracion 
  personal:any={};
  institucion:any={};  
  personas:any={};
  personass:any={};
  tramites:any={};  
  tipo:any={};
  //championFindForm:  FormGroup | undefined;
  //public champions: any;
  //public championModel: genericModel | undefined;
  //formatter = (value: genericModel) => value.object;
  /*
  myControl = new FormControl();
  options:string[]=['Delhi','Munbai','Banglore'];
  filteredOptions: Observable<string[]> | undefined;
  */
  equipos:Registros[]=<any>[];
  //tipo_institucion:TipoInstitucion[]=<any>[];
  subscription: Subscription | undefined;


  @ViewChildren(RegistroDirective) headers: QueryList<RegistroDirective> | any;
  //public modalService: NgbModal, public ngservice:NgbModal
  constructor(public service: RegistroService, private router:Router, private activeRoute:ActivatedRoute, public modalService: NgbModal) {
    //this.championFindForm;
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

    this.mostrartipos();
    this.mostrarinstitucion();
    this.mostrarpersona();
    this.mostrartramite(); 
  }

/*
formatter = (result: string) => result.toUpperCase();

searchs: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
text$.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  map(term => term === '' ? []
    : this.personas.filter((v: { nombre: string; }) => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
)
*/
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    console.log('Observable Cerrado');
  }


  formatterr = (x: {nombre: string}) => x.nombre;
  search: OperatorFunction<string, readonly {nombre: string, id_persona: number}[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term => term === '' ? []
      : this.personas.filter((v: { nombre: string; }) => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )
  
  BuscarPersonas1(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  Buscar(content: any){
    //this.countries$=country;
    //this.name=name;
    this.service.getPersona().subscribe(
      res=>{
        this.personass=res;
        //console.log(this.tipo);
      },
      //err=>console.log(err)
    );
    this.modalService.open(content,{ size: 'xl' });
  }

  mostrartipos(){
    this.service.getTipoInstitucion().subscribe(
      res=>{
        this.tipo=res;
        console.log(this.tipo);
      },
      //err=>console.log(err)
    );
  }

  mostrarinstitucion(){
    this.service.getInstitucion().subscribe(
      res=>{
        this.institucion=res;
        console.log(this.tipo);
      },
      //err=>console.log(err)
    );
  }

  mostrarpersona(){
    this.service.getPersona().subscribe(
      res=>{
        this.personas=res;
        //console.log(this.tipo);
      },
      //err=>console.log(err)
    );
  }

  mostrartramite(){
    this.service.getTramite().subscribe(
      res=>{
        this.tramites=res;
        //console.log(this.tipo);
      },
      //err=>console.log(err)
    );
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
    this.service.addEquipo(this.model).subscribe();
    this.service._search$.next();
  }

  modificar(){
    this.service.editEquipo(this.equipos[0].id_registro,this.equipos[0]).subscribe();
    this.service._search$.next();
  }
}