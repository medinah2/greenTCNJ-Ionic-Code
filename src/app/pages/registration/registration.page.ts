import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpClient} from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { CustomValidationService } from 'src/app/services/custom-validation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  signupForm: FormGroup;
  myControl: FormControl;
  invalidRegistration: boolean = false;

  constructor(private router: Router, public http: HttpClient, public formBuilder: FormBuilder, private customValidator: CustomValidationService) {
    this.signupForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required])],
        // https://stackoverflow.com/questions/48350506/how-to-validate-password-strength-with-angular-5-validator-pattern
        password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(8),Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'), Validators.required])],
        passwordRepeat: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        userType: ['', Validators.compose([Validators.required])]
    }, {validator: this.customValidator.passwordMatchValidator('password', 'passwordRepeat')} );
  }

  // responsible for printing error messages to the screen based on validator 
  validation_messages = {
    'firstName':[
      { type: 'maxlength', message: 'Your first name cannot be more than 30 characters long.'},
      { type: 'required', message: 'A first name is required.' },
      { type: 'pattern', message: 'You must enter a valid first name' }
    ],
    'lastName':[
      { type: 'maxlength', message: 'Your last name cannot be more than 30 characters long.'},
      { type: 'required', message: 'A last name is required.' },
      { type: 'pattern', message: 'You must enter a valid last name' }
    ],
    'email': [
        { type: 'maxlength', message: 'Your email cannot be more than 30 characters long.' },
        { type: 'required', message: 'An email is required.' },
        { type: 'pattern', message: 'You must enter a valid email.' }
      ],
      'password': [
        { type: 'minlength', message: 'Your password must be at least 8 characters long.'},
        { type: 'pattern', message: 'Your password must include 1 uppercase letter, 1 lowercase letter, and one number' },
        { type: 'maxlength', message: 'Your last name cannot be more than 30 characters long.'},
        { type: 'required', message: 'A password is required.' }
      ],
      'passwordRepeat': [
        //{ type: 'required', message: 'A password is required.' }
      ],
      'userType': [
        { type: 'required', message: 'A user type is required.' }
      ]
    }

  trySignup(){

    console.log("try signup");
    console.log(this.signupForm.value);

    if(!this.signupForm.valid){
      console.log("INVALID");
      
    }
    else{
      console.log("VALID");

      var email = this.signupForm.value['email'];
      var pwd = this.signupForm.value['password'];
      var pwdRepeat = this.signupForm.value['passwordRepeat'];
      var first = this.signupForm.value['firstName'];
      var last = this.signupForm.value['lastName']; 
      var type = this.signupForm.value['userType'];
  
      var obj = {func: "sign_up", email: email, password: pwd, passwordRepeat: pwdRepeat, firstName: first, lastName: last, userType: type};
          
      this.http.post("http://recycle.hpc.tcnj.edu/php/users-handler.php", JSON.stringify(obj)).subscribe(data => {
      
          var result = data as any[];
  
          if(result["signupSuccess"]){
            // output to user it succeeded and move to next page
            console.log("Signup SUCCESS");
            this.invalidRegistration = false;
            this.navigateToLogin();
          }
          else if(result["missingInputs"]){
            // output error message of missing inputs
            console.log("Missing Input");
            this.invalidRegistration = true;
          }
          else if(result["passwordMismatch"]){
            console.log("passwords didnt match");
            this.invalidRegistration = true;
          }
          else{
            // dont move to next page and output error message "Email or password entered was incorrect"
            console.log("Signup failure on server");
            this.invalidRegistration = true;
          }
      });
      

    }
    
  }

  navigateToLogin() {
    this.router.navigateByUrl('/selectinterests');
 }

 registrationFailure(){

  return this.invalidRegistration;

}

formInputIsRequired(formInput: string) {
  if (this.signupForm.controls[formInput]) {
    if (this.signupForm.controls[formInput].hasError('required')) {
      return true;
    }
  }
  return false;
}

}
