import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchpostsPage } from './searchposts.page';

const routes: Routes = [
  {
    path: '',
    component: SearchpostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchpostsPageRoutingModule {}
