import { Component, OnInit } from '@angular/core';
import { BookService } from "../services/book.service";
import { Router } from "@angular/router";



@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  title: string;
  author: string;
  description : string;
  status: boolean;
  rating: number;

  constructor(private bookService: BookService) { }

  ngOnInit() {

  }

  addBook(){
    const book={
    title: this.title,
    author: this.author,
    description : this.description,
    status: this.status,
    rating: this.rating
  }
    //
    this.bookService.createBook(book).subscribe(data=>{
      if(data.success){
        //this.authService.userData(data.token, data.user);
        //this.router.navigate(['/']);
        console.log('book created');
      }else{
        console.log('error book creation');
        //this.router.navigate(['/register']);
      }
    });
  }



}
