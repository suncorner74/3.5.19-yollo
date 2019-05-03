import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  getLoginSubscription = null;
  userDetetails = null;
  loginForm = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder) {
    this.userDetetails = null;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }



  getLogin() {
    this.getLoginSubscription = this.userService.login(this.loginForm.value)
      .subscribe((resp) => {
        this.userDetetails = Object.assign({}, resp);
      }, (error) => {
        console.log(`error: ${error}`);
      })
  }


  ngOnDestroy() {
    if (this.getLoginSubscription) {
      this.getLoginSubscription.unsubscribe()
    }
  }

}
