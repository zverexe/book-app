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
  @Output() bookId = new EventEmitter();
  constructor(private bookService: BookService, private authService: AuthService) {}

  onDelete(){
    this.deleteBook.emit({book: this.bookItem});
  }

  id(){
    this.bookId.emit({id: this.bookItem._id});
  }
}
