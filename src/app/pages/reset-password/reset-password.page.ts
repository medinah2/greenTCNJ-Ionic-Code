import { Component, OnInit } from '@angular/core';
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

  emailInput: string = "";
  passwordInput: string = "";
  passwordConfirmInput: string = "";
  resetForm: FormGroup;
  myControl: FormControl;

  constructor(public http: HttpClient, public navCtrl: NavController, public formBuilder: FormBuilder, private customValidator: CustomValidationService) {
    this.resetForm = formBuilder.group({
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        passwordRepeat: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
    }, {validator: this.customValidator.passwordMatchValidator('password', 'passwordRepeat')}  );      
  }

  // responsible for printing error messages to the screen based on validator 
  validation_messages = {
    'email': [
        { type: 'maxlength', message: 'Your email cannot be more than 30 characters long.' },
        { type: 'pattern', message: 'You must enter a valid email.' }
      ],
      'password': [
        { type: 'required', message: 'A password is required.' }
      ],
      'passwordRepeat': [
        { type: 'required', message: 'A password is required.' }
      ]
    }

  // generate_password_reset
  checkEmail(){
    console.log("try signup");
    console.log(this.resetForm.value);

    if(!this.resetForm.valid){
      console.log("INVALID");
    } else {
      console.log("VALID");

      // Find a way to get email and password input from user
      var obj = {func: "verify_reset", email: this.resetForm.value['email']};
    
      this.http.post("http://recycle.hpc.tcnj.edu/php/password-resets-handler.php", JSON.stringify(obj)).subscribe(data => {
      
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
