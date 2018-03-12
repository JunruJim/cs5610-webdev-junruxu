import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Widget } from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widgetId: String;
  widget: Widget;

  constructor(
    @Inject('WidgetService') private widgetService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetId = (params['widgetId']);

      // new
      this.widget = this.widgetService.dumpWidget();
      if (this.widgetId === 'heading') {
        this.widget.widgetType = 'HEADING';
      } else if (this.widgetId === 'image') {
        this.widget.widgetType = 'IMAGE';
      } else if (this.widgetId === 'youtube') {
        this.widget.widgetType = 'YOUTUBE';

      // update
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
