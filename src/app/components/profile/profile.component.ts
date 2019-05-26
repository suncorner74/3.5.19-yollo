import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dateValue:any;
  selectedValues: string[] = ['basic','captialgain','foreignincome'];
  selectedbuisnessValues:string[] = ['smallBusiness','mediumBusinsess','largeBusinsess'];
  constructor() { }

  ngOnInit() {
  }

}
