import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // 'username' and 'userId' discarded because 'user' can do their job
  user: User;
  updatedFlag: Boolean = false;
  updatedMsg: String = 'Updated!';

  constructor(
    @Inject('UserService') private userService,
    private activatedRoute: ActivatedRoute
  ) { }

  updateUser() {
    this.user = this.userService.updateUser(this.user._id, this.user);
    console.log(this.user);
    this.updatedFlag = true;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      // alert('userId is' + this.userId);
      this.user = this.userService.findUserById(params['userId']);
    });
  }
}
