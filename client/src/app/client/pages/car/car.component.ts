import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  products: any = [];
  total: number = 0;

constructor(
  private router:Router,
  private alertify:AlertifyService,
  private storageSerivice:StorageService
  ){}

  ngOnInit():void {
    try {
      this.products = JSON.parse(localStorage.getItem('carrito') || '[]');
      this.products.forEach((element: any) => {
        this.total += element.subtotal;
      });

    } catch (error) {
      console.error('Error al parsear datos de localStorage:', error);
      this.products = []; // Asignar un valor predeterminado en caso de error
    }

  }



  updateCantidad(product: any, valor: number) {
    if (product.quantity == 1 && valor == -1) {
      product.quantity = 1;
    } else {
      product.quantity += valor;
      product.subtotal = parseFloat((product.quantity * product.price).toFixed(2));
      this.total = 0;
      this.products.forEach((element: any) => {

        this.total += element.subtotal;
      });
      localStorage.setItem('carrito', JSON.stringify(this.products));
    }

  }

  removeItem(id: number) {
    this.alertify.confirm({
      title:'Eliminar Producto de Carrito',
      message:'¿Estas seguro?',
      callback_delete:()=>{
      this.products = this.products.filter((el: any) => el.id !== id);
      this.storageSerivice.setCarrito(this.products)
     
      this.total = 0;
      this.products.forEach((element: any) => {
  
        this.total += element.subtotal;
      });
    }
    });
    
  }

  checkout(){
    let data=JSON.parse(localStorage.getItem('user') || '[]');
    if(data.user){
       this.router.navigate(['/checkout']);
    }else{
      this.alertify.error("Debes Iniciar Sesión para Comprar")
      
    }
  }

}



