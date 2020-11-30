import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private f_name: string;
  private l_name: string;
  private full_name: string;
  private _email: string;
  private _type: string;
  private _id: number;

  get firstName() {
    return this.f_name;
  }

  set firstName(name: string) {
    this.f_name = name;
  }

  get lastName() {
    return this.l_name;
  }

  set lastName(name: string) {
    this.l_name = name;
  }

  get fullName() {
    this.full_name = this.f_name + this.l_name;
    return this.full_name;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get type() {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }

  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

}
