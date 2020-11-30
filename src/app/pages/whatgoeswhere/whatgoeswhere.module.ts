import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatgoeswherePageRoutingModule } from './whatgoeswhere-routing.module';

import { WhatgoeswherePage } from './whatgoeswhere.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatgoeswherePageRoutingModule,
    FormsModule
  ],
  declarations: [WhatgoeswherePage]
})
export class WhatgoeswherePageModule {}
