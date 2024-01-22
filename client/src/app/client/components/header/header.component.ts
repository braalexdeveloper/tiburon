import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cantCarrito:number=0;
  //isAuth: boolean=false;
  isUserLoggedIn: boolean = true;

 constructor(
            private _usuarioServicio:UsuarioService,
            private _storageService:StorageService,
            private modalService:NgbModal
  ){
 
 }


 ngOnInit(): void {
  this._storageService.userLogin$.subscribe((status)=>{
   this.isUserLoggedIn=status
  })
  // Verificar si el usuario está autenticado al inicio
  //this.checkAuthStatus();
    // Suscribirse al observable del servicio para recibir actualizaciones
    this._storageService.carrito$.subscribe((cantidad) => {
      console.log('Cantidad actualizada en HeaderComponent:', cantidad);
      this.cantCarrito = cantidad;
    });
    
    // Suscribirse al evento de inicio de sesión
   /* this._storageService.loginEvent.subscribe(() => {
      this.checkAuthStatus();
    });*/
    
 }
// Verificar el estado de autenticación
/*checkAuthStatus() {
  console.log('Verificando estado de autenticación');
  const user = this._storageService.getUser();
  console.log('Usuario obtenido:', user);
  this.isAuth = !!user.token;  // Convertir a booleano: true si hay un token, false si no lo hay
  console.log('isAuth actualizado:', this.isAuth);
}*/

openLoginModal() {
  const modalRef = this.modalService.open(LoginComponent);
  // Puedes realizar acciones después de que el modal se ha cerrado, si es necesario.
  modalRef.result.then(
    (result) => {
      console.log(`Modal cerrado con: ${result}`);
    },
    (reason) => {
      console.log(`Modal cerrado con: ${reason}`);
    }
  );
}

 
}
