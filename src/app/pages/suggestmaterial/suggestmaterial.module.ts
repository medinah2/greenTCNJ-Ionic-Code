import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestmaterialPageRoutingModule } from './suggestmaterial-routing.module';

import { SuggestmaterialPage } from './suggestmaterial.page';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    SuggestmaterialPageRoutingModule
  ],
  declarations: [SuggestmaterialPage]
})
export class SuggestmaterialPageModule {}
