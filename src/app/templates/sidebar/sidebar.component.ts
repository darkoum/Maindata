import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpService } from './../../services/http.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menudata: any[] = [];
  menuname;
  calling;
  repform;
  documentid;
  menugroupname;
  logkeeping;

  oldvalue = '';
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getmenulist();
  }

  private mockMenuData = [
    {
      sysmenugroupname: 'ข้อมูลนักศึกษา',
      sysmenu: [
        { sysmenutype: 'F', sysmenuname: 'ข้อมูลหลักนักศึกษา',    sysmenuid: '1002', calling: 'prgstudentmaster',   repform: '', documentid: 'MA-1002', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'กลุ่มนักศึกษา',          sysmenuid: '1005', calling: 'prgstudentgroup',    repform: '', documentid: 'MA-1005', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'ข้อมูลทั้งหมดนักศึกษา',  sysmenuid: '1007', calling: 'prgstudentallinfo',  repform: '', documentid: 'MA-1007', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'ค้นหานักศึกษา',           sysmenuid: '1008', calling: 'prgsearchstudent',   repform: '', documentid: 'MA-1008', logkeeping: 'N' },
      ]
    },
    {
      sysmenugroupname: 'สถานภาพนักศึกษา',
      sysmenu: [
        { sysmenutype: 'F', sysmenuname: 'สถานภาพนักศึกษา',        sysmenuid: '1010', calling: 'prgstudentstatus',   repform: '', documentid: 'MA-1010', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'ตั้งค่าสถานภาพ',          sysmenuid: '1011', calling: 'prgstudentstatusset',repform: '', documentid: 'MA-1011', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'โอนย้ายนักศึกษา',         sysmenuid: '1017', calling: 'prgstudenttransfer', repform: '', documentid: 'MA-1017', logkeeping: 'N' },
      ]
    },
    {
      sysmenugroupname: 'บุคลากร',
      sysmenu: [
        { sysmenutype: 'F', sysmenuname: 'ประเภทเจ้าหน้าที่',       sysmenuid: '1048', calling: 'prgofficertype',     repform: '', documentid: 'MA-1048', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'ข้อมูลเจ้าหน้าที่',       sysmenuid: '1049', calling: 'prgofficer',         repform: '', documentid: 'MA-1049', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'ค้นหาเจ้าหน้าที่',        sysmenuid: '1050', calling: 'prgsearchofficer',   repform: '', documentid: 'MA-1050', logkeeping: 'N' },
      ]
    },
    {
      sysmenugroupname: 'หลักสูตร',
      sysmenu: [
        { sysmenutype: 'F', sysmenuname: 'รายวิชา',                 sysmenuid: '1086', calling: 'prgcourse',          repform: '', documentid: 'MA-1086', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'หลักสูตร',                sysmenuid: '1088', calling: 'prgprogram',         repform: '', documentid: 'MA-1088', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'โครงสร้างหลักสูตร',      sysmenuid: '1089', calling: 'prgprogramstructure', repform: '', documentid: 'MA-1089', logkeeping: 'N' },
      ]
    },
    {
      sysmenugroupname: 'ข้อมูลพื้นฐาน',
      sysmenu: [
        { sysmenutype: 'F', sysmenuname: 'คณะ',                    sysmenuid: '1107', calling: 'prgfaculty',         repform: '', documentid: 'MA-1107', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'ระดับการศึกษา',          sysmenuid: '1106', calling: 'prglevel',           repform: '', documentid: 'MA-1106', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'ปริญญา',                 sysmenuid: '1105', calling: 'prgdegree',          repform: '', documentid: 'MA-1105', logkeeping: 'N' },
        { sysmenutype: 'F', sysmenuname: 'วิทยาเขต',               sysmenuid: '1104', calling: 'prgcampus',          repform: '', documentid: 'MA-1104', logkeeping: 'N' },
      ]
    },
  ];

  getmenulist(): void {
    // DEV ONLY: ใช้ mock data ทันที ไม่รอ API
    if (window.location.hostname === 'localhost') {
      this.menudata = this.mockMenuData;
      return;
    }
    this.http.get('Sysmen/get/10').then((response) => {
      if (response) this.menudata = response;
    });
  }

  hide(value): void {
    if (this.oldvalue !== value) {
      ($(this.oldvalue) as any).collapse('hide');
    }
    this.oldvalue = value;
  }

  getsysmenuname(menuname, calling, repform, documentid, menugroupname, sysmenuid, logkeeping): void {
    if (logkeeping == 'Y') {
      this.http.post('Sysexelog/Post', { sysmenuid: sysmenuid, ipaddress: this.http.ip }).then(() => {});
    }
    sessionStorage.setItem('sysmenuid', sysmenuid);
    sessionStorage.setItem('menuname', menuname);
    sessionStorage.setItem('menucalling', calling);
    sessionStorage.setItem('menurepform', repform);
    sessionStorage.setItem('documentid', documentid);
    sessionStorage.setItem('menugroupname', menugroupname);
    sessionStorage.setItem('logkeeping', logkeeping);

    localStorage.setItem('token', sessionStorage.getItem('token'));
    localStorage.setItem('fullname', sessionStorage.getItem('fullname'));
    localStorage.setItem('repclientid', sessionStorage.getItem('repclientid'));
    localStorage.setItem('sysmenuid', sessionStorage.getItem('sysmenuid'));
    localStorage.setItem('menuname', sessionStorage.getItem('menuname'));
    localStorage.setItem('menucalling', sessionStorage.getItem('menucalling'));
    localStorage.setItem('menurepform', sessionStorage.getItem('menurepform'));
    localStorage.setItem('documentid', sessionStorage.getItem('documentid'));
    localStorage.setItem('menugroupname', sessionStorage.getItem('menugroupname'));
    localStorage.setItem('logkeeping', sessionStorage.getItem('logkeeping'));

    ($('body,html') as any).animate({ scrollTop: 0 }, 100);
  }
}
