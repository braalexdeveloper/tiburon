import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      /*const user=JSON.parse(localStorage.getItem('user') || '[]');
      if (user == undefined || user.length<1 || !user.token) {
        //alert("Logueate para seguir!")
        this.router.navigate(['/']);
        return false;
      }
      return true;
    */

      return interval(100) // Revisa cada 100 milisegundos
      .pipe(
        take(50), // Intenta durante 5 segundos (50 * 100ms)
        map(() => {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          if ((user && user.token) || sessionStorage.getItem('id_token')) {
            // Usuario autenticado, permite el acceso a la ruta
            return true;
          } else {
            // Usuario no autenticado, redirige al componente de inicio de sesión
            this.router.navigate(['/']);
            return false;
          
          }
        })
      )
      
    
  }
}
