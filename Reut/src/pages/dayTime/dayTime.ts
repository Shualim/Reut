import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-dayTime',
  templateUrl: 'dayTime.html'
})
export class ContactPage {
  items: any;
  constructor(public navCtrl: NavController) {
    this.items=['1','2','3','4'];
  }
}
