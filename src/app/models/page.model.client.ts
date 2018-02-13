export class Page {
  _id: String;
  name: String;
  websiteId: String;
  description: String;

  constructor(_id: String, name: String, websiteId: String, description: String) {
    this._id = _id;
    this.name = name;
    this.websiteId = websiteId;
    this.description = description;
  }
}
