import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from "../shared/book";
import {ActivatedRoute, Router} from "@angular/router";
import { BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/athentication-service";
import {count} from "rxjs/internal/operators";

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  @Input() book: Book;

  constructor(private bs: BookStoreService,
              private router:Router,
              private route : ActivatedRoute,
              private authService : AuthService
  ) {}

  ngOnInit() {
    //Route zerlegen
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['isbn']).subscribe(
        //lambda schreibweise
        dataFromObservable => this.book = dataFromObservable
    );
  }

  removeBook(){
    if (confirm("Buch wirklich löschen?")){
      this.bs.remove(this.book.isbn)
          .subscribe(res=>this.router.navigate(['../'],
          {relativeTo: this.route}
          ));
    }
  }

  addBook(book: Book, count: number){
    book.count = this.getCount();
    this.bs.addToShoppingcart(book);
  }

  getRating (num: number){
      return new Array(num);
  }

  getCount(){
      return parseInt((<HTMLInputElement>document.getElementById('count')).value);
  }
}
