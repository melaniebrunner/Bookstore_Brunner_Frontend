import { Component, OnInit } from '@angular/core';
import {Order} from "../shared/order";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/athentication-service";

@Component({
  selector: 'bs-order-overview',
  templateUrl: './order-overview.component.html',
  styles: []
})
export class OrderOverviewComponent implements OnInit {

    orders : Order[];
    user : number;

    //dependency injection
    constructor (private bs : BookStoreService,private authService : AuthService){}

    ngOnInit() {

        this.bs.getCurrentUser().subscribe(res => {
            this.user = res.result.id;
            console.log("user: ");
            console.log(this.user);

            if(this.authService.isBackendUser()){
                this.bs.getAllOrders().subscribe(
                    res =>{
                        res.forEach(orderInDatabase=> {
                            orderInDatabase.books.forEach(bookInOrder=> {
                                    this.bs.getPrice(orderInDatabase.id,bookInOrder.id).subscribe(result=>{
                                        console.log(result);
                                        bookInOrder.price=result[0].price;
                                    });
                            });
                        });
                        this.orders = res;
                        console.log("Alle Orders: ");
                        console.log(res);
                    });
            }
            else {
                this.bs.getOrdersWithId(this.user).subscribe(
                    res =>{
                        res.forEach(orderInDatabase=> {
                            orderInDatabase.books.forEach(bookInOrder=> {
                                this.bs.getPrice(orderInDatabase.id,bookInOrder.id).subscribe(result=>{
                                    bookInOrder.price=result[0].price;
                                });
                            });
                        });
                        this.orders = res;
                        console.log("Alle Orders: ");
                        console.log(res);
                    });
            }
        });
    }

    filterForState(state: number){
        this.bs.getCurrentUser().subscribe(res => {
            this.user = res.result.id;
            console.log("user: ");
            console.log(this.user);

            if(this.authService.isBackendUser()){
                this.bs.getOrderByState(state).subscribe( res => {
                    this.orders = res;
                    console.log("filtered: ");
                    console.log(this.orders);
                });
            }
            else {
                this.bs.getOrderByStateFromUser(this.user,state).subscribe( res => {
                    this.orders = res;
                    console.log("filtered For User: ");
                    console.log(this.orders);
                });
            }
        });
    }

    getUsername(){
        var name= (<HTMLInputElement>document.getElementById('username')).value;
        if(name=="username"){
            alert("insert username!");
        }
        else{
            return name;
        }
    }

    filterForUsername(){
        var username = this.getUsername();
        if(username){
            this.bs.getOrderByUsername(username).subscribe( res => {
                this.orders = res;
            });
        }
    }

    getUserId (){
        var id = parseInt((<HTMLInputElement>document.getElementById('userId')).value);

        if(!id){
            alert("insert userid!");
        }
        else if(id==1){
            alert("you cant search for your own id!");
        }
        else{
            return id;
        }
    }

    filterForUserId(){
        var userId = this.getUserId();
        if(userId){
            this.bs.getOrderByUserId(userId).subscribe( res => {
                this.orders = res;
            });
        }
    }

    sortAsc(){
        this.bs.getCurrentUser().subscribe(res => {
            this.user = res.result.id;
            console.log("user: ");
            console.log(this.user);

            if(this.authService.isBackendUser()){
                this.bs.getSortedOrderAsc().subscribe( res => {
                    this.orders = res;
                    console.log("filtered: ");
                    console.log(this.orders);
                });
            }
            else {
                this.bs.getSortedOrderFromUserAsc(this.user).subscribe( res => {
                    this.orders = res;
                    console.log("filtered For User: ");
                    console.log(this.orders);
                });
            }
        });
    }

    sortDesc(){
        this.bs.getCurrentUser().subscribe(res => {
            this.user = res.result.id;
            console.log("user: ");
            console.log(this.user);

            if(this.authService.isBackendUser()){
                this.bs.getSortedOrderDesc().subscribe( res => {
                    this.orders = res;
                    console.log("filtered: ");
                    console.log(this.orders);
                });
            }
            else {
                this.bs.getSortedOrderFromUserDesc(this.user).subscribe( res => {
                    this.orders = res;
                    console.log("filtered For User: ");
                    console.log(this.orders);
                });
            }
        });
    }
}
