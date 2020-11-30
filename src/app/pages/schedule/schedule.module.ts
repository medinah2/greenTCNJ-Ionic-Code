import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { EventModalPageModule } from '../event-modal/event-modal.module';

import { SchedulePage } from './schedule.page';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
registerLocaleData(localeEn);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    NgCalendarModule,
    EventModalPageModule
  ],
  declarations: [SchedulePage],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-EN'}
  ]
})
export class SchedulePageModule {}
