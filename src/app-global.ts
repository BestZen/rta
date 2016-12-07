import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AppGlobal {

    public baseUrl:string = "http://182.92.219.201/rta-web/";

    public apiUser =  {
        login:"user/v1/login",
        register:"user/v1/register",
        config:""
    } ;
    public isUserLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    setLoginStatus(isLoggedIn){
        this.isUserLoggedIn.next(isLoggedIn);
    }
}