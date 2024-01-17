import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  public products:any[]=[];
  public lastPage:number=0;
  public currentPage:number=1;
  public typeOrder:string='';
  public marcaZapatilla:string='';
  loading:boolean=true;


  constructor(
    private _productosService:ProductosService
  ){

  }
  ngOnInit(): void {
    this.allProducts(1);
  }

  searchMarca(){
    console.log(this.marcaZapatilla);
    this.allProducts(1);
  }

  allProducts(numPage:number){
    this._productosService.allProducts(numPage,this.marcaZapatilla).subscribe({
      next:(data)=>{
        this.lastPage=data.products.last_page;
        this.loading=false;
        this.products=data.products.data;
        
        this.onChangeOrder();

        this.currentPage=data.products.current_page;
        console.log(this.products)
      },
      error:(e:HttpErrorResponse)=>{
        console.log(e.error.msg) 
        this.loading=false;
      }
    })
  }

  nextPage(valor:number){
     let numPage=this.currentPage+valor;
     this.currentPage=numPage;
     this.allProducts(numPage);
  }

  prevPage(valor:number){
    let numPage=this.currentPage-valor;
    this.currentPage=numPage;
    this.allProducts(numPage);
 }

  getArrayPages():number[]{
    let pages=[];
    for(let i=1;i<=this.lastPage;i++){
       pages.push(i);
    }
    return pages;
  }

  isPrevDisabled(): boolean {
    return this.currentPage <= 1;
  }
  isNextDisabled(): boolean {
    return this.currentPage >= this.lastPage;
  }

  onChangeOrder(){
    if(this.typeOrder=="asc"){
      this.orderProductsLow();
    }else if (this.typeOrder === 'desc') {
      this.orderProductsHigh(); // Llama a la función para ordenar por precio más alto
    }
  }

  orderProductsLow() {
    let auxProducts = [...this.products];
    auxProducts.sort((a, b) => a.price - b.price);
    this.products = auxProducts;
  }
  
  orderProductsHigh() {
    let auxProducts = [...this.products];
    auxProducts.sort((a, b) => b.price - a.price);
    this.products = auxProducts;
  }

}
