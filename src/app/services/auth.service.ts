import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { config } from '../localConfig';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  username: any;

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(`${config.API_HOST}/auth/register`, user, {headers: headers})
        .map((res)=>res.json());
  }

  loginUser(user){
    console.log(user);
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post(`${config.API_HOST}/auth/login`, user, {headers: headers})
        .map((res)=>res.json());
  }

  userData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired("id_token");
  }

}
