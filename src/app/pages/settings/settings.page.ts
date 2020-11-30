import { Component, OnInit, Renderer2 } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
// export class SettingsPage implements OnInit {
export class SettingsPage {

  constructor(private authService: AuthenticationService, private router: Router, private renderer: Renderer2) { }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  onClick(event){
    // let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    // systemDark.addListener(this.colorTest);
    console.log(event.detail.checked);
    if(event.detail.checked){
      //document.body.setAttribute('color-theme', 'dark');
      console.log("dark mode");
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    }
    else{
      console.log("light mode");
      //document.body.setAttribute('color-theme', 'light');
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  //  colorTest(systemInitiatedDark) {
  //   if (systemInitiatedDark.matches) {
  //     document.body.setAttribute('data-theme', 'dark');		
  //   } else {
  //     document.body.setAttribute('data-theme', 'light');
  //   }
  // }  

  

}
