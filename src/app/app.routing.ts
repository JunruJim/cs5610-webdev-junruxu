import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/user/login/login.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { RegisterComponent } from './views/user/register/register.component';
import { WebsiteListComponent } from './views/website/website-list/website-list.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  // { path: 'profile/:userId/website', component: WebsiteListComponent },
  // { path: 'profile/:userId/website/new', component: WebsiteListComponent },
  // { path: 'profile/:userId/website/:websiteId', component: WebsiteListComponent },
  // { path: 'profile/:userId/website/:websiteId/page', component: WebsiteListComponent },
  // { path: 'profile/:userId/website/:websiteId/page/new', component: WebsiteListComponent },
  // { path: 'profile/:userId/website/:websiteId/page/:pageId', component: WebsiteListComponent },
  // { path: 'profile/:userId/website/:websiteId/page/:pageId/widget', component: WebsiteListComponent },
  // { path: 'profile/:userId/website/:websiteId/page/:pageId/widget/new', component: WebsiteListComponent },
  // { path: 'profile/:userId/website/:websiteId/page/:pageId/widget/new/:widgetId', component: WebsiteListComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
