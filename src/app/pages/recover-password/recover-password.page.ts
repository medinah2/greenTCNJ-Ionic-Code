import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpClient} from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage{
  emailInput: string = "";
  emailForm: FormGroup;
  myControl: FormControl;
  emailSent: boolean = false;

  // firstName: new FormControl()

  constructor(private router: Router, public http: HttpClient, public formBuilder: FormBuilder) {
    this.emailForm = formBuilder.group({
        // Require validators for the input fields so we can quickly tell them if their input is valid, the patten string is what characters
        // are allowed in the field and for email it makes sure there is a @ character and a domain field like .com
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required])],
    });
  }


    // responsible for printing error messages to the screen based on validator 
    validation_messages = {
      'email': [
          { type: 'maxlength', message: 'Your email cannot be more than 30 characters long.' },
          { type: 'pattern', message: 'You must enter a valid email.' }
        ]
      }
// If an account with that email exists and password reset link will be sent


// generate_password_reset
  checkEmail(){
    console.log("try signup");
    console.log(this.emailForm.value);

    if(!this.emailForm.valid){
      console.log("INVALID");
    } else {
      console.log("VALID");

      // Find a way to get email and password input from user
      var obj = {func: "generate_reset", email: this.emailForm.value['email'], isMobileRequest: true};
    
      this.http.post("https://recycle.hpc.tcnj.edu/php/password-resets-handler.php", JSON.stringify(obj)).subscribe(data => {
      
          var result = data as any[];

          if(result['missingInput']){
            // output to user it succeeded and move to next page
            console.log("missing Input");
            this.emailSent = false;

          } else {
            this.emailSent = true;
            console.log("email sent");
          }
      });
    }
  }

  emailFailure(){

    return this.emailSent;
  
  }

}
