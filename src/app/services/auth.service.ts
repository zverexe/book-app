import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { config } from '../localConfig';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  //Register user in db
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(`${config.API_HOST}/auth/register`, user, {headers: headers})
        .map((res)=>res.json());
  }

  //Login user
  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post(`${config.API_HOST}/auth/login`, user, {headers: headers})
        .map((res)=>res.json());
  }

  //Add user token and email to localStorage
  userData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  //Logout user
  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //Load user token from localstorage
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  //Check if user logged in
  loggedIn(){
    return tokenNotExpired("id_token");
  }

}
