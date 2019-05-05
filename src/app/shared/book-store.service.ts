import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {Author, Book, Image} from "./book";
import { OrderFactory} from "../shared/order-factory";
import {Order} from "../shared/order";
import {ShoppingCartFactory} from "./shopping-cart-factory";
import {ActivatedRoute, Router} from "@angular/router";
import { Orderlog } from "./orderlog";
import {AuthService} from "../shared/athentication-service";


@Injectable()
export class BookStoreService {

    private api = 'http://bookstore19.s1610456004.student.kwmhgb.at/api';
    private shoppingcart = [];
    private booksInShoppingCart = [];
    private currentUser;
    private order;
    private cart;


    constructor(private http: HttpClient, private router: Router,private authService : AuthService) {
        this.cart= ShoppingCartFactory.empty();
        this.order=OrderFactory.empty();
    }

    getAll() : Observable<Array<Book>> {
        return this.http.get(`${this.api}/books`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));

    }

    getAllOrders() : Observable<Array<Order>>{
        return this.http.get(`${this.api}/orders`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrdersWithId(id:number) : Observable<Array<Order>>{
        return this.http.get(`${this.api}/orders/findByUserId/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSingle(isbn: string) : Observable<Book>{
        return this.http.get(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getPrice(orderid: number, bookid:number): Observable<Book>{
        return this.http.get(`${this.api}/book/getPrice/${orderid}/${bookid}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSingleOrder(id: number) : Observable<Order>{
        return this.http.get(`${this.api}/order/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getCurrentUser() : Observable<any> {
        return this.http.get(`${this.api}/auth/user`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));

    }

    getOrderlog(): Observable<any>{
        return this.http.get(`${this.api}/orderlog`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrderlogsWithId(id:number) : Observable<any>{
        return this.http.get(`${this.api}/orderlog/findByUserId/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getAddressFromUser(id: number): Observable<any>{
        return this.http.get(`${this.api}/user/address/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSalesTax(): Observable<any>{
        return this.http.get(`${this.api}/salesTax`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    addToShoppingcart (book: Book) {

        if(this.authService.isLoggedIn()){
            this.order.user_id = JSON.parse(localStorage.getItem('userId'));

            var userid= this.order.user_id;

            console.log(parseInt(userid));
            this.getAddressFromUser(parseInt(this.order.user_id)).subscribe(res=>{
                this.order.delivery_address = res[0].address;
            });
        }

        let isbnOnIndex = this.booksInShoppingCart.findIndex(i => i.isbn === book.isbn);
        if(this.booksInShoppingCart.length == 0 || isbnOnIndex == -1){
            this.booksInShoppingCart.push(book);
        }
        else {
            this.booksInShoppingCart[isbnOnIndex].count += book.count;
        }

        this.order.books = this.booksInShoppingCart;

        this.order.state=0;
        this.cart.orders = this.order;


        localStorage.setItem('shoppingcart_1', JSON.stringify(this.cart));

        this.router.navigateByUrl('shoppingcart');
    }

    removeFromCart(isbn : string){
        var cart = JSON.parse(localStorage.getItem("shoppingcart_1"));
        console.log("cart");
        console.log(cart);
        this.booksInShoppingCart = cart.orders.books;
        console.log("booksincart: ");
        console.log(this.booksInShoppingCart);
        for (var i in this.booksInShoppingCart) {
            if (this.booksInShoppingCart[i].isbn == isbn) {
                this.booksInShoppingCart.splice(Number(i), 1);
            }
        }
        cart.orders.books = this.booksInShoppingCart;
        localStorage.setItem('shoppingcart_1', JSON.stringify(cart));
    }

    changeCount(book: Book, count: number){
        var price=0;
        var cart = JSON.parse(localStorage.getItem("shoppingcart_1"));
        this.booksInShoppingCart = cart.orders.books;
        for (var i in this.booksInShoppingCart) {
            if (this.booksInShoppingCart[i].isbn == book.isbn) {
                this.booksInShoppingCart[i].count = count;
            }
            price+=parseFloat(this.booksInShoppingCart[i].price)*parseFloat(this.booksInShoppingCart[i].count);
        }
        cart.orders.gross_amount=price;
        cart.orders.books = this.booksInShoppingCart;
        localStorage.setItem('shoppingcart_1', JSON.stringify(cart));
    }

    getUser(){
        return this.currentUser;
    }

    create(book : Book) : Observable<any>{
        return this.http.post(`${this.api}/book`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    createOrder(order: Order) : Observable<any>{
        this.booksInShoppingCart = [];
        return this.http.post(`${this.api}/order`, order)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    update(book : Book) : Observable<any>{
        return this.http.put(`${this.api}/book/${book.isbn}`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    updateOrder(orderlog : Orderlog) : Observable<any>{
        return this.http.put(`${this.api}/update/${orderlog.order_id}`, orderlog)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrderByState(state: number): Observable<any>{
        return this.http.get(`${this.api}/orders/${state}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrderByStateFromUser(user_id: number, state: number):Observable<any>{
        return this.http.get(`${this.api}/orders/filterByState/${user_id}/${state}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrderByUsername(username: string): Observable<any>{
        return this.http.get(`${this.api}/orders/findByUsername/${username}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrderByUserId(userId: number): Observable<any>{
        return this.http.get(`${this.api}/orders/findByUserId/${userId}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSortedOrderAsc(): Observable<any>{
        return this.http.get(`${this.api}/order/orderedAsc`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }
    getSortedOrderDesc(): Observable<any>{
        return this.http.get(`${this.api}/order/orderedDesc`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSortedOrderFromUserAsc(userId: number): Observable<any>{
        return this.http.get(`${this.api}/order/orderedAscFromUser/${userId}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSortedOrderFromUserDesc(userId: number): Observable<any>{
        return this.http.get(`${this.api}/order/orderedDescFromUser/${userId}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    remove(isbn : string): Observable<any>{
        return this.http.delete(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    private errorHandler ( error:Error | any) : Observable<any> {
        return throwError(error);
    }
}
