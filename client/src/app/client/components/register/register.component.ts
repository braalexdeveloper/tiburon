import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../services/usuario.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  lastName: string = '';
  //direccion: string = '';
  email: string = '';
  password: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UsuarioService,
    private alertify:AlertifyService
  ) {

  }

  close() {
    this.activeModal.close();
  }

  crearCuenta() {
    let user = {
      name: this.name,
      lastName: this.lastName,
      //direccion: this.direccion,
      email: this.email,
      password: this.password
    }
    this.userService.createUser(user).subscribe({
      next:(data)=>{
        this.alertify.success(data.message)
        this.close();
   console.log(data)
      },
      error:(err)=>{
        this.alertify.error(err.message)
          console.log(err)
      }
    })
  }
}
