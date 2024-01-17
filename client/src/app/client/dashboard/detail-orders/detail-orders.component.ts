import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-detail-orders',
  templateUrl: './detail-orders.component.html',
  styleUrls: ['./detail-orders.component.css']
})
export class DetailOrdersComponent implements OnInit{
  id:any='';
  order:any='';
   constructor(
    private router:Router,
    private usuarioService:UsuarioService,
    private activatedRoute: ActivatedRoute,
   ){
    
   }

ngOnInit(): void {
  this.id=this.activatedRoute.snapshot.paramMap.get('id');
  this.usuarioService.getDetailOrder(this.id).subscribe({
    next:(data)=>{
      this.order=data.order;
    },
    error:(error)=>{
console.log(error)
    }
  })
}

}
