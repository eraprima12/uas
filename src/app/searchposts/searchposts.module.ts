import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchpostsPageRoutingModule } from './searchposts-routing.module';

import { SearchpostsPage } from './searchposts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchpostsPageRoutingModule
  ],
  declarations: [SearchpostsPage]
})
export class SearchpostsPageModule {}
