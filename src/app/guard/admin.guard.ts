import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( public auth: AuthenticationService, public router: Router )
  {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole1 = 'admin'
      // decode the token to get its payload
      this.auth.isLogged();
      if (
        !this.auth.isLoggedIn || 
        (this.auth.currentRole !== expectedRole1)
      ) {
        this.router.navigate(['home']);
        return false;
      }
      return true;
  }
  
}
