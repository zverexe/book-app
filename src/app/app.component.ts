import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  userEmail: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userEmail = this.authService.getUser().name;
    console.log(this.userEmail);
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }


}
