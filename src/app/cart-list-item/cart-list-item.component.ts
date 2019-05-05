import { Component, OnInit, Input, Output } from '@angular/core';
import { Book } from "../shared/book";
import { BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/athentication-service";

@Component({
    selector: 'a.bs-cart-list-item',
    templateUrl: './cart-list-item.component.html',
    styles: []
})
export class CartListItemComponent implements OnInit {

    @Input() book: Book;

    constructor(private bs: BookStoreService,private router:Router,private authService : AuthService) { }

    ngOnInit() {

    }

    deleteBook(){
        if (confirm("Buch wirklich aus Warenkorb löschen?")){
            this.bs.removeFromCart(this.book.isbn);
            this.router.navigate(['../shoppingcart']);
        }
    }

    changeCount(book: Book){
        var count =  parseInt((<HTMLInputElement>document.getElementById('count_'+book.id)).value);
        this.bs.changeCount(book, count);
        this.router.navigate(['../shoppingcart']);
    }
}
