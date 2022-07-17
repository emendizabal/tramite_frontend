import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './SERVICES/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(public modal:NgbModal, public loginservice:LoginService){

  }
  /*Diferentes tamaños de Modal*/
  openSM(contenido:any){
    this.modal.open(contenido,{size:'sm'});
  }

  openLG(contenido:any){
    this.modal.open(contenido,{size:'lg'});
  }
  openXL(contenido:any){
    this.modal.open(contenido,{size:'xl'});
  }
  openCentrado(contenido:any){
    this.modal.open(contenido,{centered:true});
  }
  openScroll(contenido:any){
    this.modal.open(contenido,{scrollable:true});
  }
  
}
