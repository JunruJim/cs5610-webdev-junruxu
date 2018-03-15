import { Component, Inject, OnInit } from '@angular/core';
import { Widget } from '../../../../models/widget.model.client';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  widget: Widget;
  widgetId: String;
  pageId: String;
  websiteId: String;
  userId: String;
  baseUrl: String;

  constructor(
    @Inject('WidgetService') private widgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  updateOrCreateWidget() {
    if (!this.widget._id) {
      this.widgetService.createWidget(this.pageId, this.widget).subscribe(
        (widget: Widget) => {
          this.widget = widget;
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
          console.log(this.widget);
        }
      );
    } else {
      this.widgetService.updateWidget(this.widget._id, this.widget).subscribe(
        () => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        }
      );
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  ngOnInit() {

    this.baseUrl = environment.baseUrl;
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetId = params['widgetId'];
      this.pageId = params['pageId'];
      this.websiteId = params['websiteId'];
      this.userId = params['userId'];
      if (this.widgetId === 'image') {
        this.widget = this.widgetService.dumpWidget();
        this.widget.widgetType = 'IMAGE';
      } else {
        this.widgetService.findWidgetById(this.widgetId).subscribe(
          (widget: Widget) => {
            this.widget = widget;
            console.log(this.widget);
          }
        );
      }
    });
  }

}
