import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['book.component.scss']
})
export class BookComponent implements OnInit {

    @Input() book: any;
    @Output() close = new EventEmitter();

    closeBook(){
        this.close.emit({book: this.book});
    }

    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: 'dwfmktoib', uploadPreset: 'umpwqofc' })
    );


    constructor() { }

    ngOnInit() {
    }

}
