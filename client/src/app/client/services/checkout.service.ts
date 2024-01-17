import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
api:string=environment.apiUrl+'orders';
  constructor(private http:HttpClient) { }
  
  payment(data:any):Observable<any>{
    return this.http.post(this.api,data)
  }
}
