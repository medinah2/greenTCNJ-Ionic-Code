import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialSpecsPageRoutingModule } from './material-specs-routing.module';

import { MaterialSpecsPage } from './material-specs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialSpecsPageRoutingModule
  ],
  declarations: [MaterialSpecsPage]
})
// export type Int = number & { __int__: void };
// export const roundToInt = (num: number): Int => Math.round(num) as Int;
export class MaterialSpecsPageModule {}
