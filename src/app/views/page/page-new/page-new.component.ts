import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../models/page.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  page: Page;
  websiteId: String;

  constructor(
    @Inject('PageService') private pageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  createWebsite() {
    this.pageService.createPage(this.websiteId, this.page).subscribe(
      (page: Page) => {
        this.page = page;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
    console.log(this.page);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.websiteId = params['websiteId'];
    });
    this.page = this.pageService.dumpPage();
  }
}
