import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { config } from '../localConfig';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';




@Injectable()
export class BookService {

  constructor(private http: Http) { }
  authToken: any;
  book: any;
  user: any;

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  createBook(book){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');

    return this.http.post(`${config.API_HOST}/book/add`, book, {headers: headers})
        .map((res)=>res.json());
  }

  removeBook(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.delete(`${config.API_HOST}/book/`+id, {headers: headers})
        .map((res)=>res.json());
  }

  editBook(book){
    let headers = new Headers();
    console.log(book);
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(`${config.API_HOST}/book/`+book._id, book, {headers: headers})
        .map((res)=>res.json());
  }

  getAllBooks(){
    return this.http.get(`${config.API_HOST}/book/all`)
        .map((res)=>res.json());
  }

  getBook(id){
    return this.http.get(`${config.API_HOST}/book/`+id)
        .map((res)=>res.json());
  }

  searchBook(){

  }





}
