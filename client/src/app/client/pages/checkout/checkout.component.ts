import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CheckoutService } from '../../services/checkout.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../services/storage.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  stripe: Stripe | null = null;
  card: any;

  products: any;
  total: number = 0;

  idUser: any = '';
  name: string = '';
  lastName: string = '';
  country: string = '';
  city: string = '';
  address: string = '';
  phone: string = '';

  constructor(private checkoutService: CheckoutService,
    private _storageService:StorageService,
    private _alertify:AlertifyService,
    private router:Router) { }

  async ngOnInit() {
    //productos del carrito localstorage
    this._storageService.reloadCarrito(); // Recarga el carrito
    this.products = this._storageService.getCarrito();
    this.products.forEach((el: any) => {
      this.total += el.subtotal
    })

    //datos del usuario de localstorage
    const userData = this._storageService.getUser();
   
    this.idUser = userData.user.id;
    this.name = userData.user.name;
    this.lastName = userData.user.lastName;

    //stripe

    this.stripe = await loadStripe(environment.key_public_stripe);

    const elements = this.stripe?.elements();
    this.card = elements?.create('card');

    if (!this.stripe || !elements || !this.card) {
      console.error('Error al cargar o crear elementos de Stripe.');
    } else {
      this.card.mount('#card');


      this.card.on('change', (event: any) => {
        const displayError = document.getElementById('card-errors');
        if (displayError) {
          displayError.textContent = event.error ? event.error.message : '';
        }
      });


    }
    // fin stripe

  }


  async payment() {


    // Crea un Payment Method en Stripe
    const resp = await this.stripe?.createPaymentMethod({
      type: 'card',
      card: this.card,
    });
    console.log(resp)


    // Envia el Payment Method ID a tu servidor Laravel
    const paymentMethodId = resp?.paymentMethod?.id;
    const amount = this.total* 100; // Monto en centavos


    let data = {
      payment_method_id: paymentMethodId,
      amount: amount,
      user_id:this.idUser,
      name:this.name,
      country:this.country,
      city:this.city,
      address:this.address,
      phone:this.phone,
      products:this.products,
      total:this.total,
      date:new Date().toISOString().split('T')[0]
    }

    this.checkoutService.payment(data).subscribe({
      next: (data) => {
       this._alertify.success(data.message);
       this._storageService.setCarrito([]);
       this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this._alertify.error(error);
      }
    })

  }

}
