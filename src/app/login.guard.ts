import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
//import { Observable } from 'rxjs';
import { LoginService } from './SERVICES/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginservice:LoginService, private router:Router)
  {

  }
  /*
  checkUserLogin(route:ActivatedRouteSnapshot):boolean{
    const {scopes=[]}=this.loginservice.getCurrentUser();
    console.log(scopes.includes(route.data.role))
    if(scopes.indcludes(route.data.role)){
      return true;
    }else{
      this.router.navigate(commands:['/','not-role']);
      return false;
    }
  }
  */
/*
  canActivate(
    route:ActivedRouteSnashot,
    state:RouterStateSnapshot,
    ):Observable <boolean | Urltree | Promise<boolean | UrlTree> |boolean | Urltree{
      return this.checkUserlogin(route);
    } 
  )
*/


/*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
*/
/*
  canActivate(): boolean{
    //route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginservice.loggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  } 
*/

  canActivate(){
    //route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginservice.loggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  } 
}
