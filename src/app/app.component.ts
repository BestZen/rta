import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {AppGlobal} from '../app-global';

@Component({
  templateUrl: 'app.html',
  providers: [AppGlobal]
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, private _appGlobal:AppGlobal) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this._appGlobal.isUserLoggedIn.subscribe(value => {
        if(value == false){
          this.rootPage = LoginPage;
        }else{
          this.rootPage = TabsPage;
        }
      });

      this._appGlobal.setLoginStatus(false);
  }
}
