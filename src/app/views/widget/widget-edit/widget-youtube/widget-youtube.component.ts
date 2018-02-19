import {Component, Inject, OnInit} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

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
      if (this.widgetId === 'youtube') {
        this.widget = this.widgetService.dumpWidget();
        this.widget.widgetType = 'YOUTUBE';
      } else {
        this.widget = this.widgetService.findWidgetById(this.widgetId);
      }
    });
  }

}
