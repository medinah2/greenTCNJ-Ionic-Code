import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(public menuCtrl: MenuController) { 
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

}
