import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../../models/page.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  page: Page;
  websiteId: String;
  userId: String;

  constructor(
    @Inject('PageService') private pageService,
    private activatedRoute: ActivatedRoute
  ) { }

  createWebsite() {
    this.page = this.pageService.createPage(this.websiteId, this.page);
    console.log(this.page);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['userId'];
      this.websiteId = params['websiteId'];
    });
    this.page = this.pageService.dumpPage();
  }
}
