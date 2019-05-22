import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { InputTextModule } from 'primeng/inputtext';
import { MustMatch } from './../../_helpers/must-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  getLoginSubscription = null;
  userDetetails = null;
  loginForm: FormGroup;
  submitted = null;
  invalid = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router) {
    this.userDetetails = null;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailOrmobile: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  getLogin(event) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.getLoginSubscription = this.userService.login(this.loginForm.value)
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

}
