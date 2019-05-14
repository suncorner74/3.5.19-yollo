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
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  getLoginSubscription = null;
  userDetetails = null;
  loginForm: FormGroup;
  submitted = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router) {
    this.userDetetails = null;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
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
        location.reload();
      }, (error) => {
        console.log(`error: ${error}`);
      });
  }


  ngOnDestroy() {
    if (this.getLoginSubscription) {
      this.getLoginSubscription.unsubscribe()
    }
  }

}
