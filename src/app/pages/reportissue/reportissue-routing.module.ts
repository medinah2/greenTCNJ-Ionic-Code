import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportissuePage } from './reportissue.page';

const routes: Routes = [
  {
    path: '',
    component: ReportissuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportissuePageRoutingModule {}
