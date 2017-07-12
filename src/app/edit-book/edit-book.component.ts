import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private router: Router,
              private bookService: BookService) { }
  book: any;
  oldBook: any;

  ngOnInit() {
    let id = this.activeRoute.snapshot.params['id'];
    this.bookService.getBook(id).subscribe(res=>{
        this.book= res.book;
        this.oldBook = Object.assign({}, this.book);
    });
  }

  edit(book){
    let id = this.activeRoute.snapshot.params['id'];
    const updbook={
      _id: id,
      title: book.title,
      author: book.author,
      description : book.description,
      status: book.status,
      rating: book.rating
    };
    console.log(book);
    //
    this.bookService.editBook(updbook).subscribe(data=>{
      if(data.success){
        //this.authService.userData(data.token, data.user);
        console.log('book edited');
        this.router.navigate(['/']);
      }else{
        console.log('error book edit');
        //this.router.navigate(['/register']);
      }
    });
  }

  closeEdit(book) {
    Object.assign(this.book, this.oldBook);
    this.router.navigate(['/']);
  }


}
