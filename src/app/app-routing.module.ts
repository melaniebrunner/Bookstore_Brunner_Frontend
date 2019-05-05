import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./admin/login/login.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {OrderOverviewComponent} from "./order-overview/order-overview.component";
import {OrderlogOverviewComponent} from "./orderlog-overview/orderlog-overview.component";
import {OrderFormComponent} from "./order-form/order-form.component";

const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'books', component: BookListComponent },
    { path: 'books/:isbn', component: BookDetailsComponent },
    { path: 'admin', component: BookFormComponent },
    { path: 'admin/:isbn', component: BookFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'shoppingcart', component: ShoppingCartComponent },
    { path: 'shoppingcart/:isbn', component: ShoppingCartComponent },
    { path: 'orders', component: OrderOverviewComponent },
    { path: 'orderlog', component: OrderlogOverviewComponent},
    { path: 'admin/order/:id', component: OrderFormComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }