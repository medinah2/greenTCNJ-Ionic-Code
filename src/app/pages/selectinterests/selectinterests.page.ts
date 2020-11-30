import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';


@Component({
  selector: 'app-selectinterests',
  templateUrl: './selectinterests.page.html',
  styleUrls: ['./selectinterests.page.scss'],
})
export class SelectinterestsPage{


  // thses are currently not being stored anywhere they are just in place to select after registration, will connect to db next semester 
  public form = [
    { val: 'Recycling', isChecked: false },
    { val: 'Water Conservation', isChecked: false },
    { val: 'Pollution Prevention', isChecked: false },
    { val: 'Energy', isChecked: false }
  ];

  constructor(public menuCtrl: MenuController, private router: Router) {
    this.menuCtrl.enable(false);
  }


}
