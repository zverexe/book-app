import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(){
    const user ={
      email: this.email,
      password: this.password
    }

    this.authService.loginUser(user).subscribe((data)=>{
      if(data.success){
        this.authService.userData(data.token, data.user);
        this.router.navigate(['/']);
      }else{
        console.log('user didn\'t logged in');
        this.router.navigate(['/login']);
      }
    });

  }

}
