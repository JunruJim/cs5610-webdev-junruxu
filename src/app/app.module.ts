import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { UserService } from './services/user.service.client';
import { WebsiteService } from './services/website.service.client';
import { PageService } from './services/page.service.client';
import { WidgetService } from './services/widget.service.client';
import { FlickrService } from './services/flickr.service.client';
import { SharedService } from './services/shared.service';
import { AuthGuard } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/user/login/login.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { RegisterComponent } from './views/user/register/register.component';
import { WebsiteListComponent } from './views/website/website-list/website-list.component';
import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
import { WidgetHeaderComponent } from './views/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './views/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import { WidgetTextComponent } from './views/widget/widget-edit/widget-text/widget-text.component';
import { WidgetHtmlComponent } from './views/widget/widget-edit/widget-html/widget-html.component';
import { FlickrImageSearchComponent } from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';

import { SortableDirective } from '../../assignment/directives/sortable.directive';
import { OrderByPipe } from '../../assignment/pipes/order-by-pipe/order-by-pipe.pipe';
import { SafePipe } from '../../assignment/pipes/safe-url/safe-url.pipe';

import { QuillEditorModule } from 'ngx-quill-editor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    PageNewComponent,
    PageEditComponent,
    PageListComponent,
    WidgetChooserComponent,
    WidgetListComponent,
    WidgetEditComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    SortableDirective,
    OrderByPipe,
    SafePipe,
    WidgetHtmlComponent,
    WidgetTextComponent,
    FlickrImageSearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    QuillEditorModule
  ],
  providers: [
    {
      provide: 'UserService',
      useClass: UserService
    },
    {
      provide: 'WebsiteService',
      useClass: WebsiteService
    },
    {
      provide: 'PageService',
      useClass: PageService
    },
    {
      provide: 'WidgetService',
      useClass: WidgetService
    },
    {
      provide: 'FlickrService',
      useClass: FlickrService
    },
    {
      provide: 'SharedService',
      useClass: SharedService
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
