import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { locale } from 'devextreme/localization';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { Encrypt } from 'src/app/shareds/encrypt';

@Component({
    standalone: false,
  selector: 'app-prgsearchstudent',
  templateUrl: './prgsearchstudent.component.html',
  styleUrls: ['./prgsearchstudent.component.css'],
})
export class PrgsearchstudentComponent implements OnInit {
  facultyid: number;
  columnResizingMode = 'nextColumn';
  studentgrouplist: any[] = [];
  documentchecklist: any[] = [];
  graduatechecklist: any[] = [];
  scholartypelist: any[] = [];
  lstProgram: any[] = [];
  lstFac: any[] = [];
  studentcode: any;
  studentname: any;
  studentsurname: any;
  studentnameeng: any;
  studentsurnameeng: any;
  citizenid: any;
  rules: any;
  lstStudentSearch: any;
  lstStudentSearchimg: any;
  editmodeopen: boolean = false;
  svalue: any;
  groupyear: any;
  admitacadyear: any;
  studentgroup: any;
  documentcheck: any;
  graduatecheck: any;
  scholartype: any;
  scholartypedesc: any;
  programid: any;
  programyear: any;
  departmentlist: any;
  departmentid: any;
  tmpstudentid: any;
  showimg: boolean = false;
  divimgpage01: any;
  divimgpage02: any;
  officerimgshow: boolean = false;

  load = false;

  constructor(
    private http: HttpService,
    private encrypt: Encrypt,
    private util: UtilService,
    private alert: AlertService,
    private routes: Router,
  ) {
    locale('th');
    //this.rules = { "X": /[02-9]/ };
  }

  ngOnInit(): void {
    this.getFac();
    this.getprocombo();
    this.getdoccombo();
    this.getgracombo();
    this.getschtcombo();

    this.divimgpage01 = "col-12";
    this.divimgpage01 = "col-0";
    this.officerimgshow = false;

  }
  
  setstudentselect(data: any) {
    if (data.currentSelectedRowKeys.length > 0) {
      this.tmpstudentid = data.selectedRowKeys[0].studentid;
      this.http
        .get(
          'Prgsearchstudent/Getprgsearchstudentimg/' + this.util.ntb(this.tmpstudentid))
        .then((resp: any) => {
          this.lstStudentSearchimg = resp;
          this.load = false;
        });
    }
  }

  setimgshow() {

    if (this.showimg == true) {
      this.divimgpage01 = "col-8";
      this.divimgpage02 = "col-4";
      this.officerimgshow = true;
    }
    else {
      this.divimgpage01 = "col-12";
      this.divimgpage02 = "col-0";
      this.officerimgshow = false;
    }
  }

  searchCriteria() {
    if (
      !this.studentcode &&
      !this.studentname &&
      !this.studentsurname &&
      !this.studentnameeng &&
      !this.studentsurnameeng &&
      !this.citizenid &&
      !this.groupyear &&
      !this.studentgroup &&
      !this.programid &&
      !this.documentcheck &&
      !this.graduatecheck &&
      !this.scholartype &&
      !this.scholartypedesc &&
      !this.programyear
    ) {
      this.alert.Showwarning('กรุณาระบุเงื่อนไข');
    } else {
      this.load = true;
      this.lstStudentSearch = null;
      this.http
        .get(
          'Prgsearchstudent/Getprgsearchstudent/' +
          this.util.ntb(this.studentcode) +
          '/' +
          this.util.ntb(this.studentname) +
          '/' +
          this.util.ntb(this.studentsurname) +
          '/' +
          this.util.ntb(this.studentnameeng) +
          '/' +
          this.util.ntb(this.studentsurnameeng) +
          '/' +
          this.util.ntb(this.citizenid) +
          '/' +
          this.util.ntb(this.groupyear) +
          '/' +
          this.util.ntb(this.studentgroup) +
          '/' +
          this.util.ntz(this.programid) +
          '/' +
          this.util.ntb(this.documentcheck) +
          '/' +
          this.util.ntb(this.graduatecheck) +
          '/' +
          this.util.ntb(this.scholartype) +
          '/' +
          this.util.ntb(this.scholartypedesc) + 
          '/' +
          this.util.ntz(this.programyear)
        )
        .then((resp: any) => {
          this.lstStudentSearch = resp;
          this.load = false;
        });
    }
  }

  getFac() {
    this.http.get('ComboFac/All').then((resp: any) => {
      this.lstFac = resp;
      this.facultyid = resp[0].comboid;
    });
  }

  getdept() {
    this.departmentlist = [];
    if (this.facultyid) {
      this.http
        .getcombo('ComboDep/GetbyFac/' + this.util.ntz(this.facultyid))
        .then((resp: any) => (this.departmentlist = resp));
    }
  }

  getprocombo() {
    this.http.getcombo('ComboPro/Allminor/').then((resp: any) => {
      this.lstProgram = resp;
    });
  }

  getdoccombo() {
    this.http.getcombo('ComboSysbyt/getSysbytedes/STUDENTBIO/DOCUMENTCHECK/').then((resp: any) => {
      this.documentchecklist = resp;

    });
  }

  getgracombo() {
    this.http.getcombo('ComboSysbyt/getSysbytedes/STUDENTBIO/GRADUATECHECK/').then((resp: any) => {
      this.graduatechecklist = resp;

    });
  }
  getschtcombo() {
    this.http.getcombo('ComboSysbyt/getSysbytedes/STUDENTBIO/SCHOLARTYPE/').then((resp: any) => {
      this.scholartypelist = resp;

    });
  }

  refreshGroupyear() {
    if ((this.groupyear > 0)) {

      //   this.grouplist = this.grouplist2.filter((item:any) => item.keystr1id==this.groupyear);
      this.http.getcombo('ComboStuset/bygropyear/' + this.util.ntz(this.groupyear) + '/').then(
        (rep: any) => {
          this.studentgrouplist = rep;

        }

      );


    } else {
      this.studentgrouplist = [];
    }
    this.studentgroup = null;

  }
  callform(e) {
    // sessionStorage.setItem('studentcodesearch',e.data.studentcode);
    // this.routes.navigate(['/' + sessionStorage.getItem('prgform')]);
    // sessionStorage.removeItem('prgform');
  }
}
