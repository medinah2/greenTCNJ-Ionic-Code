import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestmaterialPageRoutingModule } from './suggestmaterial-routing.module';

import { SuggestmaterialPage } from './suggestmaterial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SuggestmaterialPageRoutingModule
  ],
  declarations: [SuggestmaterialPage]
})
export class SuggestmaterialPageModule {}
