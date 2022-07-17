//import { Directive } from '@angular/core';
import { Directive, EventEmitter, Input, Output } from '@angular/core';
//import { type } from 'os';
import {Registros, Personas} from './registro';
//Aqui se ase referencia al modelo de 
export type SortColumn=keyof Registros | '';

//export type SortColumn=keyof Personas |'';
export type SortDirection= 'asc' | 'desc' | '';
const rotate:{[key:string]:SortDirection}={'asc':'desc','desc':'','':'asc'};

export interface SortEvent{
  column:SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: '[appRegistro]',
  host:{
    '[class.asc]':'direction === "asc"',
    '[class.desc]':'direction === "desc"',
    '(click)':'rotate()'
  }
})

export class RegistroDirective {
  //---------------Sortable, direction, sort--------------//
  @Input() sortable:SortColumn='';
  @Input() direction:SortDirection='';
  @Output() sort=new EventEmitter<SortEvent>();

  //funcion rotate
  rotate(){
    this.direction=rotate[this.direction];
    this.sort.emit({column: this.sortable,direction: this.direction});
  }  
  //constructor() { }

}
