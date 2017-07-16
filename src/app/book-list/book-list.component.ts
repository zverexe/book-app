import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['book-list.component.scss']

})
export class BookListComponent implements OnInit {

  books: any;
  fullBook: any;

  public filterQuery = '';
  public rowsOnPage = 5;
  public sortBy = 'title';
  public sortOrder = 'asc';

  user_id: string;

  constructor(private bookService: BookService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.user_id = this.authService.loadUserId();
    this.getFreshListOfBooks(this.user_id);
  }


  getFreshListOfBooks(id) {
    this.bookService.getAllBooks(id).subscribe(data => {
      if (data) {
        this.books = data;
        console.log(data);
      }
    });
  }

  getFullBook(book) {
    this.fullBook = book;
  }

  deleteBook(book) {
    this.bookService.removeBook(book._id).subscribe(data => {
      if (data) {
        this.books.forEach(item => {
          if (item._id === book._id) {
            this.books.splice(item, 1);
            this.getFreshListOfBooks(this.user_id);
          }
        });
      }
    });
  }

  editBook(book) {
    console.log(book);
    this.router.navigate(['/book/edit', book._id]);
  }

  isActiveStatus(book) {
    return book.displayStatus === 'active';
  }

  changeStatus(book) {
    book.status = !book.status;
    book.displayStatus = book.status ? 'active' : 'inactive';
    this.bookService.editBook(book).subscribe(res => {
      console.log(res);
    });
  }

  onCloseBook(){
    this.fullBook=null;
  }

}
