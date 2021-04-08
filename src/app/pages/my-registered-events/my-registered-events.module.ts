import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventModalPageModule } from '../event-modal/event-modal.module';
import { IonicModule } from '@ionic/angular';

import { MyRegisteredEventsPageRoutingModule } from './my-registered-events-routing.module';

import { MyRegisteredEventsPage } from './my-registered-events.page';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //EventModalPageModule,
    IonicStorageModule.forRoot(),
    MyRegisteredEventsPageRoutingModule
  ],
  declarations: [MyRegisteredEventsPage]
})
export class MyRegisteredEventsPageModule {}
