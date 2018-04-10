import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './views/user/login/login.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { RegisterComponent } from './views/user/register/register.component';
import { WebsiteListComponent } from './views/website/website-list/website-list.component';
import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
import { FlickrImageSearchComponent } from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/website', component: WebsiteListComponent },
  { path: 'profile/website/new', component: WebsiteNewComponent },
  { path: 'profile/website/:websiteId', component: WebsiteEditComponent },
  { path: 'profile/website/:websiteId/page', component: PageListComponent },
  { path: 'profile/website/:websiteId/page/new', component: PageNewComponent },
  { path: 'profile/website/:websiteId/page/:pageId', component: PageEditComponent },
  { path: 'profile/website/:websiteId/page/:pageId/widget', component: WidgetListComponent },
  { path: 'profile/website/:websiteId/page/:pageId/widget/new', component: WidgetChooserComponent },
  { path: 'profile/website/:websiteId/page/:pageId/widget/:widgetId', component: WidgetEditComponent },
  { path: 'profile/website/:websiteId/page/:pageId/widget/:widgetId/flickr', component: FlickrImageSearchComponent },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
