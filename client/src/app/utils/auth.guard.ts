import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user=JSON.parse(localStorage.getItem('user') || '[]');
    if (user == undefined || user.length<1 || !user.token) {
      alert("Logueate para seguir!")
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
