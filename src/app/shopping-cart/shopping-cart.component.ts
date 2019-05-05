import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/athentication-service";
import { OrderFactory} from "../shared/order-factory";

@Component({
    selector: 'bs-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styles: []
})
export class ShoppingCartComponent implements OnInit {

    order=OrderFactory.empty();
    booksForOrder=[];
    priceOrder=0;
    salesTax=0;
    priceOrderNetto=0;
    addressOrder="";

    constructor(private bs: BookStoreService, private route: ActivatedRoute, private router: Router, private authService : AuthService) { }

    ngOnInit() {
        const isbn = this.route.snapshot.params['isbn'];
        const shoppingcart = JSON.parse(localStorage.getItem('shoppingcart_1'));

        if(shoppingcart){

            if(this.authService.isLoggedIn()){
                this.bs.getAddressFromUser(JSON.parse(localStorage.getItem('userId'))).subscribe( res => {
                    this.addressOrder=res[0].address;
                });
                shoppingcart.orders.delivery_address = this.addressOrder;
            }

            shoppingcart.orders.books.forEach(bookInOrder=> {

                console.log("isbn of current book: ");
                console.log(bookInOrder.isbn);
                this.booksForOrder.push(bookInOrder);
                this.priceOrder+=parseFloat(bookInOrder.price)*parseFloat(bookInOrder.count);
                this.bs.getSalesTax().subscribe( res => {
                    this.salesTax=res*100+100;
                    this.priceOrderNetto=this.priceOrder/this.salesTax*100;
                });
            });
            shoppingcart.orders.gross_amount = this.priceOrder;
            shoppingcart.orders.net_amount= this.priceOrderNetto;
            localStorage.setItem('shoppingcart_1', JSON.stringify(shoppingcart));
        }
        console.log("In Cart at end: ");
        console.log(shoppingcart);
    }

    addOrdertoDatabase(){
        if(this.authService.isLoggedIn()){

            const shoppingcart = JSON.parse(localStorage.getItem('shoppingcart_1'));

            this.bs.getAddressFromUser(JSON.parse(localStorage.getItem('userId'))).subscribe( res => {
                this.addressOrder=res[0].address;
                shoppingcart.orders.delivery_address = this.addressOrder;
            });
            console.log(shoppingcart);



            this.bs.createOrder(shoppingcart.orders).subscribe(res=>{
                localStorage.removeItem('shoppingcart_1');
                this.router.navigate(['../books'], {relativeTo: this.route});
            });
        }
        else {
            alert("You have to sign in first!");
            this.router.navigate(['../login'], {relativeTo: this.route});
        }
    }
}
