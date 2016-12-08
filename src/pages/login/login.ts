import { Component} from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { AppGlobal } from '../../app-global'
import { UserProvider} from '../../providers/user-provider';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[UserProvider]
})
export class LoginPage {

  public isLoggedIn:boolean ;
  user :Object= {};

  constructor(private _appGlobal: AppGlobal ,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public _loginService: UserProvider) {
    
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

/** 
     * this will dismiss the modal page
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     *  this logs in the user using the form credentials
     */
    login() {
      console.log(JSON.stringify(this.user));
        try {
            // login usig the email/password auth provider
            this._loginService.login(this.user).then((user)=>{
              console.log(JSON.stringify(user));
              if(user['userId'] != undefined)  {
                this._appGlobal.setLoginStatus(true);
                this._appGlobal.loginedUser = user;
              }  
            }).catch((error)=>{
              console.log(error);
            });

        } catch (EE) {
            console.log(EE)
        }

    }
}
