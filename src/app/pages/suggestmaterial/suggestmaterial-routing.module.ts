import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestmaterialPage } from './suggestmaterial.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestmaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestmaterialPageRoutingModule {}
