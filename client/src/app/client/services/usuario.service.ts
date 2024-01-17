import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private httpHeaders: any;
  constructor(
    private http: HttpClient,
    private router: Router,

    private _storageService: StorageService
  ) {
    
    
  }

  api: string = environment.apiUrl;


  login(user: any): Observable<any> {
    return this.http.post(this.api + 'login', user).pipe(
      tap((response) => {
        
        return response;
      }),
      catchError((error) => {
        
        return of(error);
      })
    );
  }

  logout() {
    // Limpiar el almacenamiento local y cambiar el estado de autenticación
    localStorage.removeItem('user');


    this.router.navigate(['/login']);
  }

  headers(){
    this.httpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this._storageService.getUser().token);
    return this.httpHeaders;
  }
  
  getUser(id: number): Observable<any> {
    
    return this.http.get(this.api + "users/" + id, { headers: this.headers() });
  }

  getDetailOrder(id:number): Observable<any>{
    return this.http.get(this.api + "orders/" + id, { headers: this.headers() });
  }


}
