import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Injectable({
    providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {
    
    constructor(private authService: AuthGuardService,
        private router: Router) { }

        canActivate(next: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
          // Guard for user is login or not
          let user = (localStorage.getItem('token'));
          if (user) {
            if (Object.keys(user).length > -1) {
              this.router.navigate(['/dashboard/default']);
              return true
            }
          }
          return true
        }
}