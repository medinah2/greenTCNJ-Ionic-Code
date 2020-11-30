import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import {  MenuController } from '@ionic/angular';

const { Storage } = Plugins;


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides)slides: IonSlides;
 
  constructor(public menuCtrl: MenuController, private router: Router) {
    this.menuCtrl.enable(false);
   }
 
  ngOnInit() {
  }
 
  next() {
    this.slides.slideNext();
  }
 
  async start() {
    await Storage.set({key: INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('/start', { replaceUrl:true });
  }

}
