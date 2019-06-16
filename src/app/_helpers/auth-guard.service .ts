import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router } from '@angular/router';
// import { AuthService } from './authentication/services/auth.service';
import { UserService } from './../services/user.service';

@Injectable()
export class AuthGuardService implements CanLoad {
  constructor(private authService: UserService, private router: Router) {
  }
  canLoad(route: Route): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    // this.authService.setRedirectUrl(url);
    this.router.navigate([this.authService.getLoginUrl()]);
    return false;
  }
}
