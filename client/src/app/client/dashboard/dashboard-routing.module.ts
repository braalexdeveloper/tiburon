import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DetailOrdersComponent } from './detail-orders/detail-orders.component';
import { OrdersComponent } from './orders/orders.component';

const routes:Routes=[
  { 
    path: '', component: DashboardComponent,
    children:[
      {path:'',component:OrdersComponent},
      {path:'compras/:id',component:DetailOrdersComponent}
    ] 
  },
  
]


@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
