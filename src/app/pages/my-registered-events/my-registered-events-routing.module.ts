import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRegisteredEventsPage } from './my-registered-events.page';

const routes: Routes = [
  {
    path: '',
    component: MyRegisteredEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRegisteredEventsPageRoutingModule {}
