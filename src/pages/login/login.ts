import { Component} from '@angular/core';
import { NavController,ViewController ,ToastController} from 'ionic-angular';
import { AppGlobal } from '../../app-global'
import { UserProvider} from '../../providers/user-provider';
import { UserModel} from '../../models/user-model'
import {RegisterPage} from '../../pages/register/register'
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
  user :UserModel = new UserModel();
  error : Error ;

  constructor(private _appGlobal: AppGlobal ,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public _loginService: UserProvider) {
    
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
    this.user.phone = "13785641151";
    this.user.password = "123456";
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
            this._loginService.login(this.user).then((userModle)=>{
              console.log(JSON.stringify(userModle));
              if(userModle['userId'] != undefined)  {
                this._appGlobal.setLoginStatus(true);
                this._appGlobal.loginedUser = userModle;
              }  
            }).catch((error)=>{
              this.error = error;
              this.showMessage(error.message);
            });

        } catch (error) {
            this.error = error;
            this.showMessage(error.message)
        }

    }

    register(){
      this.navCtrl.push(RegisterPage,{});
    }

    showMessage(message:string){
      let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
      });
      toast.present();
    }
}
