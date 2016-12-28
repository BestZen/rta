import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserProvider} from '../../providers/user-provider'
import {AppGlobal} from '../../app-global'
import {UserModel} from '../../models/user-model'
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers:[UserProvider]
})
export class RegisterPage {

  user :UserModel = new UserModel();
  error : Error ;
  constructor(public navCtrl: NavController, 
    private _appGlobal:AppGlobal,
    private _userService:UserProvider) {}


  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
    this.user['realName'] = "寇永赞";
    this.user['phone'] = '18600875425';
    this.user['password'] = '123456';
    this.user['email'] = 'karyjan@163.com';
  }

  register(){
    console.log(JSON.stringify(this.user));
        try {
            // login usig the email/password auth provider
            this._userService.register(this.user).then((userModle)=>{
              console.log(JSON.stringify(userModle));
              if(userModle['userId'] != undefined)  {
                console.log(JSON.stringify(userModle));
                this.navCtrl.pop();
              }  
            }).catch((error)=>{
              this.error = error;
              console.log(error.message);
            });

        } catch (error) {
            this.error = error;
            console.log(error.message)
        }
  }
}
