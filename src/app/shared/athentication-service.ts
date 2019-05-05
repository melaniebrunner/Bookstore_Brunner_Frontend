import { Injectable } from "@angular/core";
import { isNullOrUndefined} from "util";
import { HttpClient } from "@angular/common/http";
import * as decode from 'jwt-decode';
import { retry } from "rxjs/internal/operators";

interface User{
    result: {
        created_at: Date,
        email: string,
        id: number,
        name: string,
        updated_at: Date,
        firstName: string,
        lastName: string,
        address: string,
        flag: number
    }
}

@Injectable()
export class AuthService {
    //über dependency injection instanz von client geholt

    private api = 'http://bookstore19.s1610456004.student.kwmhgb.at/api/auth';

    constructor (private http: HttpClient){}

    //wir schicken in payload als json mit
    //postrequest bei dem er das an rest service schickt, da sollten wir dann token zurückbekommen
    login (email: string, password: string){
        return this.http.post(`${this.api}/login`, {
            'email' : email,
            'password' : password
        });
    }

    //setzt vorraus wir sind eingeloggt
    public setCurrentUserId(){
        //aktuell eingeloggten Benutzer holen
        //Benutzer in local storage speichern

        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res => {
            localStorage.setItem('userId', res.result.id.toString());
            localStorage.setItem('flag', res.result.flag.toString());
            console.log("give user in authservice");
            console.log(res.result.id.toString());
        });
    }

    //userid aus localstorage holen
    public getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }

    //Token in localStorage speichern
    public setLocalStorage(token: string) {
        console.log("Storing token");
        console.log(token);
        const decodedToken = decode(token);
        console.log(decodedToken);
        console.log(decodedToken.user.id);
        localStorage.setItem('token', token);
        //localStorage.setItem('userId', decodedToken.user.id);
        this.setCurrentUserId();
    }

    //abmelden in Frontend
    //zerstört aktuellen Webtoken
    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        console.log("logged out");
    }

    //Helfermethode die schaut ob es token gibt
    public isLoggedIn() {
        return !isNullOrUndefined(localStorage.getItem("token"));
    }

    public isBackendUser(){
        if(localStorage.getItem("flag")=='0'){
            return true;
        }
        return false;
    }

    public isFrontendUser(){
        if(localStorage.getItem("flag")=='1'){
            return true;
        }
        return false;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }



}