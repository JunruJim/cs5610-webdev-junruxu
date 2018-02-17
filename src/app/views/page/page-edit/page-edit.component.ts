import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../../models/page.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  page: Page;
  websiteId: String;
  userId: String;

  constructor(
    @Inject('PageService') private pageService,
    private activatedRoute: ActivatedRoute
  ) { }

  updatePage() {
    this.page = this.pageService.updatePage(this.page._id, this.page);
    console.log(this.page);
  }

  deletePage() {
    this.pageService.deletePage(this.page._id);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      // alert('userId is' + this.userId);
      this.userId = params['userId'];
      this.websiteId = params['websiteId'];
      this.page = this.pageService.findPageById(params['pageId']);
    });
  }
}
