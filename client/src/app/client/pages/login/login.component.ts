import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AlertifyService } from '../../services/alertify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../../components/register/register.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    public _usuarioService: UsuarioService,
    private router: Router,
    private storageService: StorageService,
    private alertify: AlertifyService,
    public activeModal:NgbActiveModal,
    private modalService:NgbModal,
    
  ) {

  }
  ngOnInit(): void {
    this.storageService.setUserLogin(false);
  }

 
 loginGoogle(){
  this._usuarioService.loginGoogle();

  }

  close() {
    this.activeModal.close();
  }

  login() {
    this._usuarioService.login({ email: this.email, password: this.password }).subscribe({
      next: (data) => {
        console.log(data);
  
        this.storageService.setUser(data);
        this.storageService.setUserLogin(true);
        this.close();
        this.router.navigate(['/dashboard']);
      },
      error: (errorMessage) => {
        
        this.alertify.error(errorMessage);
      },
      complete: () => {
        console.log('Completo.');
      }
    });
  }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterComponent);
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
