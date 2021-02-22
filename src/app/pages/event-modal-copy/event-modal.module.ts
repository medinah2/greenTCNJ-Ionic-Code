import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventModalPageRoutingModule } from './event-modal-routing.module';

import { EventModalPage } from './event-modal.page';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    EventModalPageRoutingModule
  ],
  declarations: [EventModalPage]
})
export class EventModalPageModule {}
