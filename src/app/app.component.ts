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
    this.userEmail = this.authService.getUser().name;
  }

  logOut(){
    this.authService.logOut();
    this.userEmail=null;
    this.router.navigate(['/']);
  }

}
