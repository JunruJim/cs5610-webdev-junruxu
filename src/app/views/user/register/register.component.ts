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
  pwInconsistentFlag: Boolean = false;
  pwInconsistentMsg: String = 'Password inconsistent!';

  constructor(
    @Inject('UserService') private userService,
    private router: Router
  ) { }

  register() {
    console.log(this.user);
    if (this.user.password === this.verifyPwd) {
      console.log(2);
      this.pwInconsistentFlag = false;
      this.userService.createUser(this.user).subscribe(
        (user: User) => {
          this.user = user;
          console.log(this.user);
          this.router.navigate(['/profile', user._id]);
        }
      );
    } else {
      console.log(3);
      this.pwInconsistentFlag = true;
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
