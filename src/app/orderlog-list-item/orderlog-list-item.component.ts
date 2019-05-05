import { Component, OnInit, Input } from '@angular/core';
import { Orderlog} from "../shared/orderlog";
import {AuthService} from "../shared/athentication-service";

@Component({
  selector: 'div.bs-orderlog-list-item',
  templateUrl: './orderlog-list-item.component.html',
  styles: []
})
export class OrderlogListItemComponent implements OnInit {
    @Input() log: Orderlog;
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

}
