import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpdateOrderComponent } from './components/update-order/update-order.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { SignUserComponent } from './components/sign-user/sign-user.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdersListComponent } from './components/orders-list/orders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateOrderComponent,
    LoginUserComponent,
    SignUserComponent,
    AddOrderComponent,
    OrdersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
