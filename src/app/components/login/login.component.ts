import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { InputTextModule } from 'primeng/inputtext';
import { MustMatch } from './../../_helpers/must-match.validator';
import {CustomValidator} from '../../_helpers/customValidator';
import { Router } from '@angular/router';
import {SelectItem} from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  display:boolean =true;
  getLoginSubscription = null;
  userDetetails = null;
  loginForm: FormGroup;
  contactUsForm:FormGroup;
  submitted = null;
  invalid = false;
  emailOrNot: boolean;
  otherLoginIssue = null;
  msgs: Message[] = [];

  constructor(
    private userService: UserService,
    public messageService: MessageService,
    public ValidatorService:CustomValidator,
    private fb: FormBuilder,
    private router: Router) {
    this.userDetetails = null;
    this.otherLoginIssue = true
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      emailOrmobile: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.contactUsForm = this.fb.group({
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]]
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
        // this.router.navigateByUrl('/');
        if (resp.user_level) {
          location.reload();
        } else {
          this.invalid = true;
        }

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

  showDIV($evnet){
    this.otherLoginIssue=false;
  }
  contactUs(){
    this.msgs = [];
    this.msgs.push({severity:'success', detail:'Admin contact to you soon'});
       console.log("data submitted successfully");
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'success', detail:'Admin contact to you soon'});
}

 
  clear() {
    this.msgs = [];
  }
}
