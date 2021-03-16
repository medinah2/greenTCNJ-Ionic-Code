import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HttpClient} from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-reportissue',
  templateUrl: './reportissue.page.html',
  styleUrls: ['./reportissue.page.scss'],
})
export class ReportissuePage implements OnInit {


  ngOnInit() {
  }
  emailInput: string = "";
  wordForm: FormGroup;
  myControl: FormControl;
  wordSent: boolean = false;
  today = new Date(Date.now());
  usrEmail;

  // firstName: new FormControl()

  constructor(private router: Router, public http: HttpClient, public formBuilder: FormBuilder, private storage: Storage) {
    this.wordForm = formBuilder.group({
        // Require validators for the input fields so we can quickly tell them if their input is valid, the patten string is what characters
        // are allowed in the field and for email it makes sure there is a @ character and a domain field like .com
        word: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(200), Validators.required])],
        description: ['']    
    });

    storage.get('userEmail').then((val) => {
      console.log('Your email is', val);
      this.usrEmail = val;
    });

  }


    // responsible for printing error messages to the screen based on validator 
    validation_messages = {
      'word': [
          { type: 'minlength', message: 'Your suggested material must be at least 2 characters long.' },
          { type: 'maxlength', message: 'Your suggested material must be less than 200 characters long.' },
          { type: 'required', message: 'You must enter a word to submit.' }
        ]
      }

  submitWord(){
    console.log("try submit");
    console.log(this.wordForm.value);

    if(!this.wordForm.valid){
      console.log("INVALID");
    } else {
      console.log("VALID");

      this.wordSent = true;

      // Find a way to get email and password input from user
      var obj = {func: "add_issue", userEmail: this.usrEmail, issueDescription: this.wordForm.value['word']};
    
      this.http.post("https://recycle.hpc.tcnj.edu/php/issues-handler.php", JSON.stringify(obj)).subscribe(data => {
      
          var result = data as any[];

          console.log(result);

          if(result['missingInput']){
            // output to user it succeeded and move to next page
            console.log("missing Input");
            this.wordSent = false;

          } else {
            this.wordSent = true;
            console.log("word submitted");
            this.wordForm.reset(); 
          }
      });

    }
  }

  wordFailure(){
    return this.wordSent;
  }

  formInputIsRequired(formInput: string) {
    if (this.wordForm.controls[formInput]) {
      if (this.wordForm.controls[formInput].hasError('required')) {
        return true;
      }
    }
    return false;
  }

}
