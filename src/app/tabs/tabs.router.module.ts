import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
      {
        path: '',
        component: TabsPage,
        children: [
            { path: '', redirectTo: 'post', pathMatch: 'full' },
            { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
            { path: 'post', loadChildren: '../post/post.module#PostPageModule' },
                 ]
      }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
