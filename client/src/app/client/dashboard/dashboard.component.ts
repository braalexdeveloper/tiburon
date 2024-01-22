import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

import { DatePipe } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = '';


  constructor(
    private _storageService: StorageService,
    private _usuarioServicio: UsuarioService,
  
  ) {

  }
  ngOnInit(): void {

    setTimeout(()=>{
      if (sessionStorage.getItem('id_token')) {
        let userGoogle = this._usuarioServicio.getProfileGoogle();
        this._usuarioServicio.createUser({
          name: userGoogle['given_name'],
          lastName: userGoogle['family_name'],
          email: userGoogle['email'],
          password: "userGoogle"
        }).subscribe({
          next: (data) => {
          
            this._storageService.setUser(data);
            
            
            console.log(data);
            
          },
          error: (error) => {
            console.log(error);
          }
        });
        this._storageService.setUserLogin(true);
        this._storageService.user$.subscribe((user) => {
          this.user = user.user;
        });
      }
    
    },1500)

    this.user = this._storageService.getUser().user;
  }

 

  logout() {
    if (sessionStorage.getItem('id_token')) {
      this._usuarioServicio.logoutGoogle();
    }else{
      this._usuarioServicio.logout();
    }
    
    this._storageService.setUserLogin(false);
  }

  /*logoutGoogle() {
    this._usuarioServicio.logoutGoogle();
    this._storageService.setUserLogin(false);
  }*/

  profile() {
    let user = this._usuarioServicio.getProfileGoogle();
    console.log(user)
  }

}
