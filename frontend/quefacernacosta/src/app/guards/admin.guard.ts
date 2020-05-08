import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  /* canActivate(
     next: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return true;
   }*/

  constructor(private users: UsersService, private router: Router) { }

  canActivate(): boolean {
    if (this.users.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('login')
      return false;
    }

  }

}
