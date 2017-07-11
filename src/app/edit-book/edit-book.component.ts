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

  title: string;
  author: string;
  description : string;
  status: boolean;
  rating: number;

  ngOnInit() {
    let id = this.router.snapshot.params['id'];
    this.bookService.getBook(id).subscribe(res=>{
        this.book= res.book;
      console.log(this.book);
    });
  }

  edit(){
    let id = this.router.snapshot.params['id'];
    const book={
      _id: id,
      title: this.title,
      author: this.author,
      description : this.description,
      status: this.status,
      rating: this.rating,
    }
    //
    this.bookService.editBook(book).subscribe(data=>{
      if(data.success){
        //this.authService.userData(data.token, data.user);
        //this.router.navigate(['/']);
        console.log('book edited');
      }else{
        console.log('error book edit');
        //this.router.navigate(['/register']);
      }
    });
  }


}
