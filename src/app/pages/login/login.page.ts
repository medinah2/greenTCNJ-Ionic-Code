import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NavController } from '@ionic/angular'; 
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from '../../models/user';
import {  MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

// export class LoginPage implements OnInit {
export class LoginPage {
  
  emailInput: string = "";
  passwordInput: string = "";
  loginForm: FormGroup;
  myControl: FormControl;
  invalidLogin: boolean = false;
  pageLoaded: boolean = false;
  user: any;

  constructor(private  userService: UserService, private storage: Storage, public menuCtrl: MenuController, private alertController: AlertController, private authService: AuthenticationService, private router: Router, public http: HttpClient, public navCtrl: NavController, public formBuilder: FormBuilder, private loadingController: LoadingController) {
    this.loginForm = formBuilder.group({
        // Require validators for the input fields so we can quickly tell them if their input is valid, the patten string is what characters
        // are allowed in the field and for email it makes sure there is a @ character and a domain field like .com
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
    });
    this.menuCtrl.enable(false);
    this.user = this.userService;
    // this.testlogin();

    
  }

  

  // responsible for printing error messages to the screen based on validator 
  validation_messages = {
    'email': [
        { type: 'maxlength', message: 'Your email cannot be more than 30 characters long.' },
        { type: 'pattern', message: 'You must enter a valid email.' }
      ],
      'password': [
        { type: 'required', message: 'A password is required.' }
      ]
    }

  async login(){

    const loading = await this.loadingController.create();
    await loading.present();

    console.log("tryLogin");
    console.log(this.loginForm.value);
    
    if(!this.loginForm.valid){
      console.log("INVALID");

      this.authService.login(this.loginForm.value).subscribe(
        async (res) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Login failed',
            message: 'Please enter valid fields.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    }
    else{
      console.log("VALID");
     
      // Find a way to get email and password input from user
      var obj = {func: "try_login", email: this.loginForm.value['email'], password: this.loginForm.value['password']};
          
      this.http.post("http://recycle.hpc.tcnj.edu/php/users-handler.php", JSON.stringify(obj)).subscribe(data => {
      
          var result = data as any[];

          if(result["loginSuccess"]){
            this.invalidLogin = false;

            // {user_id: 2, user_email: "medinah2@tcnj.edu", 
            // user_first_name: "Heavenly", user_last_name: "Medina", 
            // user_type: "Student"}


            // this.nativeStorage.setItem('myuser', {userID: result["userInfo"]["user_id"], usremail: result["userInfo"]["user_email"] })
            
            /*
            this.nativeStorage.setItem('myuser', )
            .then(
              () => console.log('Stored item!'),
               error => console.error('Error storing item', error)
            );
*/
            

            // this is used to store user info within the app 
            this.storage.set('userID', result['userInfo']['user_id']); 
            this.storage.set('userName', result['userInfo']['user_first_name'] + ' ' + result['userInfo']['user_last_name']);
            this.storage.set('userType', result['userInfo']['user_type']);
            this.storage.set('userEmail', result["userInfo"]["user_email"]);

            // "recycling_interest", "water_interest", "pollution_interest", "energy_interest"
            this.storage.set('userRecyclingInterest', result["userInfo"]["recycling_interest"]);
            this.storage.set('userWaterInterest', result["userInfo"]["water_interest"]);
            this.storage.set('userPollutionInterest', result["userInfo"]["pollution_interest"]);
            this.storage.set('userEnergyInterest', result["userInfo"]["energy_interest"]);

            console.log("hello" + result["userInfo"]["recycling_interest"]);

            //this.storage.set('user', result["userInfo"]["user_first_name"] + result["userInfo"]["user_last_name"]);

            // output to user it succeeded and move to next page
            console.log("LOGIN SUCCESS");
            //console.log(result["userInfo"]["user_id"]);
            //console.log(result["userInfo"]);
            //this.user = new User(result["userInfo"]["user_id"], result["userInfo"]["user_email"], result["userInfo"]["user_type"], result["userInfo"]["user_first_name"], result["userInfo"]["user_last_name"] );
            //this.user.firstName = result["userInfo"]["user_first_name"];
            //this.user.lastName = result["userInfo"]["user_last_name"];
            //this.user.email = result["userInfo"]["user_email"];
            //this.user.type = result["userInfo"]["user_type"];
            //this.user.id = result["userInfo"]["user_id"];

            //console.log("testing " + this.user.fullName);


            //console.log(this.user.email);

            this.invalidLogin = false;
            this.navigateToHomePage();
            
            this.authService.login(this.loginForm.value).subscribe(
              async (res) => {
                await loading.dismiss();        
                this.invalidLogin = false;
                this.navigateToHomePage();
              },
              async (res) => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Login failed',
                  message: res.error.error,
                  buttons: ['OK'],
                });
         
                await alert.present();
              }
            );

            // if(!this.loginFailure){
            //   this.authService.login(this.loginForm.value).subscribe(
            //     async (res) => {
            //       await loading.dismiss();        
            //       this.invalidLogin = false;
            //       // this.navigateToHomePage();
            //       // if(this.navigateToHomePage()){
            //       //   loading.dismiss();
            //       //   console.log("hello?");
            //       // }
            //     }
            //   ); 
            //   // await loading.present();
            // }
            
          }
          else if(result["missingInputs"]){
            // output error message of missing inputs
            this.invalidLogin = true;
            console.log("Missing Input");
            
            this.authService.login(this.loginForm.value).subscribe(
              async (res) => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Login failed',
                  message: 'You are missing input.',
                  buttons: ['OK'],
                });
                await alert.present();
              }
            );

          }else{
            // dont move to next page and output error message "Email or password entered was incorrect"
            console.log("Email or password was incorrect");
            this.invalidLogin = true;
            console.log("huh?" + result[1] + result[1]);

            this.authService.login(this.loginForm.value).subscribe(
              async (res) => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Login failed',
                  message: 'Email or password entered was incorrect',
                  buttons: ['OK'],
                });
                await alert.present();
              }
            );
            
          }
      });
    }
     
  }


  // async login(){
  //   const loading = await this.loadingController.create();
  //   await loading.present();

  //   this.authService.login(this.loginForm.value).subscribe(
  //     async (res) => {
  //       await loading.dismiss();        
  //       this.invalidLogin = false;
  //       this.navigateToHomePage();
  //     },
  //     async (res) => {
  //       await loading.dismiss();
  //       const alert = await this.alertController.create({
  //         header: 'Login failed',
  //         message: res.error.error,
  //         buttons: ['OK'],
  //       });
 
  //       await alert.present();
  //     }
  //   );

  // }

 

navigateToHomePage() {
  // this.nativeStorage.setItem('myuser', {userStuff: this.user.first_name })
  // .then(
  //   () => console.log('Stored item!'),
  //   error => console.error('Error storing item', error)
  // );
  // console.log("what");
  // this.nativeStorage.getItem('myuser')
  // .then(
  // data => console.log("HELLOOOO" + data),
  // error => console.error(error)
  // );

  this.pageLoaded = true;
  this.menuCtrl.enable(true);
  this.router.navigateByUrl('/home', { replaceUrl: true });
}

 formInputIsRequired(formInput: string) {
  if (this.loginForm.controls[formInput]) {
    if (this.loginForm.controls[formInput].hasError('required')) {
      return true;
    }
  }
  return false;
}

loginFailure(){

  return this.invalidLogin;

}

}
