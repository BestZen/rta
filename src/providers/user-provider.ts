import { Injectable } from '@angular/core';
import { Http ,Headers ,RequestOptions,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {UserModel} from '../models/user-model'
import {AppGlobal} from '../app-global'
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http,private _appGlobal:AppGlobal ) {
    console.log('Hello userProvider');
  }

  login(form): Promise<UserModel> {

    let queryString = `phone=${form.phone}&password=${form.password}`;
    let requestUrl = this._appGlobal.baseUrl + this._appGlobal.apiUser.login+ "?" + queryString;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(requestUrl,JSON.stringify(form),options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  register(form):Promise<UserModel>{
    let queryString = `phone=${form.phone}&password=${form.password}`;
    let requestUrl = this._appGlobal.baseUrl + this._appGlobal.apiUser.register+ "?" + queryString;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(requestUrl,JSON.stringify(form),options)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    if(body.status == '1')
      return body.result;
    else
      return this.handleError(body.message);  
  }
  private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;

  if(error instanceof String){
    errMsg = error.toString();
  }else if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
  }
}
