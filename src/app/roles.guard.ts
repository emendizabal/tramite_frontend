import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAtuhorized(route);
  }

  private isAtuhorized(route:ActivatedRouteSnapshot):boolean{
      const roles= ['Admin']
      const expectedRoles= route.data['expect'];
      const roleMatches=roles.findIndex(roles=>expectedRoles.indexOf(roles)!==-1);
      return (roleMatches<0) ? false:true; 
  }
  
}
