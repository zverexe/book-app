import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Router} from '@angular/router';

interface Book {
  title: string;
  author: string;
  description: string;
  status: boolean;
  displayStatus: string;
  rating: number;
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
    rating: 0
  };

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit() {

  }

  addBook() {
    const newBook = this.book;
    newBook.displayStatus = this.book.status ? 'active' : 'inactive';
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
