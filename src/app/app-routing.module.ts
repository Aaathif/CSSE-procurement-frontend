import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './components/orders-details/orders-details.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { UpdateOrderComponent } from './components/update-order/update-order.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { SignUserComponent } from './components/sign-user/sign-user.component';

const routes: Routes = [
  {path: '', redirectTo: 'orders', pathMatch: 'full'},
  {path: 'orders', component: OrdersListComponent},
  {path: 'orders/:id', component: OrdersDetailsComponent},
  {path: 'add', component: AddOrderComponent},
  {path: 'orders/update/:id', component: UpdateOrderComponent},
  {path: 'login', component: LoginUserComponent},
  {path: 'sign', component: SignUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
