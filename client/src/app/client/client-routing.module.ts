import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { LoginComponent } from './pages/login/login.component';
import { CarComponent } from './pages/car/car.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AuthGuard } from '../utils/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { DashboardModule } from './dashboard/dashboard.module';


const routes: Routes = [
  {
  path:'',
  component:HomeComponent
},
{
  path:'productos',
  component:ShopComponent
},
{
  path:'producto/:id',
  component:DetailProductComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'carrito',
  component:CarComponent
},
{
  path:'nosotros',
  component:AboutComponent
},
{
  path:'checkout',
  component:CheckoutComponent,
  canActivate:[AuthGuard]
},
{
path:'dashboard',
canActivate:[AuthGuard],
loadChildren:()=>
import('./dashboard/dashboard.module').then((m)=>m.DashboardModule),

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
