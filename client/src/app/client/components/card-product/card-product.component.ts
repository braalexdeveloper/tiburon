import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { AlertifyService } from '../../services/alertify.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit{
@Input() PRODUCTS:any[]=[];

constructor(private alertify:AlertifyService,private _storageService:StorageService) {}

  ngOnInit() {
    console.log(this.PRODUCTS);
    // Aquí puedes acceder a this.PRODUCTS después de que se haya inicializado
  }

  addCarrito(product:Product){
    this._storageService.reloadCarrito(); // Recarga el carrito
    let carrito = this._storageService.getCarrito();
    carrito.push({...product,quantity:1,subtotal:product.price});
    this._storageService.setCarrito(carrito);
    this.alertify.success("Producto Añadido");
  }
}
