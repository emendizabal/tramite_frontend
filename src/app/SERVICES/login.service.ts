import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpInterceptor} from '@angular/common/http';
//import {LoginService} from ''
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL='/api'
  constructor(private http:HttpClient, private router:Router){}
  signUp(user: any){
    return this.http.post<any>(this.URL+'/signup',user);
  }
  signIn(user: any){
    return this.http.post<any>(this.URL+'/signin',user);
  }
  loggedIn(){
    /*if(localStorage.getItem('token')){
      return true;
    }*/
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
