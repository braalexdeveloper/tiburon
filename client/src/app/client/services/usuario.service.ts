import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private httpHeaders: any;

  constructor(
    private http: HttpClient,
    private router: Router,

    private _storageService: StorageService,
    private oauthService:OAuthService
    
  ) {
    
    this.initLogin();
  }

  

  api: string = environment.apiUrl;


  initLogin(){
    const config:AuthConfig={
      issuer:'https://accounts.google.com',
      strictDiscoveryDocumentValidation:false,
      clientId:'1033431222902-pbghh9fah0bmo8ik603nojea86mtkno1.apps.googleusercontent.com',
      redirectUri:window.location.origin+'/dashboard',
      scope:'openid profile email',
    }

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginGoogle(){
    this.oauthService.initLoginFlow();
  }

  logoutGoogle(){
    this.oauthService.logOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getProfileGoogle(){
    return this.oauthService.getIdentityClaims();
  }


  login(user: any): Observable<any> {
    return this.http.post(this.api + 'login', user).pipe(
      tap((response) => {
        
        return response;
      }),
      catchError((error:HttpErrorResponse) => {
        
        if (error.status === 401) {
          console.log(error)
          // Credenciales incorrectas
          return throwError(error.error.error);
        } else {
          console.log(error)
          // Otro tipo de error
          return throwError('Error en el servidor');
        }
        
      })
    );
  }

  logout() {
    // Limpiar el almacenamiento local y cambiar el estado de autenticación
    localStorage.removeItem('user');


    this.router.navigate(['/']);
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

  createUser(user:any):Observable<any>{
    return this.http.post(this.api+"register",user);
  }


}
