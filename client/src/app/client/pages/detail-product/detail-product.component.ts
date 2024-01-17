import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../interfaces/product.interface';
import { AlertifyService } from '../../services/alertify.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit{
  id:any='';
  product:any={};
  loading:boolean=true;
 constructor(
  private _productServicio:ProductosService,
  private _storageService:StorageService,
  private activatedRoute: ActivatedRoute,
  private alertify:AlertifyService,
  private router: Router
  ){}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.getProduct();
  }
  

 getProduct(){
  this.id=this.activatedRoute.snapshot.paramMap.get('id');
  this._productServicio.getProduct(this.id).subscribe({
    next:(data)=>{
      this.loading=false;
      this.product=data.product;
     console.log(data)
    },
    error:(e:HttpErrorResponse)=>{
      this.loading=false;
      console.log(e.error.msg) 
    }
  })
 }

 addCarrito(product:Product){
    
  let carrito = this._storageService.getCarrito();
  carrito.push({...product,quantity:1,subtotal:product.price});
  this._storageService.setCarrito(carrito);
  this.alertify.success("Producto Añadido");
}
}
