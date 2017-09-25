import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BookService} from '../services/book.service';
import { FlashMessagesService } from "angular2-flash-messages";
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: ['edit-book.component.scss']
})

export class EditBookComponent implements OnInit {

    imageId: string;
    uploadProgress: boolean = false;
    book: any = {};
    oldBook: any = {};
    changedRating: any;

    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: 'dwfmktoib', uploadPreset: 'umpwqofc' })
    );

    constructor(private activeRoute: ActivatedRoute,
                private router: Router,
                private bookService: BookService,
                private flashMessage: FlashMessagesService) {

        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
            let res: any = JSON.parse(response);
            this.book.image = res.public_id;
            console.log(res);
            this.uploadProgress = false;
            this.flashMessage.show('Image added.', {cssClass: 'alert-success'});
            return { item, response, status, headers };
        };
    }

    upload(input) {
        let file = input.files[0];
        if (file.type.match('image/*')) {
            this.uploadProgress = true;
            this.uploader.uploadAll();
        } else {
            this.flashMessage.show('Wrong image format. Please try to upload image.', {cssClass: 'alert-danger', timeout: 4000})
            return false;
        }
    }

    ngOnInit() {
        const id = this.activeRoute.snapshot.params['id'];
        this.bookService.getBook(id).subscribe(res => {
            this.book = res.book;
            this.oldBook = Object.assign({}, this.book);
        });
    }

    // Give rating to the book
    rating(rating){
        setTimeout(() => {
            this.book.rating = rating;
            this.changedRating = rating;
        });

    }

    // Edit book
    edit(book, input) {

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
            rating: book.rating,
            image: this.book.image,
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

    // Close edit if nothing changed
    closeEdit(book) {
        Object.assign(this.book, this.oldBook);
        this.router.navigate(['/book/book-list']);
    }

    // Check book status
    isActiveStatus(book) {
        return book.displayStatus === 'active';
    }

    // Change book status
    changeStatus(book) {
        book.status = !book.status;
        book.displayStatus = book.status ? 'active' : 'inactive';
        this.bookService.editBook(book).subscribe(res => {
            console.log(res);
        });
    }
}
