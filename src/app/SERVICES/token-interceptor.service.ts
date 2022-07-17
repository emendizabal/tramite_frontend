import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Con esta clase se generara el Token cuando el usuario sea logueado correctamente
export class TokenInterceptorService implements HttpInterceptor{
  
  //constructor---- iniciamos el servicio de login
  constructor(private loginservice:LoginService) {}
  //esta funcion de interceptora recibe dos parametros el req, next
  intercept(req:any,next:any){
    //declaramos una constante para clonar el token y añadirle el Bearer  
    const tokeninzeReq=req.clone({
      setHeaders:{
        authorization:`Bearer ${this.loginservice.getToken()}`
      }
    })
    // mediante la funcion intercept devolvemos el token modificado para su autenticacion
    return next.handle(tokeninzeReq);
  }

}
