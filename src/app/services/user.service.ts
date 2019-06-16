import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  isloggedIn: boolean = false;
  redirectUrl: string;
  loginUrl = '/home';
  loggedInUser: any;

  constructor(private http: HttpClient) {
  }
  login(user, emailOrNot) {
    var userDetail = {
      emailOrNumber: user.emailOrmobile,
      password: user.password,
      emailOrNot: emailOrNot
    }
    let url: string = `http://localhost:3000/users/login`;
    return this.http.post<any>(url, userDetail)
      .pipe(map(user => {
        if (user) {
          sessionStorage.setItem('_token_', JSON.stringify(user.token));
          sessionStorage.setItem('_@ux_', JSON.stringify(user.id));
          this.isloggedIn = true;
          this.loggedInUser = JSON.stringify(user);
        }
        return user;
      }));
  }


  register(user) {
    let url: string = `http://localhost:3000/users/register`;
    return this.http.post<any>(url, user)
      .pipe(map(user => {
        return user;
      }));
  }

  logout() {
    sessionStorage.clear();
  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }
  getRedirectUrl(): string {
    return this.redirectUrl;
  }
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }
  getLoginUrl(): string {
    return this.loginUrl;
  }

  logoutUser(): void {
    this.isloggedIn = false;
  }
  getLoggedInUser() {
    return this.loggedInUser;
  }
}
