import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { HttpClient} from '@angular/common/http';
import { NavController } from '@ionic/angular'; 
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
})
export class EventModalPage implements AfterViewInit {

  viewTitle: string;
  
 
  modalReady = false;

  header;
  subHeader;
  message;

  emailInput: string = "";
  emailForm: FormGroup;
  myControl: FormControl;
  invalidLogin: boolean = false;

  constructor(private modalCtrl: ModalController, private router: Router, public http: HttpClient, public navCtrl: NavController, public formBuilder: FormBuilder) { 
    this.emailForm = formBuilder.group({
      // Require validators for the input fields so we can quickly tell them if their input is valid, the patten string is what characters
      // are allowed in the field and for email it makes sure there is a @ character and a domain field like .com
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required])]
  });
  }

    // responsible for printing error messages to the screen based on validator 
    validation_messages = {
      'email': [
          { type: 'maxlength', message: 'Your email cannot be more than 30 characters long.' },
          { type: 'pattern', message: 'You must enter a valid email.' }
        ]
      }
 
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;   
    }, 0);
  }
 
  checkCredientals(){
    console.log("tryLogin");
    console.log(this.emailForm.value);
    
    if(!this.emailForm.valid){
      console.log("INVALID");
    }else{
      console.log("VALID");

      // here we would check to see if the user entered info matches the user info stored in the app
     
      // // Find a way to get email and password input from user
      // var obj = {func: "try_login", email: this.emailForm.value['email'], password: this.emailForm.value['password']};
          
      // this.http.post("https://recycle.hpc.tcnj.edu/php/users-handler.php", JSON.stringify(obj)).subscribe(data => {
      
      //     var result = data as any[];

      //     if(result["loginSuccess"]){
      //       // output to user it succeeded and move to next page
      //       console.log("LOGIN SUCCESS");
      //       this.invalidLogin = false;

      //     }
      //     else if(result["missingInputs"]){
      //       // output error message of missing inputs
      //       this.invalidLogin = true;
      //       console.log("Missing Input");
      //     }else{
      //       // dont move to next page and output error message "Email or password entered was incorrect"
      //       console.log("Login failure on server");
      //       this.invalidLogin = true;
      //       console.log("huh?" + result[1] + result[1]);
      //     }
      // });
    }

  }


  formInputIsRequired(formInput: string) {
    if (this.emailForm.controls[formInput]) {
      if (this.emailForm.controls[formInput].hasError('required')) {
        return true;
      }
    }
    return false;
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
}
