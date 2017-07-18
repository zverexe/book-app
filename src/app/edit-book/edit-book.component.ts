import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BookService} from '../services/book.service';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['edit-book.component.scss']
})

export class EditBookComponent implements OnInit {

  book: any = {};
  oldBook: any = {};
  changedRating: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
              private bookService: BookService) {
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.params['id'];
    this.bookService.getBook(id).subscribe(res => {
      this.book = res.book;
      this.oldBook = Object.assign({}, this.book);
    });
  }

  //Give rating to the book
  rating(rating){
    setTimeout(() => {
      this.book.rating = rating;
      this.changedRating = rating;
    });

  }

  //Edit book
  edit(book) {
    const id = this.activeRoute.snapshot.params['id'];
    if(this.changedRating){
      book.rating = this.changedRating;
    }
    const updbook = {
      _id: id,
      title: book.title,
      author: book.author,
      description: book.description,
      status: book.status,
      displayStatus: book.displayStatus,
      rating: book.rating
    };

    this.bookService.editBook(updbook).subscribe(data => {
      if (data.success) {
        console.log('book edited');
        this.router.navigate(['/book/book-list']);
      } else {
        console.log('error book edit');
      }
    });
  }

  //Close edit if nothing changed
  closeEdit(book) {
    Object.assign(this.book, this.oldBook);
    this.router.navigate(['/book/book-list']);
  }

  //Check book status
  isActiveStatus(book) {
    return book.displayStatus === 'active';
  }

  //Change book status
  changeStatus(book) {
    book.status = !book.status;
    book.displayStatus = book.status ? 'active' : 'inactive';
    this.bookService.editBook(book).subscribe(res => {
      console.log(res);
    });
  }

}
