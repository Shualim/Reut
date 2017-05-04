import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class AboutPage {
  id: any;
  constructor(public navCtrl: NavController) {}
  createUser() {
    console.log(this.id);
  }

}
