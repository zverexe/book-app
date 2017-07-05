import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(private router: ActivatedRoute, private bookService: BookService) { }

  book: any;


  ngOnInit() {
    let id = this.router.snapshot.params['id'];
    this.bookService.getBook(id).subscribe(res=>{
        this.book= res.book;
      console.log(this.book);
    });

  }

}
