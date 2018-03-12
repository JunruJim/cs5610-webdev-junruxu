import { Component, Inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Widget } from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  widget: Widget;
  widgetId: String;
  pageId: String;

  constructor(
    @Inject('WidgetService') private widgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  updateOrCreateWidget() {
    if (!this.widget._id) {
      this.widget = this.widgetService.createWidget(this.pageId, this.widget);
    } else {
      this.widget = this.widgetService.updateWidget(this.widget._id, this.widget);
    }
    console.log(this.widget);
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetId = params['widgetId'];
      this.pageId = params['pageId'];
      if (this.widgetId === 'heading') {
        this.widget = this.widgetService.dumpWidget();
        this.widget.widgetType = 'HEADING';
      } else {
        this.widget = this.widgetService.findWidgetById(this.widgetId);
      }
    });
  }

}
