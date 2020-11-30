import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordEmailSentPage } from './reset-password-email-sent.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordEmailSentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordEmailSentPageRoutingModule {}
