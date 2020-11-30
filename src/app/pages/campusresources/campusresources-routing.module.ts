import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampusresourcesPage } from './campusresources.page';

const routes: Routes = [
  {
    path: '',
    component: CampusresourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampusresourcesPageRoutingModule {}
