import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
api:string=environment.apiUrl;
  constructor(private http:HttpClient) { }

  allProducts(page:number,marca:string):Observable<any>{
    const params=new HttpParams().set('page',page.toString()).set('marca',marca);
    return this.http.get(this.api+"products",{params});
  }

  getProduct(id:number):Observable<any>{
    return this.http.get(this.api+"products/"+id);
  }

  productsAleatorio():Observable<any>{
    return this.http.get(this.api+"products/lista/aleatorio");
  }
}
