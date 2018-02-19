import {Component, Inject, OnInit} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  widget: Widget;
  widgetId: String;
  pageId: String;

  constructor(
    @Inject('WidgetService') private widgetService,
    private activatedRoute: ActivatedRoute
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
    this.widgetService.deleteWidget(this.widget._id);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetId = params['widgetId'];
      this.pageId = params['pageId'];
      if (this.widgetId === 'image') {
        this.widget = this.widgetService.dumpWidget();
        this.widget.widgetType = 'IMAGE';
      } else {
        this.widget = this.widgetService.findWidgetById(this.widgetId);
      }
    });
  }

}
