import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dateValue: any;
  selectedValues: string[] = ['basic', 'captialgain', 'foreignincome'];
  profileForm: FormGroup;
  salaryType = false;
  buisnessCheck = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      pancard: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      userType: ['', Validators.required],
      salryType:[''],
      businesstype:[''],
      gst:[''],
      reg:['']
    });
  }

  salryType(event) {
    this.salaryType = true;
    this.buisnessCheck = false;
  }

  buisnessType($event) {
    this.salaryType = false;
    this.buisnessCheck = true;
  }
  onSubmit(){

  }

}
