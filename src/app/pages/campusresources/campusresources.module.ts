import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampusresourcesPageRoutingModule } from './campusresources-routing.module';

import { CampusresourcesPage } from './campusresources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampusresourcesPageRoutingModule
  ],
  declarations: [CampusresourcesPage]
})
export class CampusresourcesPageModule {}
