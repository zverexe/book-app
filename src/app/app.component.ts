import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewChecked{
  title = 'app works!';
  userEmail: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngAfterViewChecked(){
    this.getUser();
  }

  logOut(){
    this.authService.logOut();
    this.userEmail=null;
    this.router.navigate(['/']);
  }

  getUser(){
    if(this.authService.loggedIn()) {
      this.userEmail = JSON.parse(localStorage.getItem("user")).name;
      return this.userEmail;
    }
  }


}
