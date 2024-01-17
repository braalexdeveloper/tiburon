import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orders:any=[]
  constructor(
    
    private userService:UsuarioService,
    private _storageService:StorageService
    ){}
  ngOnInit(): void {
    let id=this._storageService.getUser().user.id;
      this.userService.getUser(id).subscribe({
        next:(data:any)=>{
          this.orders=data.user.orders
          
          },
          error:(error)=>{
            console.log(error)
          }
      });
   
  }
}
