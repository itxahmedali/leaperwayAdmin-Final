import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalDataService } from 'src/app/services/global-data.service';
// import { AuthService } from '../services/firebase/auth.service';
import {AuthGuardService} from "../../services/auth-guard.service"
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService:AuthGuardService) { }
  //   canActivate(): boolean {
  //   if (!this.authService.getToken()) {
  //     this.router.navigateByUrl("/login");
  //   }
  //   return this.authService.getToken();
  // }
  canActivate(next: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    let user = (localStorage.getItem('token'));
    if (!user ) {
      this.router.navigate(['/login']);
      return true
    }
    else if (user) {
      if (!Object.keys(user).length) {
        this.router.navigate(['/login']);
        return true
      }
    }
    return true
  }
  
}
