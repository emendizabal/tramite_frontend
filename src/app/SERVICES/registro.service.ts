//import { Injectable } from '@angular/core';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Registros } from '../COMPONENTES/registro/registro';
//import { TipoInstitucion } from '../COMPONENTES/tipo-institucion/tipo-institucion';
//import { PERSONAS } from '../COMPONENTES/persona/personas';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../COMPONENTES/registro/registro.directive';
//import { map } from '';

//import {HttpClient} from '@angular/common/http';
// declaracion de interfaces
interface SearchResult{
  countries:Registros[];
  total: number;
}

interface State{
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare=(v1: string | number, v2: string | number )=> v1 < v2 ? -1:v1 > v2 ? 1 : 0;

function sort(countries:Registros[], column:SortColumn, direction:string):Registros[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}
/*
function matches(country: TipoInstitucion, term: string) {
  return country.username.toLowerCase().includes(term.toLowerCase())
    || country.password.toLowerCase().includes(term.toLowerCase())
    || country.estado_usuario.toLowerCase().includes(term.toLowerCase());
}
*/
function matches(country: Registros, term: string, pipe: PipeTransform) {
  return  pipe.transform(country.id_registro).includes(term)
          || country.nombre.toLowerCase().includes(term.toLowerCase())
          || country.apellido_paterno.toLowerCase().includes(term.toLowerCase())
          || country.documento_identidad.toLowerCase().includes(term.toLowerCase())
          || country.descripcion_tramite.toLowerCase().includes(term.toLowerCase());
}


@Injectable({
  providedIn: 'root'
})

export class RegistroService {
  public url='api/registros';
  public urlPersona='api/persona';
  public urli='api/tipo_institucion';

  private _loading$ = new BehaviorSubject<boolean>(true);
  public _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Registros[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public PERSONAS:Registros[]=<any>[];
  //personal:any={
  //};

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  
  //countries$: any;
  //total$: any;
  constructor(private pipe: DecimalPipe, private http:HttpClient) { 
    //empieza el _search$
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });
    this.listarEquipo();
    this._search$.next();  
  }
    
  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  
  //Metodos mutadores
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
 
  private _set(patch: Partial<State>) {
   Object.assign(this._state, patch);
   this._search$.next();
  }
  //con esta funcion cargamos la los datos de PERSONA EN ARREGLO PERSONA
  listarEquipo() {
  this.getRegistros().subscribe(
    res => {
      this.PERSONAS= <any>res;
      //this._search$.next();
      //console.log(this.data);
      //console.log(this.PERSONAS);
    }
    );
  }



  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    //Obtener los datos
    this.listarEquipo();
    //this._search$.next();
    // 1. sort
    let countries = sort(this.PERSONAS, sortColumn, sortDirection);
  
    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm,this.pipe));
    //countries = countries.filter(country=>country);
  
    const total = countries.length;
  
    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries, total});
  }
  //Aqui en adelante estan las funciones que nos ayudaran a conectar
  //al servidor node para recuperar los datos.
  //recupera todos los datos del servidor solicitado


  
  getRegistros()
  {
    let url='api/registros';
    return this.http.get(this.url);
  }
  //recupera todos los datos del servidor solicitado
  getTipoInstitucion()
  {
    return this.http.get(this.urli);
  }
  getInstitucion()
  {
    let url='api/instituciones';
    return this.http.get(url);
  }
  getPersona()
  {
    let url='api/personas';
    return this.http.get(url);
  }

  
  getTramite()
  {
    let url='api/tramites';
    return this.http.get(url);
  }


//recupera un dato del servidor solicitado
  //get un Equipo
  getUnEquipo(id:number){
    return this.http.get<any>(this.url+'/'+id);
  }
//agregar un dato del servidor
//Envia los datos de un equipo para que lo agregue en el servidor node a la base de datos
addEquipo(equipo:any){
  return this.http.post(this.url,equipo)
  .pipe(
    tap(() =>{
      this._search$.next();
    }));
}
//elimina un equipo de la base de datos mediante el servidor node
deleteEquipo(id:number){
  return this.http.delete(this.url+'/'+id)
  .pipe(
    tap(() =>{
      this._search$.next();
    }));
}
//modificar los datos de un equipo mediante el servidor nodejs
editEquipo(id:number,equipo:any){
  //this._search$.next();
  return this.http.put(this.url+'/'+id,equipo)
  .pipe(
    tap(() =>{
      this._search$.next();
    }));
} 

}
