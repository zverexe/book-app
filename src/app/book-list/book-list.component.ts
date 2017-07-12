import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['book-list.component.scss']

})
export class BookListComponent implements OnInit {

  books: any;
  fullBook: any;
  constructor(private bookService: BookService,
              private authService: AuthService) { }

  ngOnInit() {
    this.getFreshListOfBooks();

  }

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "title";
  public sortOrder = "asc";


  getFreshListOfBooks() {
    this.bookService.getAllBooks().subscribe(data=>{
      if(data){
        this.books = data;
        //this.filteredItems = data;
        //this.init();
      }
    });
  }

  getFullBook(book){
    this.fullBook = book;
  }

  deleteBook(book) {
    this.bookService.removeBook(book._id).subscribe(data => {
      if (data) {
        this.books.forEach(item => {
          if (item._id == book._id) {
            this.books.splice(item, 1);
            this.getFreshListOfBooks();
          }
        });
      }
    });
  }
    /*onFullBook($event){
     this.fullBook = $event.fullBook;
     }*/

  /*deleteBook($event){
    console.log();
    this.bookService.removeBook($event.book._id).subscribe(data=>{
      if(data){
        this.books.forEach(item=>{
          if(item._id==$event.book._id){
            this.books.splice(item,1);
          }
        });
      }
    });
  }*/


  filteredItems: any;
  pages : number = 4;
  pageSize : number = 5;
  pageNumber : number = 0;
  currentIndex : number = 1;
  pagesIndex : Array<number>;
  pageStart : number = 1;
  inputName : string = '';

  /*init(){
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 4;

    this.pageNumber = parseInt(""+ (this.filteredItems.length / this.pageSize));
    if(this.filteredItems.length % this.pageSize != 0){
      this.pageNumber ++;
    }

    if(this.pageNumber  < this.pages){
      this.pages =  this.pageNumber;
    }
    this.refreshItems();
  }


  fillArray(): any{
    var obj = new Array();
    for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
      obj.push(index);
    }
    return obj;
  }
  refreshItems(){
    this.books = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex =  this.fillArray();
  }
  prevPage(){
    if(this.currentIndex>1){
      this.currentIndex --;
    }
    if(this.currentIndex < this.pageStart){
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();
  }
  nextPage(){
    if(this.currentIndex < this.pageNumber){
      this.currentIndex ++;
    }
    if(this.currentIndex >= (this.pageStart + this.pages)){
      this.pageStart = this.currentIndex - this.pages + 1;
    }

    this.refreshItems();
  }
  setPage( index : number){

    this.currentIndex = index;
    this.refreshItems();
  }

  filterByName(books){
    console.log(books);
    this.filteredItems = [];
    if(this.inputName != ""){
      this.books.forEach(element => {
        if(element.author.toUpperCase().indexOf(this.inputName.toUpperCase())>=0 ||
            element.title.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
          this.filteredItems.push(element);
        }
      });
    }else{
      this.filteredItems = this.books;
    }
    console.log(this.filteredItems);
    this.init();
  }


  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;
// Change sort function to this:
  sort(property){
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }*/


}
