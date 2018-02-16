import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Website } from '../../../models/website.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  website: Website;
  userId: String;
  websites: Website[] = [];

  constructor(
    @Inject('WebsiteService') private websiteService,
    private activatedRoute: ActivatedRoute
  ) { }

  updateWebsite() {
    this.website = this.websiteService.updateWebsite(this.website._id, this.website);
    console.log(this.website);
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.website._id);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      // alert('userId is' + this.userId);
      this.userId = params['userId'];
      this.website = this.websiteService.findWebsiteById(params['websiteId']);
    });
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }
}
