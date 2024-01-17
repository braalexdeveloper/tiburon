import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { DetailOrdersComponent } from './detail-orders/detail-orders.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DetailOrdersComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
   
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
