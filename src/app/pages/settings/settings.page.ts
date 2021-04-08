import { Component, OnInit, Renderer2 } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router, NavigationExtras  } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';

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

  userID: any;
  recycling: any;
  water: any;
  pollution: any;
  energy: any;

  buttonDisabled: any;

  // this.storage.set('userRecyclingInterest', result["userInfo"]["recycling_interest"]);
  // this.storage.set('userWaterInterest', result["userInfo"]["water_interest"]);
  // this.storage.set('userPollutionInterest', result["userInfo"]["pollution_interest"]);
  // this.storage.set('userEnergyInterest', result["userInfo"]["energy_interest"]);

  constructor(private authService: AuthenticationService, private router: Router, private renderer: Renderer2, private storage: Storage, public http: HttpClient) { 

    storage.get('userID').then((val) => {
      this.userID = val;
    });

    this.buttonDisabled = true;
    this.loadInterests();
    console.log(this.buttonDisabled);
  }

  loadInterests(){
    
    this.storage.get('userRecyclingInterest').then((val) => {
      this.recycling = val;

      console.log('Recycling Interest ', val);
      if(val == 0 || val == null){
        this.form[0].isChecked = false;
      }else{
        this.form[0].isChecked = true;
      }
    });

    this.storage.get('userWaterInterest').then((val) => {
      this.water = val;

      console.log('Water Interest ', val);
      if(val == 0 || val == null){
        this.form[1].isChecked = false;
      }else{
        this.form[1].isChecked = true;
      }
    });

    this.storage.get('userPollutionInterest').then((val) => {
      this.pollution = val;

      console.log('Pollution Interest ', val);

      if(val == 0 || val == null){
        this.form[2].isChecked = false;
      }else{
        this.form[2].isChecked = true;
      }
    });

    this.storage.get('userEnergyInterest').then((val) => {
      this.energy = val;

      console.log('Energy Interest ', val);

      if(val == 0 || val == null){
        this.form[3].isChecked = false;
      }else{
        this.form[3].isChecked = true;
      }
    });

    this.buttonDisabled = true;
  }

  boxChecked(item){
    //check item.user and do stuff
    // enables update user interests if a box has been altered
    this.buttonDisabled = false;
  }

  updateUserInterests(){

    if(this.form[0].isChecked){
      this.recycling = 1;
    }else{
      
      this.recycling = 0;
    }

    if(this.form[1].isChecked){
      this.water = 1;
    }else{
      console.log(this.water);
      this.water = 0;
    }

    if(this.form[2].isChecked){
      this.pollution = 1;
    }else{
      this.pollution = 0;
    }

    if(this.form[3].isChecked){
      this.energy = 1;
    }else{
      this.energy = 0;
    }

    console.log(this.userID + " " + this.recycling + " " + this.water + " " + this.pollution + " " + this.energy);

   var obj = {func: "edit_user_interests", userID: this.userID, recyclingInterest: this.recycling, waterInterest: this.water, pollutionInterest: this.pollution, energyInterest: this.energy};

    this.http.post("https://recycle.hpc.tcnj.edu/php/users-handler.php", JSON.stringify(obj)).subscribe(data => {
    
        var result = data as any[];

        console.log(result);

        if(result['missingInput']){
          // output to user it succeeded and move to next page
          console.log("missing Input");

        } else {
          
          console.log("interests updated");
            this.storage.set('userRecyclingInterest', this.recycling);
            this.storage.set('userWaterInterest', this.water);
            this.storage.set('userPollutionInterest', this.pollution);
            this.storage.set('userEnergyInterest', this.energy);
            this.buttonDisabled = true;

        }
    });

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
