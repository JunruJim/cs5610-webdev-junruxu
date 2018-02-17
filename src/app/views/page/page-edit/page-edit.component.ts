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
      this.page = this.pageService.findPageById(params['pageId']);
    });
  }
}
