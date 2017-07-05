import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent {

  @Input() bookItem;

  @Output() deleteBook = new EventEmitter();
  @Output() fullBook = new EventEmitter();
  constructor(private bookService: BookService, private authService: AuthService) {}

  onDelete(){
    this.deleteBook.emit({book: this.bookItem});
  }

  getFullBook(){
    this.fullBook.emit({fullBook: this.bookItem});
  }
}
