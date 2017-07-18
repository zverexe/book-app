import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "../services/validate.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  invalidEmail: boolean = false;
  registered: boolean = false;

  constructor(private validateService: ValidateService,
              private authService: AuthService, private router: Router,
              private flashMessage: FlashMessagesService) { }

   ngOnInit(){
     if(this.authService.loggedIn()){
       this.router.navigate(['/book/book-list']);
     }
   }


  //Register user
  addUser(){
    const user={
      email: this.email,
      password: this.password
    };

    if(!this.validateService.validateEmail(user.email)){
      return this.invalidEmail = true;
    }else{
      this.invalidEmail = false;
    }

    this.authService.registerUser(user).subscribe(data=>{
          if(data.success){
            this.authService.userData(data.token, data.user);
            this.flashMessage.show('Account created.', {cssClass: 'alert-success'});
            this.router.navigate(['/book/book-list']);
            console.log('registered');
          }else{
            this.flashMessage.show('You are not registered. Wrong email or password.', {cssClass: 'alert-danger', timeout: 2000})
            console.log('not registered');
            this.router.navigate(['/register']);
          }
        });
  }

}
