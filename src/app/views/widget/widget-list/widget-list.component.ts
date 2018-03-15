import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Widget } from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  widgets: Widget[] = [];
  pageId: String;
  public urls = [];
  i = 0;

  constructor(
    @Inject('WidgetService') private widgetService,
    private activatedRoute: ActivatedRoute
  ) { }

  // receiving the emitted event
  reorderWidgets(indexes) {
    // call widget service function to update widget as per index
    this.widgetService.reorderWidgets(indexes.startIndex, indexes.endIndex, this.pageId)
      .subscribe(
        (data) => console.log(data)
      );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.pageId = params['pageId'];
      this.widgetService.findWidgetsByPageId(this.pageId).subscribe(
        (widgets: Widget[]) => {
          this.widgets = widgets;
          console.log(this.widgets);
        }
      );
    });
  }

}
