import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Router} from '@angular/router';
import { AuthService } from "../services/auth.service";

interface Book {
  title: string;
  author: string;
  description: string;
  status: boolean;
  displayStatus: string;
  rating: number;
  creator: string;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['add-book.component.scss']
})



export class AddBookComponent implements OnInit {

  public book: Book = {
    title: '',
    author: '',
    description: '',
    status: false,
    displayStatus: '',
    rating: 0,
    creator: ''
  };

  constructor(private bookService: BookService, private router: Router,
              private authService: AuthService) {  }

  ngOnInit() {

  }

  //Add book
  addBook() {
    const newBook = this.book;

    newBook.creator = this.authService.loadUserId();
    newBook.displayStatus = this.book.status ? 'active' : 'inactive';
    console.log(newBook);
    this.bookService.createBook(newBook).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/book']);
        console.log('book created');
      } else {
        console.log('error book creation');
      }
    });
  }


}
