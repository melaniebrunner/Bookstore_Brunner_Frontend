import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import { AuthService } from "../../shared/athentication-service";

interface Response{
    response : string;
    result: {
        token: string;
    }
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

    loginForm : FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });
  }

  login(){
      //werte von loginform als array
      const val = this.loginForm.value;
      if(val.username && val.password){
          this.authService.login(val.username, val.password).subscribe(res => {
              const resObj = res as Response;

              //steht bei postman als antwort wenn man login methode macht

              if(resObj.response === 'success'){
                  this.authService.setLocalStorage(resObj.result.token);
                  this.router.navigateByUrl('/');
              }
          });
      }
  }

  isLoggedIn(){
      return this.authService.isLoggedIn();
  }

  isBackEndUser(){
      return this.authService.isBackendUser();
  }

  logout(){
      this.authService.logout();
  }

}
