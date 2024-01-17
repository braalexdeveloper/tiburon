import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService{
 
  private carritoSubject = new BehaviorSubject<number>(0);
  carrito$ = this.carritoSubject.asObservable();

  private _userLogin=new BehaviorSubject<boolean>(true);
  userLogin$=this._userLogin.asObservable();

  user:any='';
  carrito:any[]=[];
 

  constructor() {
   this.initializeData();//Esta funcion me trae el user y carrito que esta en el localstorage
   }

   setUserLogin(status:boolean){
    this._userLogin.next(status);
   }

   actualizarCantidadCarrito(cantidad: number) {
    this.carritoSubject.next(cantidad);
  }
  
   initializeData() {
    // User
    this.user = JSON.parse(localStorage.getItem('user') || '[]');

    // Carrito
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

// User

getUser(){//Esta funcion me trae el user del localstorage
 
  return JSON.parse(localStorage.getItem('user') || '[]');  
}

setUser(user:any){
  localStorage.setItem('user',JSON.stringify(user));
 
}

// endUser

   // Carrito

  getCarrito(){
    
    return this.carrito;
  }

  


  setCarrito(newCarrito:any){
    
    localStorage.setItem('carrito',JSON.stringify(newCarrito));
    this.actualizarCantidadCarrito(newCarrito.length);
    this.reloadCarrito();
  }

  // endCarrito

  // Método para forzar la recarga del carrito
  reloadCarrito() {
    this.initializeData();
  }
}
