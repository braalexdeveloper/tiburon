import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { HttpErrorResponse } from '@angular/common/http';
declare const myFunction: any; // Declara la función para evitar errores de tipo
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  productsAleatorio:any[]=[];
  loading:boolean=true;

  constructor(private producService:ProductosService){

  }

  ngOnInit() {
    myFunction(); // Llama a la función desde funciones.js
    this.productsRamdon();
  }

  productsRamdon(){
    this.producService.productsAleatorio().subscribe({
      next:(data)=>{
        this.loading=false;
        this.productsAleatorio=data.products;
        console.log(data)
      },
      error:(e:HttpErrorResponse)=>{
        this.loading=false;
        console.log(e.error.msg) 
      }
    });
  }

}
