import { UserDataService } from './../../services/user-data.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userDatService: UserDataService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const loggedUser = this.userDatService.getLoggedUser();
    
    if (loggedUser) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
