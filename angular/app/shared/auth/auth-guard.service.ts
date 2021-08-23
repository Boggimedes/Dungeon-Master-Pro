import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuth = this.tokenService.isLoggedIn();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    else {
      return true;
    }
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuth = this.tokenService.isLoggedIn();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    else {
      return true;
    }
  }
}
