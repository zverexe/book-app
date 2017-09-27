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

    public timeOut;
    public values='';
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
                console.log(this.books);
            }
        });
    }

    sort(sortItem){
        console.log(sortItem);
        this.user_id = this.authService.loadUserId();
        this.bookService.sortTable(this.user_id, sortItem).subscribe(data => {
            if (data) {
                this.books = data;
                console.log(this.books);
            }
        });
    }

    onSortByText(){
        this.user_id = this.authService.loadUserId();
        this.bookService.sortByText(this.user_id).subscribe(data => {
            if (data) {
                this.books = data;
                console.log(this.books);
            }
        });
    }

    onSortByRating($event){
        this.user_id = this.authService.loadUserId();
        this.bookService.sortByRating(this.user_id).subscribe(data => {
            if (data) {
                this.books = data;
                console.log(this.books);
            }
        });
    }

    onSortByStatus($event){
        this.user_id = this.authService.loadUserId();
        this.bookService.sortByStatus(this.user_id).subscribe(data => {
            if (data) {
                this.books = data;
                console.log(this.books);
            }
        });
    }

    searchBook($event) {
        this.user_id = this.authService.loadUserId();
        this.timeOut = setTimeout(()=>{
            clearTimeout(this.timeOut);
            this.values = $event.target.value;
            console.log(this.user_id);
            this.bookService.getAllBooks(this.user_id, this.values).subscribe(data => {
                if (data) {
                    this.books = data;
                }
            });

            console.log(this.values);
        }, 1500)

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
