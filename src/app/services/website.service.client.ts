import { Website } from '../models/website.model.client';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsiteService {

  constructor(private http: Http) { }

  baseUrl = environment.baseUrl;

  dumpWebsite() {
    return new Website(undefined, undefined, undefined, undefined);
  }

  createWebsite(userId: String, website: Website) {
    return this.http.post(this.baseUrl + '/api/user/' + userId + '/website', website)
      .map((res: Response) => {
        return res.json();
      });
  }

  findWebsitesByUser(userId: String) {
    const resultSet = [];
    for (const website of this.websites) {
      if (website.developerId === userId) {
        resultSet.push(this.copyWebsite(website));
      }
    }
    return resultSet;
  }
  findWebsiteById(websiteId: String) {
    const foundWebsite = this.websites.find(function (website) {
      return website._id === websiteId;
    });
    return this.copyWebsite(foundWebsite);
  }

  updateWebsite(websiteId: String, website: Website) {
    const foundWebsite = this.websites.find(function(website) {
      return website._id === websiteId;
    });
    foundWebsite.name = website.name;
    foundWebsite.description = website.description;
    return this.copyWebsite(foundWebsite);
  }

  deleteWebsite(websiteId: String) {
    for (const i in this.websites) {
      if (this.websites[i]._id === websiteId) {
        const j = +i;
        this.websites.splice(j, 1);
      }
    }
  }

}
