import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  id: any;
  constructor(public navCtrl: NavController) {}
  createUser() {
    console.log(this.id);
  }

}
