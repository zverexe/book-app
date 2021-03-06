import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { DataTableModule } from "angular2-datatable";
import { FlashMessagesModule } from "angular2-flash-messages";

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DataFilterPipe } from './category.pipe';

import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { GuardService } from "./guards/guard.service";
import { BookService } from "./services/book.service";
import { BookListItemComponent } from './book-list-item/book-list-item.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'auth',
    children:[
      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent}
    ]},
  {path: 'book',
    children:[
      {path: '', component: BookListComponent, canActivate: [GuardService]},
      {path: 'book-list', component: BookListComponent, canActivate: [GuardService]},
      {path: 'add', component: AddBookComponent, canActivate: [GuardService]},
      {path: 'edit/:id', component: EditBookComponent, canActivate: [GuardService]},
      {path: ':book', component: BookComponent, canActivate: [GuardService]},
  ]},
]

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookComponent,
    AddBookComponent,
    EditBookComponent,
    RegisterComponent,
    LoginComponent,
    BookListItemComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule
  ],
  providers: [
    ValidateService,
    AuthService,
    GuardService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
