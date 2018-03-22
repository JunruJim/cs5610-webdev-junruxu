import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model.client';
import { NgForm } from '@angular/forms';

// Dependency inject: use Inject instead of import to decoupling
// import { UserService } from '../../../services/user.service.client';
// userService = new UserService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding
  errorFlag: Boolean = false;
  errorMsg: String = 'Invalid username or password!';

  // use Inject instead of import
  constructor(
    @Inject('UserService') private userService,
    private router: Router
  ) {}

  // example of [(ngModel)] form (client side only):
  // login(username: String, password: String) {
  //   alert('username: ' + username);
  //   if (username === 'alice' && password == "qqq") {
  //     const user: User = this.userService.findUserByCredential(username, password);
  //     if (user) {
  //       this.router.navigate(['/profile', user._id ]);
  //     }
  //   }
  // }

  // example of ngForm (client side only):
  // login() {
  //   this.username = this.loginForm.value.username;
  //   this.password = this.loginForm.value.password;
  //
  //   const user: User = this.userService.findUserByCredential(this.username, this.password);
  //   if (user) {
  //     this.errorFlag = false;
  //     this.router.navigate(['/profile', user._id]);
  //   } else {
  //     this.errorFlag = true;
  //   }
  // }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.findUserByCredential(this.username, this.password).subscribe(
      (user: User) => {
        console.log(user);
        this.errorFlag = false;
        this.router.navigate(['/profile', user._id]);
      }, (error: any) => {
        this.errorFlag = true;
      }
    );
  }

  ngOnInit() {
    // this.userService.hello().subscribe(
    //   (msg: string) => {
    //     console.log(msg);
    //   }
    // );
  }

}
