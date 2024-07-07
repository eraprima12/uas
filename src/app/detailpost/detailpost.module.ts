import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailpostPageRoutingModule } from './detailpost-routing.module';

import { DetailpostPage } from './detailpost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailpostPageRoutingModule
  ],
  declarations: [DetailpostPage]
})
export class DetailpostPageModule {}
