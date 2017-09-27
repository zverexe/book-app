import {Component, OnInit,NgZone} from '@angular/core';
import {BookService} from '../services/book.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Router} from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';


interface Book {
    title: string;
    titleLowerCase: string;
    author: string;
    lowerCaseName: string;
    description: string;
    status: boolean;
    displayStatus: string;
    rating: number;
    creator: string;
    image: string;

}

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['add-book.component.scss']
})



export class AddBookComponent implements OnInit {

    imageId: string;


    public book: Book = {
        title: '',
        titleLowerCase: '',
        author: '',
        lowerCaseName: '',
        description: '',
        status: false,
        displayStatus: '',
        rating: 0,
        creator: '',
        image:'',
    };

    cloudinaryImage: any;

    uploadProgress: boolean = false;

    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: 'dwfmktoib', uploadPreset: 'umpwqofc' })
    );

    constructor(private bookService: BookService, private router: Router,
                private authService: AuthService) {

        //Override onSuccessItem function to record cloudinary response data
        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
            let res: any = JSON.parse(response);
            this.imageId = res.public_id;
            console.log(res);
            this.uploadProgress = false;
            return { item, response, status, headers };
        };
    }

    upload() {
        this.uploadProgress = true;
        this.uploader.uploadAll();
    }

    ngOnInit(): void {
    }

    //Add book
    addBook() {

        const newBook = this.book;
        newBook.image = this.imageId;
        newBook.lowerCaseName = this.book.author.toLowerCase().replace(/ /g,'');
        newBook.titleLowerCase = this.book.title.toLowerCase().replace(/ /g,'');

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

        this.imageId = null;
    }


}
