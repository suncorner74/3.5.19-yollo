import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user) {
    let url: string = `http://localhost:3000/users/login`;
    return this.http.post<any>(url, user)
      .pipe(map(user => {
        if (user) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    sessionStorage.clear();
  }
}
