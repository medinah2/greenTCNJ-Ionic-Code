import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialSpecsPage } from './material-specs.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialSpecsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// export type Int = number & { __int__: void };
// export const roundToInt = (num: number): Int => Math.round(num) as Int; 
export class MaterialSpecsPageRoutingModule {}
