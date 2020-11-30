import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggesteventPage } from './suggestevent.page';

const routes: Routes = [
  {
    path: '',
    component: SuggesteventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggesteventPageRoutingModule {}
