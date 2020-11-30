import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../models/user';
import {  MenuController } from '@ionic/angular';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;

  today = new Date(Date.now());
  events: {name: any, description: any, date: any}[] = [];
  // event_date, event_description, event_date

  constructor(private userService: UserService, public menuCtrl: MenuController, private router: Router, public http: HttpClient) {
    this.loadMyEvents();
    this.menuCtrl.enable(true);
    this.user = this.userService;
  }

  loadMyEvents() {
  
    var userType = "Student";
    //console.log(this.user.firstName);

    var obj = {func: "get_my_events", userType: userType};
    
    this.http.post("http://recycle.hpc.tcnj.edu/php/events-handler.php", JSON.stringify(obj)).subscribe(data => {
    
        var result = data as any[];
        
        //console.log(this.today.getHours()+ ":" + this.today.getMinutes()+":"+this.today.getSeconds());
        // var testDate = new Date();
        for(var i = 0; i < result.length; i++){
          console.log(result[i]["event_name"]);

          // turns the event date into a date format
          var tempDate = new Date(result[i]["event_date"]);

          // debug statements to see date format
          console.log((tempDate.getMonth()+1) +"-"+ tempDate.getDate()+"-"+tempDate.getFullYear());
          //console.log((this.today.getMonth()+1) +"-"+ this.today.getDate()+"-"+this.today.getFullYear());

          // for loop to show any events if they are scheduled for today
          if((tempDate.getMonth()+1) == (this.today.getMonth()+1) && (tempDate.getDate() == this.today.getDate()) && (tempDate.getFullYear() == this.today.getFullYear())){
            this.events.push({name: result[i]["event_name"], description: result[i]["event_description"], date: result[i]["event_date"] });
          }
        }
        console.log(this.events.length);
        if(this.events.length == 0){
          this.events.push({name: "No events listed for you today.", description: " ", date: " " });
        }
        //this.searchResults = this.materials;
    });

}


  // simple function to link search bar to next page when clicked 
  onClick(ev: any){
    console.log("Ev: " + ev);
    this.router.navigate(['/whatgoeswhere']);
  }

}
