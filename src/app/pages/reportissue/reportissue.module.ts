import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportissuePageRoutingModule } from './reportissue-routing.module';

import { ReportissuePage } from './reportissue.page';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    ReportissuePageRoutingModule
  ],
  declarations: [ReportissuePage]
})
export class ReportissuePageModule {}
