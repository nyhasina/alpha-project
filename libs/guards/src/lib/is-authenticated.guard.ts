import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const jwtHelperService = new JwtHelperService();
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && !jwtHelperService.isTokenExpired(accessToken)) {
            return true;
        }
        this.router.navigate(['/', 'auth']);
        return false;
    }
}
