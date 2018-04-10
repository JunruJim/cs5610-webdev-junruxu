import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../../models/user.model.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  verifyPwd: String;
  errorFlag: Boolean = false;
  errorMsg: String = 'Password inconsistent!';

  constructor(
    @Inject('UserService') private userService,
    private router: Router
  ) { }

  register() {
    if (this.user.password === this.verifyPwd) {
      this.errorFlag = false;
      this.userService.register(this.user.username, this.user.password).subscribe(
        (user: User) => {
          this.user = user;
          console.log(this.user);
          this.router.navigate(['/profile']);
        }, (err: any) => {
          this.errorFlag = true;
          this.errorMsg = 'Username unavailable!';
        }
      );
    } else {
      this.errorFlag = true;
      this.errorMsg = 'Password inconsistent!';
    }
  }

  ngOnInit() {
    this.user = this.userService.dumpUser();
    console.log(this.user);
    this.userService.hello().subscribe(
      (msg: string) => {
        console.log(msg);
      }
    );
  }

}
