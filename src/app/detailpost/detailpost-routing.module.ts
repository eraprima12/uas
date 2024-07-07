import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailpostPage } from './detailpost.page';

const routes: Routes = [
  {
    path: '',
    component: DetailpostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailpostPageRoutingModule {}
