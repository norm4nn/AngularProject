import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole1 = 'admin'
    const expectedRole2 = 'manager'
    // decode the token to get its payload
    this.auth.isLogged();
    if (
      !this.auth.isLoggedIn || 
      (this.auth.currentRole !== expectedRole1 && this.auth.currentRole !== expectedRole2)
    ) {
      window.alert('Brak uprawnień!');
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
