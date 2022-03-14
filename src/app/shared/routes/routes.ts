import { Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';


export const content: Routes = [
  {
    path: 'default',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../components/apps/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'termsandcondition',
    loadChildren: () => import('../../components/apps/termsandcondition/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('../../components/apps/privacypolicy/privacy.module').then(m=>m.EmailModule)
  },
  {
    path: 'all-restaurants',
    loadChildren: () => import('../../components/apps/restaurants/restaurants.module').then(m=>m.FileManagerModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('../../components/apps/settings/bookmarks.module').then(m => m.BookmarksModule)
  }
];
