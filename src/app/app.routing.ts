import { Routes, RouterModule } from '@angular/router';

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

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'profile/:userId/website', component: WebsiteListComponent },
  { path: 'profile/:userId/website/new', component: WebsiteNewComponent },
  { path: 'profile/:userId/website/:websiteId', component: WebsiteEditComponent },
  { path: 'profile/:userId/website/:websiteId/page', component: PageListComponent },
  { path: 'profile/:userId/website/:websiteId/page/new', component: PageNewComponent },
  { path: 'profile/:userId/website/:websiteId/page/:pageId', component: PageEditComponent },
  { path: 'profile/:userId/website/:websiteId/page/:pageId/widget', component: WidgetListComponent },
  // { path: 'profile/:userId/website/:websiteId/page/:pageId/widget/new', component: WidgetChooserComponent },
  // { path: 'profile/:userId/website/:websiteId/page/:pageId/widget/new/:widgetId', component: WidgetEditComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(appRoutes);
