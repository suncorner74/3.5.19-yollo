import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/_helpers/customValidator';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserService } from 'src/app/services/user.service';

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
  submitted: boolean;
  getUpdateSubscription: any;
  userDetetails = null;
  uploadedFiles: any[] = [];
  value: Date;
  loggedInUser: {};
  userid = null;

  constructor(private formBuilder: FormBuilder, private customValidator: CustomValidator,
    private userProfile: UserProfileService,
    private userService: UserService
  ) {
    this.loggedInUser = {
      name: ""
    }
  }

  ngOnInit() {
    // this.loggedInUser = this.userService.getLoggedInUser();
    this.getUserDetails().then((data) => {
      console.log(data);
    });
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, this.customValidator.alphaNumericValidator]],
      email: ['', [Validators.required, this.customValidator.emailValidator]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), this.customValidator.numericValidator]],
      pancard: ['', [Validators.required, this.customValidator.panValidator]],
      dateOfBirth: ['', Validators.required],
      userType: ['', Validators.required],
      gender: ['', Validators.required],
      salryType: [''],
      businesstype: [''],
      gst: [''],
      reg: [''],
      firmName: ['']
    });
  }
  get f() { return this.profileForm.controls; }

  salryType(event) {
    this.salaryType = true;
    this.buisnessCheck = false;
    this.profileForm.controls['salryType'].setValidators([Validators.required]);
    this.profileForm.get('salryType').updateValueAndValidity();
    this.profileForm.get('businesstype').clearValidators();
    this.profileForm.get('gst').clearValidators();
    this.profileForm.get('reg').clearValidators();
    this.profileForm.get('firmName').clearValidators();
  }

  buisnessType($event) {
    this.salaryType = false;
    this.buisnessCheck = true;
    this.profileForm.controls['businesstype'].setValidators([Validators.required]);
    this.profileForm.get('businesstype').updateValueAndValidity();
    this.profileForm.controls['gst'].setValidators([Validators.required]);
    this.profileForm.get('gst').updateValueAndValidity();
    this.profileForm.controls['reg'].setValidators([Validators.required]);
    this.profileForm.get('reg').updateValueAndValidity();
    this.profileForm.controls['firmName'].setValidators([Validators.required]);
    this.profileForm.get('firmName').updateValueAndValidity();
    this.profileForm.get('businesstype').clearValidators();
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    this.getUpdateSubscription = this.userProfile.update(this.profileForm.value, this.userid)
      .subscribe((resp) => {
        this.userDetetails = this.profileForm.value;
        alert('updated');
      }, (error) => {
        console.log(`error: ${error}`);
      });
  }

  hideDetail() {
    this.salaryType = false;
    this.buisnessCheck = false;
    this.profileForm.get('businesstype').clearValidators();
    this.profileForm.get('gst').clearValidators();
    this.profileForm.get('reg').clearValidators();
    this.profileForm.get('firmName').clearValidators();
    this.profileForm.get('businesstype').clearValidators();
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  getUserDetails() {
    return new Promise((resolve, reject) => {
      this.userid = sessionStorage.getItem('_@ux_');
      if (this.userid) {
        this.userProfile.getUser(this.userid).subscribe((data) => {
          this.loggedInUser = Object.assign({}, data);
          resolve(data);
        }, (error) => {
          console.log(error);
          reject(error);
        })
      }
    })
  }
}
