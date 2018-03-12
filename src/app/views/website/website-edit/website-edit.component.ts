import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Website } from '../../../models/website.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  website: Website;
  websites: Website[] = [];

  constructor(
    @Inject('WebsiteService') private websiteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  updateWebsite() {
    this.websiteService.updateWebsite(this.website._id, this.website).subscribe(
      (website: Website) => {
        this.website = website;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        console.log(this.website);
      }
    );
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.website._id).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.websiteService.findWebsiteById(params['websiteId']).subscribe(
        (website: Website) => {
          this.website = website;
        }
      );
      this.websiteService.findWebsitesByUser(params['userId']).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        }
      );
    });
  }
}
