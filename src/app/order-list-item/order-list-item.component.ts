import { Component, OnInit, Input } from '@angular/core';
import {Order} from "../shared/order";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/athentication-service";

@Component({
  selector: 'span.bs-order-list-item',
  templateUrl: './order-list-item.component.html',
  styles: []
})
export class OrderListItemComponent implements OnInit {
  @Input() order: Order;
    private addressOrder;
  constructor(private bs : BookStoreService,private authService : AuthService) { }

  ngOnInit() {
      this.bs.getAddressFromUser(JSON.parse(localStorage.getItem('userId'))).subscribe( res => {
          this.addressOrder=res[0].address;
      });
  }




}
