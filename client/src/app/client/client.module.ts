import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SliderComponent } from './components/slider/slider.component';

import { CardProductComponent } from './components/card-product/card-product.component';
import { ShopComponent } from './pages/shop/shop.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { LoginComponent } from './pages/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CarComponent } from './pages/car/car.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AboutComponent } from './pages/about/about.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DashboardModule } from './dashboard/dashboard.module';






@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    CarComponent,
    CardProductComponent,
    ShopComponent,
    DetailProductComponent,
    LoginComponent,
    CheckoutComponent,
    AboutComponent,
    SpinnerComponent,
    
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
    FormsModule,
    DashboardModule
  ],
  providers: [DatePipe],
})
export class ClientModule { }
