import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../../models/widget.model.client';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  widget: Widget;
  widgetId: String;
  pageId: String;
  websiteId: String;
  userId: String;
  baseUrl: String;

  photos: any[];
  searchText: String;

  constructor(
    @Inject('WidgetService') private widgetService,
    @Inject('FlickrService') private flickrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          let val = data._body;

          // jsonFlickrApi(json body)
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    this.widget.url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server
      + '/' + photo.id + '_' + photo.secret + '_b.jpg';

    if (!this.widget._id) {
      this.widgetService.createWidget(this.pageId, this.widget).subscribe(
        (data: Widget) => {
          this.widget = data;
          this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
        }
      );
    } else {
      this.widgetService.updateWidget(this.widget._id, this.widget).subscribe(
        () => {
          this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
        }
      );
    }
  }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.activatedRoute.params.subscribe((params: any) => {
      this.widgetId = params['widgetId'];
      this.pageId = params['pageId'];
      this.websiteId = params['websiteId'];
      this.userId = params['userId'];
      if (this.widgetId === 'image') {
        this.widget = this.widgetService.dumpWidget();
        this.widget.widgetType = 'IMAGE';
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
