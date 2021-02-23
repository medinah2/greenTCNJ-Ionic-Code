import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { NavController } from '@ionic/angular'; 
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, NavigationExtras } from '@angular/router';




@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
})
export class NewsModalPage implements AfterViewInit {
  viewTitle: string;
  
  modalReady = false;
  
  // eventObj;
  // eventID;
  // eventName;
  // eventTime;
  // eventDescription;
  // registered;

  newsObj;
  newsID;
  newsTitle;
  newsAuthor;
  newsDescription;
  newsDatePublished;

  constructor(private modalCtrl: ModalController, private router: Router, public http: HttpClient, public navCtrl: NavController) { 

  }

  ngAfterViewInit() {
    
    // if(this.registered == true){
      
    // }
    setTimeout(() => {
      this.modalReady = true;   
    }, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }



}
