import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  closeResult: string;
  userDetails = null;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    let details = JSON.parse(sessionStorage.getItem('currentUser'));

    if (details.user_level) {
      this.userDetails = details;
    }

  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  logout() {
    sessionStorage.clear();
    location.reload();

    // alert('logout successfully')
  }
}
