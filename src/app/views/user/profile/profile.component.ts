import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // 'username' and 'userId' discarded because 'user' can do their job
  user: User;
  constructor(
    @Inject('UserService') private userService,
    private activatedRoute: ActivatedRoute
  ) { }

  updateUser(user) {
    console.log(user);
    this.user = this.userService.updateUser(user);
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // alert('userId is' + this.userId);
      this.user = this.userService.findUserById(params['userId']);
    });
  }
}
