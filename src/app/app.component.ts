import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'app works!';
  userEmail: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngAfterViewInit(){
    this.userEmail = this.authService.getUser().name;
    console.log(this.userEmail);
  }

  logOut(){
    this.authService.logOut();
    this.userEmail=null;
    this.router.navigate(['/']);
  }


}
