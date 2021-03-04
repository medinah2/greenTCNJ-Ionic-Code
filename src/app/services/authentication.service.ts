import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
 
const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '12345';
 
  constructor(private http: HttpClient) {
    this.loadToken();
  }
 
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
 
  public login(credentials: {email, password}): Observable<any> {
    var obj = {func: "try_login", email: credentials.email, password: credentials.password};
    return this.http.post("https://recycle.hpc.tcnj.edu/php/users-handler.php", JSON.stringify(obj)).pipe(
    // token =   data["userInfo"]["user_id"]
    map((data: any) => data.token),

      switchMap(token => {
        return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
        
      })
    )
  }

  // public userInfo(email){
  //   var obj = {func: "get_user", email: email};
  //   this.http.post("https://recycle.hpc.tcnj.edu/php/users-handler.php", JSON.stringify(obj)).subscribe(data => {
  //     var result = data as any[];

  //   }
  // }
 
  public logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
