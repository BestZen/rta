import { Component} from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { AppGlobal } from '../../app-global'
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public isLoggedIn:boolean ;
  user :Object= {};

  constructor(private _appGlobal: AppGlobal ,
    public navCtrl: NavController,
    public viewCtrl: ViewController) {
    
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
    login(credentials) {
      console.log(JSON.stringify(this.user));
        try {
            // login usig the email/password auth provider
            
        } catch (EE) {
            console.log(EE)
        }

    }
}
