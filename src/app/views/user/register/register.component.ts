import {Component, Inject, OnInit} from '@angular/core';
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
    if (this.user.password === this.verifyPwd) {
      this.pwInconsistentFlag = false;
      this.user = this.userService.createUser(this.user);
      this.router.navigate(['/profile', this.user._id]);
    } else {
      this.pwInconsistentFlag = true;
    }
  }

  ngOnInit() {
    this.user = this.userService.dumpUser();
  }

}
