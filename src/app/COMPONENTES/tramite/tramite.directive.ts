//import { Directive } from '@angular/core';
import { Directive, EventEmitter, Input, Output } from '@angular/core';
//import { type } from 'os';
import {Tramite} from './tramite';

export type SortColumn=keyof Tramite | '';
export type SortDirection= 'asc' | 'desc' | '';
const rotate:{[key:string]:SortDirection}={'asc':'desc','desc':'','':'asc'};

export interface SortEvent{
  column:SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: '[appTramite]',
  host:{
    '[class.asc]':'direction === "asc"',
    '[class.desc]':'direction === "desc"',
    '(click)':'rotate()'
  }
})
export class TramiteDirective {
  @Input() sortable:SortColumn='';
  @Input() direction:SortDirection='';
  @Output() sort=new EventEmitter<SortEvent>();
  rotate(){
    this.direction=rotate[this.direction];
    this.sort.emit({column: this.sortable,direction: this.direction});
  }
  //constructor() { }
}
