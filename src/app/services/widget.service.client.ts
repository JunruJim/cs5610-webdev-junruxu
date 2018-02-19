import { Widget } from '../models/widget.model.client';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetService {
  widgets: Widget[] = [
    { '_id': '1', 'widgetType': 'HEADING', 'pageId': '3', 'size': 2, 'text': 'GIZMODO', 'url': undefined, 'width': undefined },
    { '_id': '2', 'widgetType': 'HEADING', 'pageId': '3', 'size': 4, 'text': 'Lorem ipsum', 'url': undefined, 'width': undefined },
    { '_id': '3', 'widgetType': 'IMAGE', 'pageId': '3', 'width': '100%',
      'url': 'http://lorempixel.com/400/200/', 'size': undefined, 'text': undefined },
    { '_id': '4', 'widgetType': 'HTML', 'pageId': '3', 'text': '<p>Lorem ipsum</p>',
      'url': undefined, 'width': undefined, 'size': undefined },
    { '_id': '5', 'widgetType': 'HEADING', 'pageId': '3', 'size': 4, 'text': 'Lorem ipsum', 'url': undefined, 'width': undefined },
    { '_id': '6', 'widgetType': 'YOUTUBE', 'pageId': '3', 'width': '100%',
      'url': 'https://www.youtube.com/embed/AM2Ivdi9c4E', 'size': undefined, 'text': undefined },
    { '_id': '7', 'widgetType': 'HTML', 'pageId': '3', 'text': '<p>Lorem ipsum</p>',
      'url': undefined, 'width': undefined, 'size': undefined }
  ];

  dumpWidget() {
    return new Widget(undefined, undefined, undefined);
  }

  copyWidget(widget: Widget) {
    if (!widget) {
      return undefined;
    }
    return new Widget(widget._id, widget.widgetType, widget.pageId, widget.size, widget.text, widget.width, widget.url);
  }

  createWidget(pageId: String, widget: Widget) {
    const createdWidget = new Widget(String(this.widgets.length + 1), widget.widgetType, pageId, widget.size, widget.text,
      widget.width, widget.url);
    this.widgets.push(createdWidget);
    return this.copyWidget(createdWidget);
  }

  findWidgetsByPageId(pageId: String) {
    const resultSet = [];
    for (const widget of this.widgets) {
      if (widget.pageId === pageId) {
        resultSet.push(this.copyWidget(widget));
      }
    }
    return resultSet;
  }
  findWidgetById(widgetId: String) {
    const foundWidget = this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
    return this.copyWidget(foundWidget);
  }

  updateWidget(widgetId: String, widget: Widget) {
    const foundWidget = this.widgets.find(function(widget) {
      return widget._id === widgetId;
    });
    foundWidget.widgetType = widget.widgetType;
    foundWidget.size = widget.size;
    foundWidget.text = widget.text;
    foundWidget.width = widget.width;
    foundWidget.url = widget.url;
    return this.copyWidget(foundWidget);
  }

  deleteWidget(widgetId: String) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        const j = +i;
        this.widgets.splice(j, 1);
      }
    }
  }

}
