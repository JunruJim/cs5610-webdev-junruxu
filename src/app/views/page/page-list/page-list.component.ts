import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../../models/page.model.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  pages: Page[] = [];

  constructor(
    @Inject('PageService') private pageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.pages = this.pageService.findPageByWebsiteId(params['websiteId']);
    });
  }
}
