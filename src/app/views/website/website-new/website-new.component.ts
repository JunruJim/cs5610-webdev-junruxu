import { Component, Inject, OnInit } from '@angular/core';
import { Website } from '../../../models/website.model.client';
import { ActivatedRoute, Router } from '@angular/router';

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
    @Inject('SharedService') private sharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  createWebsite() {
    this.websiteService.createWebsite(this.userId, this.website).subscribe(
      (website: Website) => {
        this.website = website;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        console.log(this.website);
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = this.sharedService.user._id;
    });
    this.website = this.websiteService.dumpWebsite();
    this.websiteService.findWebsitesByUser(this.userId).subscribe(
      (websites: Website[]) => {
        this.websites = websites;
      }
    );
  }
}
