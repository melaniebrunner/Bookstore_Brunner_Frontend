import { Component, OnInit, Input } from '@angular/core';
import { Book } from "../shared/book";
import { BookStoreService} from "../shared/book-store.service";

@Component({
  selector: 'a.bs-book-list-item',
  templateUrl: './book-list-item.component.html',
  styles: []
})
export class BookListItemComponent implements OnInit {
  //sagen das von außen ein element vom typ book kommt
  @Input() book: Book;
  private booksInShoppingCart = [];

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
  }



}
