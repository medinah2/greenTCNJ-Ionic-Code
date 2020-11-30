import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { EventModalPage } from '../event-modal/event-modal.page';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  eventSource = [];
  viewTitle: string;
  
  eventName: string;
  eventDate: Date;
  eventStartTime: Date;
  eventEndTime: Date;

  events: {name: any, date: any, start: any, end: any, desc: any}[] = [];

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private router: Router, public http: HttpClient,private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,private modalCtrl: ModalController) {

    // this.getAllMaterials();
    this.loadAllEvents();


}

  next(){
    this.myCal.slideNext();
  }

  back(){
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }


  loadAllEvents(){
    this.eventSource = this.loadEvents();
  }

  loadEvents(): any[] {

    var obj = {func: "get_all_events"};
    
    this.http.post("http://recycle.hpc.tcnj.edu/php/events-handler.php", JSON.stringify(obj)).subscribe(data => {
    
      var result = data as any[];

      console.log(result);

      let tempEvent = this.eventSource;

      for(var i = 0; i < result.length; i++){
        //console.log(result[i]["event_date"]);

        // turns the event date into a date format
        // var tempDate = new Date(result[i]["event_date"]);
        // var tempName = result[i]["userType"];
        // console.log("type: " + result[i]["allow_student"]);

        this.events.push({name: result[i]["event_name"], date: result[i]["event_date"], start: result[i]["start_time"], end: result[i]["end_time"], desc: result[i]["event_description"]});

        }

        this.createStaticNormalDayEvents();
        
    });
    return this.eventSource;
}


createStaticNormalDayEvents() {
  var event = [];
  for (var i = 0; i < this.events.length; i ++) {
      var date = new Date(this.events[i]["date"]);
      var name = this.events[i]["name"];
      var description = this.events[i]["desc"];

      var start = this.events[i]["start"].split(":", 2);

      var startHour = start[0];
      var startMinute = start[1];

      var end = this.events[i]["end"].split(":", 2);

      var endHour = end[0];
      var endMinute = end[1];

      var startTime;
      var endTime;

      startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 0, startHour, startMinute, 0);
      endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 0, endHour, endMinute, 0);
      event.push({
          title: name,
          startTime: startTime,
          endTime: endTime,
          desc: description,
          allDay: false
      });
  }
  console.log(event);
  this.eventSource = event;
  return event;
}

  // // Calendar event was clicked
  // async onEventSelected(event) {
  //   // Use Angular date pipe for conversion
  //   let start = formatDate(event.startTime, 'medium', this.locale);
  //   let end = formatDate(event.endTime, 'medium', this.locale);
 
  //   const alert = await this.alertCtrl.create({
  //     header: event.title,
  //     subHeader: event.desc,
  //     message: 'From: ' + start + '<br><br>To: ' + end,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    const modal = await this.modalCtrl.create({
      component: EventModalPage,      
      cssClass: 'event-modal',
      backdropDismiss: false,
      componentProps:{
        header: event.title,
        subHeader: event.desc,
        message: 'From: ' + start + '<br><br>To: ' + end
      }
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      // if (result.data && result.data.event) {
      //   let event = result.data.event;
      //   if (event.allDay) {
      //     let start = event.startTime;
      //     event.startTime = new Date(
      //       Date.UTC(
      //         start.getUTCFullYear(),
      //         start.getUTCMonth(),
      //         start.getUTCDate()
      //       )
      //     );
      //     event.endTime = new Date(
      //       Date.UTC(
      //         start.getUTCFullYear(),
      //         start.getUTCMonth(),
      //         start.getUTCDate() + 1
      //       )
      //     );
      //   }
      //   this.eventSource.push(result.data.event);
      //   this.myCal.loadEvents();
      // }
    });
  }

  // https://github.com/twinssbc/Ionic2-Calendar/blob/v6/demo/pages/home.ts

}
