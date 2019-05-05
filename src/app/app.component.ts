import { Component } from '@angular/core';
import { Book } from "./shared/book";
import {AuthService} from "./shared/athentication-service";


@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  constructor (private authService : AuthService){ }

  isLoggedIn(){
      return this.authService.isLoggedIn();
  }

  isFrontendUser(){
    return this.authService.isFrontendUser();
  }

  isBackendUser(){
    return this.authService.isBackendUser();
  }
  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    }
      return "Login";
  }
}


