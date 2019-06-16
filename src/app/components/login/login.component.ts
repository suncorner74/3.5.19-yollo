import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { InputTextModule } from 'primeng/inputtext';
import { MustMatch } from './../../_helpers/must-match.validator';
import { CustomValidator } from '../../_helpers/customValidator';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { DataShareService } from 'src/app/_helpers/data-share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  display: boolean = true;
  getLoginSubscription = null;
  userDetetails = null;
  loginForm: FormGroup;
  contactUsForm: FormGroup;
  submitted = null;
  invalid = false;
  emailOrNot: boolean;
  otherLoginIssue = null;
  msgs: Message[] = [];

  constructor(
    private userService: UserService,
    public messageService: MessageService,
    public ValidatorService: CustomValidator,
    private fb: FormBuilder,
    public customValidator: CustomValidator,
    private router: Router,
    private dataShareService: DataShareService) {
    this.userDetetails = null;
    this.otherLoginIssue = true;
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      emailOrmobile: ['', [Validators.required, this.customValidator.phoneNumberAndEmail]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.contactUsForm = this.fb.group({
      email: ['', [Validators.required, this.customValidator.emailValidator]],
      phoneNumber: ['', [Validators.required, this.customValidator.phoneNumberValidation]]
    });
  }

  get f() { return this.loginForm.controls; }

  getLogin(event) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    var email = this.loginForm.value.emailOrmobile;
    var index = email.indexOf("@");
    if (index) {
      this.emailOrNot = true;
    }
    this.getLoginSubscription = this.userService.login(this.loginForm.value, this.emailOrNot)
      .subscribe((resp) => {
        this.userDetetails = Object.assign({}, resp);
        this.dataShareService.changeMessage(
          {
            label: 'successLogin',
            data: true
          });
        this.router.navigateByUrl('profile');
      }, (error) => {
        this.invalid = true;
        console.log(`error: ${error}`);
      });
  }


  ngOnDestroy() {
    if (this.getLoginSubscription) {
      this.getLoginSubscription.unsubscribe()
    }
  }

  showDIV($evnet) {
    this.otherLoginIssue = false;
  }
  contactUs() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', detail: 'Admin contact to you soon' });
    console.log("data submitted successfully");
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', detail: 'Admin contact to you soon' });
  }


  clear() {
    this.msgs = [];
  }
  loginBack(event) {
    this.otherLoginIssue = true;

  }
}
