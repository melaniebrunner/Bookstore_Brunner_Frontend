import { Component, OnInit } from '@angular/core';
import { Orderlog} from "../shared/orderlog";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/athentication-service";

@Component({
  selector: 'bs-orderlog-overview',
  templateUrl: './orderlog-overview.component.html',
  styles: []
})
export class OrderlogOverviewComponent implements OnInit {
    orderlogs : Orderlog[];
    user : number;

  constructor(private bs : BookStoreService,private authService : AuthService) { }

  ngOnInit() {
      if(this.authService.isBackendUser()){
          this.bs.getOrderlog().subscribe(
              res =>{
                  this.orderlogs = res;
                  console.log(res);
              });
      }
      else{
          var user_id = JSON.parse(localStorage.getItem('userId'));
          this.bs.getOrderlogsWithId(user_id).subscribe( res => {
              this.orderlogs = res;
              console.log(res);
          });
      }
  }



}
