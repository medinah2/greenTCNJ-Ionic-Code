import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'whatgoeswhere',
    loadChildren: () => import('./pages/whatgoeswhere/whatgoeswhere.module').then( m => m.WhatgoeswherePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'reportissue',
    loadChildren: () => import('./pages/reportissue/reportissue.module').then( m => m.ReportissuePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'campusresources',
    loadChildren: () => import('./pages/campusresources/campusresources.module').then( m => m.CampusresourcesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'event-modal',
    loadChildren: () => import('./pages/event-modal/event-modal.module').then( m => m.EventModalPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule),
    canLoad: [IntroGuard, AutoLoginGuard]
  },
  {
    path: 'material-specs',
    loadChildren: () => import('./pages/material-specs/material-specs.module').then( m => m.MaterialSpecsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'reset-password-email-sent',
    loadChildren: () => import('./pages/reset-password-email-sent/reset-password-email-sent.module').then( m => m.ResetPasswordEmailSentPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'selectinterests',
    loadChildren: () => import('./pages/selectinterests/selectinterests.module').then( m => m.SelectinterestsPageModule)
  },
  {
    path: 'suggestmaterial',
    loadChildren: () => import('./pages/suggestmaterial/suggestmaterial.module').then( m => m.SuggestmaterialPageModule)
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./pages/qr-scanner/qr-scanner.module').then( m => m.QrScannerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
