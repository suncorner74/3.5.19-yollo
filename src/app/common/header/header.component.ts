import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataShareService } from 'src/app/_helpers/data-share.service';
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
  sucessRegister: boolean;
  constructor(private modalService: NgbModal,
    private dataShareService: DataShareService) {
    this.sucessRegister = false;
  }

  ngOnInit() {
    this.dataShareService.currentMessage.subscribe(message => {
      if (typeof message === 'object' && (message.label === 'succcessRegister')) {
        this.display = false;
        this.sucessRegister = true;
      };
    });
    let details = JSON.parse(sessionStorage.getItem('currentUser'));

  }

  showDialog() {
    this.display = true;
  }

  logout() {
    sessionStorage.clear();
    location.reload();

    // alert('logout successfully')
  }
}
