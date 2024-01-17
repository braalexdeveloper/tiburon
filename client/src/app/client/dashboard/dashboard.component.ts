import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

import { DatePipe } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
user:any='';


constructor(
  private _storageService:StorageService,
  private _usuarioServicio:UsuarioService
  ){

}
ngOnInit(): void {
  this.user=this._storageService.getUser().user;
  
  
}

logout(){
  this._usuarioServicio.logout();
  this._storageService.setUserLogin(false);
 }

}
