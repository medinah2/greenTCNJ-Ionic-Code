import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { EventModalPage } from '../event-modal/event-modal.page';
import { AnonymousSubject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-my-registered-events',
  templateUrl: './my-registered-events.page.html',
  styleUrls: ['./my-registered-events.page.scss'],
})
export class MyRegisteredEventsPage{

  eventList = [];
  myEvents = [];
  pastEvents = [];
  futureEvents = [];
  today = new Date(Date.now());
  gotAllEvents: any;
  type: string; // used to initialize tab to the view all page 

  constructor(private router: Router, private route: ActivatedRoute, public http: HttpClient,private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,private modalCtrl: ModalController) { 
      
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.eventList = this.router.getCurrentNavigation().extras.state.events;
          for(var i = 0; i < this.eventList.length; i++){
            this.registeredForEvent(i);
            //console.log("registered?  " + this.eventList[i].registered);
          }
          //console.log("Event List: " + this.eventList[0].title); // debug print statement
        }
    });

    this.type = "all";
  }


  registeredForEvent(num){
    
    if(this.eventList[num].registered){
      //console.log("registered: " + this.eventList[num].title);
      this.myEvents.push(this.eventList[num]);
    }else{
      //console.log("NOT registered: " + this.eventList[num].title);
    }

    if(num == (this.eventList.length - 1)){
      console.log("final registered length: " + this.myEvents.length);
      this.gotAllEvents = true;

      this.myEvents = this.myEvents.sort((a, b) => b.date - a.date);
      console.log(this.myEvents);
      
      this.getAllEvents();
      this.sortEvents();
      // this.getPastEvents();
    } 

  }

  getAllEvents(){
    for(var i = 0; i < this.myEvents.length; i++){
      console.log(this.myEvents[i].title);
    }

    return this.myEvents;
  }

  sortEvents(){

    for(var i = 0; i < this.myEvents.length; i++){
      // turns the event date into a date format
      var tempDate = new Date(this.myEvents[i].startTime);

      // for loop to show any events if they are scheduled for today
      if(tempDate > this.today){
        this.futureEvents.push(this.myEvents[i]);
      }else{
        console.log( tempDate.getMonth() + " " + this.today.getMonth());
        this.pastEvents.unshift(this.myEvents[i]);
      }
    }
    console.log("future length: " + this.futureEvents.length);
  }


  async onEventSelected(event) {

    let date = formatDate(event.startTime, 'MMM d, yyyy', this.locale);
    let start = formatDate(event.startTime, 'h:mma', this.locale);
    let end = formatDate(event.endTime, 'h:mma', this.locale);
    const modal = await this.modalCtrl.create({
      component: EventModalPage,
      componentProps:{
        eventObj: event,
        eventName: event.title,
        eventTime: date + '    '  + start + ' - ' + end,
        eventDescription: event.desc,
        eventID: event.ID,
        registered: event.registered
      }
    });
   
    await modal.present();

  }

}
