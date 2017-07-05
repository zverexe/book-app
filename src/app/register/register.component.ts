import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../services/validate.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  invalidEmail: boolean = false;
  registered: boolean = false;

  constructor(private validateService: ValidateService,
              private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  addUser(){
    const user={
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateEmail(user.email)){
      return this.invalidEmail = true;
    }else{
      this.invalidEmail = false;
    }

    //Register user
    this.authService.registerUser(user).subscribe(data=>{
          if(data.success){
            this.authService.userData(data.token, data.user);
            this.router.navigate(['/']);
            console.log('registered');
          }else{
            console.log('not registered');
            this.router.navigate(['/register']);
          }
        });
  }


}
