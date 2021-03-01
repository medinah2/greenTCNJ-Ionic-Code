import { Component, OnInit, Renderer2 } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
// export class SettingsPage implements OnInit {
export class SettingsPage {

  public form = [
    { val: 'Recycling', isChecked: false },
    { val: 'Water Conservation', isChecked: false },
    { val: 'Pollution Prevention', isChecked: false },
    { val: 'Energy', isChecked: false }
  ];


  // this.storage.set('userRecyclingInterest', result["userInfo"]["recycling_interest"]);
  // this.storage.set('userWaterInterest', result["userInfo"]["water_interest"]);
  // this.storage.set('userPollutionInterest', result["userInfo"]["pollution_interest"]);
  // this.storage.set('userEnergyInterest', result["userInfo"]["energy_interest"]);

  constructor(private authService: AuthenticationService, private router: Router, private renderer: Renderer2, private storage: Storage) { 

    storage.get('userRecyclingInterest').then((val) => {
      console.log('Recycling Interest ', val);
      if(val == 0 || val == null){
        this.form[0].isChecked = false;
      }else{
        this.form[0].isChecked = true;
      }

    });

    storage.get('userWaterInterest').then((val) => {
      console.log('Water Interest ', val);
      if(val == 0 || val == null){
        this.form[1].isChecked = false;
      }else{
        this.form[1].isChecked = true;
      }

    });

    storage.get('userPollutionInterest').then((val) => {
      console.log('Pollution Interest ', val);

      if(val == 0 || val == null){
        this.form[2].isChecked = false;
      }else{
        this.form[2].isChecked = true;
      }

    });

    storage.get('userEnergyInterest').then((val) => {
      console.log('Energy Interest ', val);

      if(val == 0 || val == null){
        this.form[3].isChecked = false;
      }else{
        this.form[3].isChecked = true;
      }

    });

  }



  boxChecked(item){
    //check item.user and do stuff
    console.log(item.entry+ ' ' + item.detail.checked);
    console.log(item);
  }




  async logout() {
    // clears local storage 
    this.storage.clear();
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
