import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectinterestsPage } from './selectinterests.page';

const routes: Routes = [
  {
    path: '',
    component: SelectinterestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectinterestsPageRoutingModule {}
