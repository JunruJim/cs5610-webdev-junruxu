import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  updatePage() {
    this.pageService.updatePage(this.page._id, this.page).subscribe(
      (page: Page) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        console.log(this.page);
      }
    );
  }

  deletePage() {
    this.pageService.deletePage(this.page._id).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.pageService.findPageById(params['pageId']).subscribe(
        (page: Page) => {
          this.page = page;
        }
      );
    });
  }
}
