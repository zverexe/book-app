import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  //book: any;
  @Input() book: any;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    /*this.bookService.getBook(this.id).subscribe(res=>{
      this.book = res.book;
    });*/
  }

}