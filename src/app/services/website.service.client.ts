import { Website } from '../models/website.model.client';
import { Injectable } from '@angular/core';

@Injectable()
export class WebsiteService {
  websites: Website[] = [
    { '_id': '1', 'name': 'Facebook',    'developerId': '4', 'description': 'Lorem' },
    { '_id': '2', 'name': 'Tweeter',     'developerId': '4', 'description': 'Lorem' },
    { '_id': '4', 'name': 'Gizmodo',     'developerId': '4', 'description': 'Lorem' },
    { '_id': '8', 'name': 'Go',          'developerId': '1', 'description': 'Lorem' },
    { '_id': '5', 'name': 'Tic Tac Toe', 'developerId': '1', 'description': 'Lorem' },
    { '_id': '6', 'name': 'Checkers',    'developerId': '1', 'description': 'Lorem' },
    { '_id': '7', 'name': 'Chess',       'developerId': '2', 'description': 'Lorem' }
  ];

  dumpWebsite() {
    return new Website(undefined, undefined, undefined, undefined);
  }

  copyWebsite(website: Website) {
    if (!website) {
      return undefined;
    }
    return new Website(website._id, website.name, website.developerId, website.description);
  }

  createWebsite(userId: String, website: Website) {
    const createdWebsite = new Website(String(this.websites.length + 1), website.name, userId, website.description);
    this.websites.push(createdWebsite);
    return this.copyWebsite(createdWebsite);
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
