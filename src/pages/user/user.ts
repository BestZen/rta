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
    console.log('Hello UserPage Page');
    if(this._appGlobal.loginedUser != null){
      this.user = this._appGlobal.loginedUser;
      console.log(JSON.stringify(this._appGlobal.loginedUser));
    }
  }


  quit(){
    this._appGlobal.loginedUser = null;
    this._appGlobal.setLoginStatus(false);
  }

}
