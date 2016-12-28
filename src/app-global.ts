import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserModel } from './models/user-model'

@Injectable()
export class AppGlobal {

    loginedUser: UserModel = null;

    // http url
    public baseUrl: string = "http://182.92.219.201/rta-web/";
    // websocket url
    public wsUrl: string = "ws://182.92.219.201/rta-web/websocket"

    public socketCommand = {
        createRoom: "CREATE_ROOM",
        info: "INFO",
        unknow: "UNKNOWN",
        joinRoom: "JOIN_ROOM",
        closeRoom: "CLOSE_ROOM",
        start: "OPEN_ACTIVITY",
        end: "CLOSE_ACTIVITY",
        answer:"ANSWER"
    };

    public apiUser = {
        login: "user/v1/login",
        register: "user/v1/register",
        config: ""
    };
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    setLoginStatus(isLoggedIn) {
        this.isUserLoggedIn.next(isLoggedIn);
    }
}