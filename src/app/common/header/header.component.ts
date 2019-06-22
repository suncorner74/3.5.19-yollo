import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataShareService } from 'src/app/_helpers/data-share.service';
import { UserProfileService } from './../../services/user-profile.service'
import { parse } from 'url';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent implements OnInit {
  display: boolean = false;
  closeResult: string;
  userDetails = null;
  sucessRegister = false;
  loggedInUser = null;
  constructor(private modalService: NgbModal,
    private dataShareService: DataShareService,
    private userProfile: UserProfileService,
    private router: Router) {
    this.sucessRegister = false;
  }

  ngOnInit() {
    this.dataShareService.currentMessage.subscribe(message => {
      if (typeof message === 'object' && (message.label === 'succcessRegister')) {
        this.display = false;
        this.sucessRegister = true;
      }
      if (typeof message === 'object' && (message.label === 'successLogin')) {
        this.display = false;
        this.sucessRegister = false;
        this.getSessionId();
      }
    });
    this.getSessionId();
  }

  getSessionId() {
    let id = sessionStorage.getItem('_@ux_');
    if (id) {
      this.userProfile.getUser(id).subscribe((data) => {
        this.loggedInUser = Object.assign({}, data);
      }, (error) => {
        console.log(error);
      })
    } else {
      this.router.navigateByUrl('home');
    }
  }
  showDialog() {
    this.display = true;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('home');
  }
}
