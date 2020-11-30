import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordEmailSentPageRoutingModule } from './reset-password-email-sent-routing.module';

import { ResetPasswordEmailSentPage } from './reset-password-email-sent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordEmailSentPageRoutingModule
  ],
  declarations: [ResetPasswordEmailSentPage]
})
export class ResetPasswordEmailSentPageModule {}
