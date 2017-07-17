import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit(){
    if(this.authService.loggedIn()){
      this.router.navigate(['/book/book-list']);
    }
  }

  onLogin(){
    const user ={
      email: this.email,
      password: this.password
    };

    this.authService.loginUser(user).subscribe((data)=>{
      if(data.success){
        this.authService.userData(data.token, data.user);
        this.flashMessage.show('You are logged in.', {cssClass: 'alert-success'});
        this.router.navigate(['/book/book-list']);
      }else{
        this.flashMessage.show('You are not logged in. Wrong email or password.', {cssClass: 'alert-danger', timeout: 3000})
        this.router.navigate(['/login']);
      }
    });
  }
}
