import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable()
export class IsNotAuthenticated implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const accessToken = localStorage.getItem('accessToken');
        const jwtHelperService = new JwtHelperService();
        if (accessToken && !jwtHelperService.isTokenExpired(accessToken)) {
            this.router.navigate(['/', 'admin']);
            return false;
        }
        return true;
    }
}
