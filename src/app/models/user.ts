import { Injectable } from '@angular/core';

@Injectable() export class User {
    // id: number;
    // first_name: string;
    // last_name: string;
    // email: string;
    // userType: string;

    constructor(public id: number, public email: string, public type: string, public first_name: string, public last_name: string){ }

    // addItem(user_id, user_email, user_type, user_fname, user_lname){
    //     this.user.push({
    //         id: user_id,
    //         first_name: user_fname,
    //         last_name: user_lname,
    //         email: user_email,
    //         type: user_type
    //     });
    // }

    removeUser(){
        this.id = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.type = null;
    }
}