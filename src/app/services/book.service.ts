import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import { config } from '../localConfig';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  constructor(private http: Http) { }
  authToken: any;
  book: any;
  user: any;

  // Load user token
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Create book
  createBook(book){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    console.log(book);
    return this.http.post(`${config.API_HOST}/book/add`, book, {headers: headers})
        .map(res => res.json());
  }

  // Delete book
  removeBook(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.delete(`${config.API_HOST}/book/`+id, {headers: headers})
        .map(res => res.json());
  }

  // Edit book
  editBook(book){
    let headers = new Headers();
    console.log(book);
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put(`${config.API_HOST}/book/`+book._id, book, {headers: headers})
        .map(res => res.json());
  }

  // Get all books from db
  getAllBooks(user_id, query=""){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(`${config.API_HOST}/book/all`, {params: {id: user_id, search_query: query}, headers})
        .map( res => res.json());
  }

  // Sort books in the table
  sortTable(user_id, query){
      let headers = new Headers();
      this.loadToken();
      console.log(query);
      headers.append('Authorization', this.authToken);
      return this.http.get(`${config.API_HOST}/book/sort`, {params: {id: user_id,  sortQuery: query}, headers})
          .map( res => res.json());
  }

  // Get one book from db
  getBook(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(`${config.API_HOST}/book/`+id, {headers: headers})
        .map( res => res.json());
  }

}
