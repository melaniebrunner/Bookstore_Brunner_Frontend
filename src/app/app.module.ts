import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookStoreService} from "./shared/book-store.service";
import { HomeComponent } from './home/home.component';
import { AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BookFormComponent } from './book-form/book-form.component';
import { LoginComponent } from './admin/login/login.component';
import {AuthService} from "./shared/athentication-service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderlogOverviewComponent } from './orderlog-overview/orderlog-overview.component';
import { OrderlogListItemComponent } from './orderlog-list-item/orderlog-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    BookFormComponent,
    LoginComponent,
    ShoppingCartComponent,
    OrderOverviewComponent,
    OrderListItemComponent,
    CartListItemComponent,
    OrderFormComponent,
    OrderlogOverviewComponent,
    OrderlogListItemComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [
      BookStoreService, AuthService, {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
