import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggesteventPageRoutingModule } from './suggestevent-routing.module';

import { SuggesteventPage } from './suggestevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggesteventPageRoutingModule
  ],
  declarations: [SuggesteventPage]
})
export class SuggesteventPageModule {}
