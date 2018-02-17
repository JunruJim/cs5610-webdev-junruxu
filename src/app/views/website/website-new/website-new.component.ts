import { Component, Inject, OnInit } from '@angular/core';
import { Website } from '../../../models/website.model.client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  website: Website;
  userId: String;
  websites: Website[] = [];

  constructor(
    @Inject('WebsiteService') private websiteService,
    private activatedRoute: ActivatedRoute
  ) { }

  createWebsite() {
    this.website = this.websiteService.createWebsite(this.userId, this.website);
    console.log(this.website);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
    });
    this.website = this.websiteService.dumpWebsite();
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }
}
