import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
   email:string='';
   password:string='';

 constructor(
  private _usuarioService:UsuarioService,
  private router:Router,
  private storageService:StorageService
  ){

 }
 ngOnInit(): void {
  this.storageService.setUserLogin(false);
 }

 login(){
  this._usuarioService.login({email:this.email,password:this.password}).subscribe({
    next:(data)=>{
        console.log(data)
       
        this.storageService.setUser(data);
       this.storageService.setUserLogin(true);
        
        this.router.navigate(['/dashboard']);
        
    },
    error:(e:HttpErrorResponse)=>{
      console.log(e.error.msg) 
    }
  });
 }
}
