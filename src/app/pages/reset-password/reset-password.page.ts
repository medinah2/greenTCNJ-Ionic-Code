import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient} from '@angular/common/http';
import { NavController } from '@ionic/angular'; 
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { CustomValidationService } from 'src/app/services/custom-validation.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage{

  passwordInput: string = "";
  passwordConfirmInput: string = "";
  resetForm: FormGroup;
  myControl: FormControl;

  constructor(public http: HttpClient, public navCtrl: NavController, public formBuilder: FormBuilder, private customValidator: CustomValidationService, private platform: Platform) {
    this.resetForm = formBuilder.group({
        password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        passwordRepeat: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
    }, {validator: this.customValidator.passwordMatchValidator('password', 'passwordRepeat')}  );      

  }

  // responsible for printing error messages to the screen based on validator 
  validation_messages = {
      'password': [
        { type: 'required', message: 'A password is required.' }
      ],
      'passwordRepeat': [
        { type: 'required', message: 'A password is required.' }
      ]
    }


  validatePasswordReset(){
    console.log("try signup");
    console.log(this.resetForm.value);

    // Get the unique selector (basically username) and validator (basically encrypted password) for the password reset that was concatenated 
    // with the password reset URL in the link sent to the user's email
    var selector = this.platform.getQueryParam('selector');
    var validator = this.platform.getQueryParam('validator');

    console.log("Selector: " + selector);
    console.log("Validator: " + validator);

    if(!this.resetForm.valid){
      console.log("INVALID");
    } else {
      console.log("VALID");

      // Find a way to get email and password input from user
      var obj = {func: "verify_reset", password: this.resetForm.value['password'], passwordRepeat: this.resetForm.value['passwordRepeat'], 
      selector: selector, validator: validator};
    
      this.http.post("https://recycle.hpc.tcnj.edu/php/password-resets-handler.php", JSON.stringify(obj)).subscribe(data => {
      
          var result = data as any[];

          if(result['missingInput']){
            // output to user it succeeded and move to next page
            console.log("missing Input");
            // console.log("LOGIN SUCCESS");
            // // this.navigateToHomePage();
          } else {
            // dont move to next page and output error message "Email or password entered was incorrect"
            console.log("email sent");
          }
      });
    }
  }


}
