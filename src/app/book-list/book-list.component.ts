import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: any;
  fullBook: any;

  constructor(private bookService: BookService, private authService: AuthService) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe(data=>{
      if(data){
        this.books = data;
      }
    });
  }

  onFullBook($event){
    this.fullBook = $event.fullBook;
  }

  deleteBook($event){
    console.log();
    this.bookService.removeBook($event.book._id).subscribe(data=>{
      if(data){
        this.books.forEach(item=>{
          if(item._id==$event.book._id){
            this.books.splice(item,1);
          }
        });
      }
    });
  }

}
