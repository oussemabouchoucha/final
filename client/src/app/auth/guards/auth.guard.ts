import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const accessToken = this.cookieService.get('access_token');

    if (accessToken) {
      window.open('/dashboard', '_blank');
      return false;
      // Access token exists, redirect to home page
      // return this.router.parseUrl('/');
    } else {
      // Access token does not exist, allow navigation to login page
      return true;
    }
  }
}