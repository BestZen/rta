import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserModel} from '../../models/user-model';
import {AppGlobal} from '../../app-global'
/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  constructor(public navCtrl: NavController,private _appGlobal:AppGlobal) {}

  user :UserModel = new UserModel();
  ionViewDidLoad() {
    console.log('Hello UserPage Page' + this._appGlobal.isUserLoggedIn);
    console.log(JSON.stringify(this._appGlobal.loginedUser));
    if(this._appGlobal.isUserLoggedIn){
      this.user = this._appGlobal.loginedUser;
    }
  }

}
