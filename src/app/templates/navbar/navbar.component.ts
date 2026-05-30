import { GetdataService } from './../../services/getdata.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from './../../services/http.service';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ModalModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username;
  menudata;
  menuname: string = '';
  sysapps;
  sysappid;
  acadyear;
  semester;
  sysacadyear;
  syssemester;
  fullname;

  constructor(private http: HttpService, private modalService: BsModalService, public getdata: GetdataService) {}
  modalRef?: BsModalRef;

  ngOnInit(): void {
    ($('#menu-toggle') as any).click((e) => {
      e.preventDefault();
      ($('#wrapper') as any).toggleClass('toggled');
    });
    this.fullname = sessionStorage.getItem('fullname');
  }

  logout() {
    open(window.location.href, '_self').close();
  }
  openModal(template: TemplateRef<any>) {
    this.acadyear = this.getdata.getacadyear();
    this.semester = this.getdata.getsemester();
    this.modalRef = this.modalService.show(template);
  }
  setacad() {
    sessionStorage.setItem('maacadyear', this.acadyear);
    sessionStorage.setItem('masemester', this.semester);
    this.modalService.hide();
    window.location.reload();
  }

  hide(i) {
    if (document.getElementById('nav' + i).classList.contains('show')) {
      document.getElementById('nav' + i).classList.remove('show');
    } else {
      document.getElementById('nav' + i).classList.add('show');
    }
  }
}
