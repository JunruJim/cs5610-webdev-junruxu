export class Widget {
  _id: String;
  widgetType: String;
  pageId: String;
  size: Number;
  text: String;
  url: String;
  width: String;
  formatted: boolean;
  rows: Number;
  name: String;
  dateCreated: String;
  placeholder: String;

  constructor(_id: String, widgetType: String, pageId: String, size: Number = 1, text: String = 'text', width: String = '100%',
              url: String = 'url', formatted: boolean = false) {
    this._id = _id;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.url = url;
    this.width = width;
    this.text = text;
    this.formatted = formatted;
  }
}
