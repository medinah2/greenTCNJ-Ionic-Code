import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectinterestsPageRoutingModule } from './selectinterests-routing.module';

import { SelectinterestsPage } from './selectinterests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectinterestsPageRoutingModule
  ],
  declarations: [SelectinterestsPage]
})
export class SelectinterestsPageModule {}
