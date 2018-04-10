import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Website } from '../../../models/website.model.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  websites: Website[] = [];

  constructor(
    @Inject('WebsiteService') private websiteService,
    @Inject('SharedService') private sharedService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.websiteService.findWebsitesByUser(this.sharedService.user._id).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        }
      );
    });
  }
}
