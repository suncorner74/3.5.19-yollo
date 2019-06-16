import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  update(user, id?) {
    let userDetails = {
      email: user.email,
      phonenumber: user.phoneNumber,
      pancard: user.pancard,
      gender: user.gender,
      userType: user.userType,
      salaryType: user.salryType,
      businessType: user.businesstype,
      gst: user.gst,
      reg: user.reg,
      firmName: user.firmName,
      dateofBirth: moment(user.dateOfBirth).format('YYYY-MM-DD'),
      userId: id
    }
    let url: string = `http://localhost:3000/users/profile/save`;
    return this.http.post<any>(url, userDetails)
      .pipe(map(user => {
        return user;
      }));
  }

  getUser(id) {
    let url: string = `http://localhost:3000/users/profile/fetch`;
    return this.http.post<any>(url, { userId: id })
      .pipe(map(user => {
        return user;
      }));
  }

}
