import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Widget } from '../../../models/widget.model.client';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  widgets: Widget[] = [];
  public urls = [];
  i = 0;

  constructor(
    @Inject('WidgetService') private widgetService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetService.findWidgetsByPageId(params['pageId']).subscribe(
        (widgets: Widget[]) => {
          this.widgets = widgets;
          console.log(this.widgets);
          for (const widget of this.widgets) {
            if (widget.widgetType === 'YOUTUBE') {
              this.urls.push(this.domSanitizer.bypassSecurityTrustResourceUrl(String(widget.url)));
            }
          }
        }
      );
    });
  }

}
