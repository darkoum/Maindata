import { isThisTypeNode } from 'typescript';
import { Component, OnInit } from '@angular/core';
import { formatDate, locale } from 'devextreme/localization';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { Encrypt } from 'src/app/shareds/encrypt';

@Component({
    standalone: false,
  selector: 'app-systemplateprereport',
  templateUrl: './systemplateprereport.component.html',
  styleUrls: ['./systemplateprereport.component.css']
})
export class SystemplateprereportComponent implements OnInit {


  repname:any 
  repfilename:any
  systemname :any 
  systemnameeng :any 
  reportserver:any

  lstCampus:any [] = [];
  lstDivisioncode:any []=[];
  lstFac:any []=[];
  lstLev: any[] = [];
  status: any[] = [];
  lstTransfer: any[] = [];
  lstStdGroup: any[] = [];
  lstProgram: any[] = [];

  campusid: number;
  groupyear: number;
  studentgroup: number;
  statusfrom: number;
  statusto: number;
  acadyear: number = +sessionStorage.getItem('tiacadyear');
  semester: number = +sessionStorage.getItem('tisemester');
  divisioncode:any = sessionStorage.getItem('tidivisioncode');
  levelid: any= +sessionStorage.getItem('tienlevelid');
  facultyid: any= +sessionStorage.getItem('tienfacultyid');

  programid: any;

  studentcodefrom:any;
  studentcodeto:any;
  datefrom: any;
  dateto: any;
  criteria: any = '';
  rules: any

  constructor(
    private http: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService
  ) {
    locale('th');
    this.rules = { X: /[02-9]/ };
    this.repname = sessionStorage.getItem('menuname');
    this.repfilename =sessionStorage.getItem('menurepform');
    this.systemnameeng  =http.getsystemnameeng();
    this.systemname  =http.getsystemname();
    this.reportserver  =http.getreportserver();
  }
  ngOnInit(): void {
    this.getCam();
    this.getFac();
    this.getDiv();
    this.getLvl();
    this.getStatus();
    this.getTransferType();
    this.getcriteria();
  }

  getFac() {
    this.http.getcombo('ComboFac/All').then(
      (response:any) => {
        this.lstFac = response;
      }
    );
  }

  getTransferType() {
    this.http.getcombo('ComboSysbyt/STUDENTTRANSFER/TRANSFERTYPE').then(
      (response:any) => {
        this.lstTransfer = response;
      }
    );
  }
  getStatus() {
    this.http.getcombo('ComboSysbyt/STUDENTSTATUS/STUDENTSTATUS').then(
      (response) => {
        this.status = response;
      }
    );
  }
  getCam() {
    this.http.getcombo('ComboCam/All').then(
      (response:any) => {
        this.lstCampus = response;
      }
    );
  }
  //
 
  getDiv() {

      this.http.getcombo('Divcod').subscribe(
      (response:any) => {
        this.lstDivisioncode = response;
      },
        (error) => { }
      );
 
  }

  getLvl() {

    if(this.divisioncode !=null) {
      this.http.getcombo('Lev/' + this.divisioncode +'/dc').subscribe(
      (resp:any) => {
       // this.lstLev = resp;
        if (resp.length !== 0) {
          this.levelid=null;
          this.lstLev = [];
          this.lstLev.push({ levelid: null, levelname: null });
            for (let i = 0; i < resp.length; i += 1) {
                this.lstLev.push({
                levelid: resp[i].levelid,
                levelname: resp[i].levelname,
              });
            }
        }
      },
        (error) => { }
      );
    }
  }


   reFreshGroupYear() {

    let query = '';

    if (this.campusid ) {
      query += query.length > 0 ? ' and ' : '';
      query += 'campusid=' + this.campusid;
    }

    if (this.facultyid ) {
      query += query.length > 0 ? ' and ' : '';
      query += 'facultyid=' + this.facultyid;
    }
    if (this.levelid ) {
       query += query.length > 0 ? ' and ' : '';
       query += 'levelid=' + this.levelid;
    }
    if (+this.groupyear > 0) {
      query += query.length > 0 ? ' and ' : '';
      query += "groupyear='" + this.groupyear +"'";
    }

    if (query !== '') {
        this.http.get('View/' + query).isThisTypeNode((resp:any) => {

          if (resp.length !== 0) {

            this.studentgroup=null;
            this.lstStdGroup = [];
            this.lstStdGroup.push({ studentgroup: null, stdgroupname: null });

              for (let i = 0; i < resp.length; i += 1) {
                  this.lstStdGroup.push({
                  studentgroup: resp[i].studentgroup,
                  stdgroupname: resp[i].stdgroupname,
                });
              }
          }
        }
        );
    }
  }
  getProgram() {

    let strwhare: any = '';

    if (this.levelid ) {
      strwhare += strwhare.length > 0 ? ' and ' : '';
      strwhare += 'levelid=' + this.levelid;
    }

    if (this.facultyid ) {
      strwhare += strwhare.length > 0 ? ' and ' : '';
      strwhare += 'facultyid=' + this.facultyid;
    }

    if (strwhare != '') {

      this.http.get('Pro/' + strwhare + '/seq1').then((resp:any) => {
        if (resp.length !== 0) {
          this.programid=null;
          this.lstProgram = [];
          this.lstProgram.push({ programid: null, programshow: null });
            for (let i = 0; i < resp.length; i += 1) {
                this.lstProgram.push({
                programid: resp[i].programid,
                programshow: resp[i].programshow,
              });
            }
        }
      }
      );
    }
  }

  getcriteria() {

    this.criteria = '';

    if (this.campusid) {

      this.criteria += this.criteria.length > 0 ? ' and ' : '';
      this.criteria += 'sm.campusid=' + this.campusid;

    }

    if (this.levelid) {

      this.criteria += this.criteria.length > 0 ? ' and ' : '';
      this.criteria += 'sm.levelid=' + this.levelid;

    }

    if (this.facultyid) {

      this.criteria += this.criteria.length > 0 ? ' and ' : '';
      this.criteria += 'sm.facultyid=' + this.facultyid;

    }

    if (this.programid) {

      this.criteria += this.criteria.length > 0 ? ' and ' : '';
      this.criteria += 'sm.programid=' + this.programid;
    }

    if (this.statusfrom > 0) {

      if( this.statusto >0 ) {
        this.criteria += this.criteria.length > 0 ? ' and ' : '';
        this.criteria += 'studentstatus between ' + this.statusfrom + ' and ' + this.statusto;
      } else {
        this.criteria += this.criteria.length > 0 ? ' and ' : '';
        this.criteria += 'studentstatus =' + this.statusfrom ;
      }
    }

    if (this.groupyear > 0) {

      this.criteria += this.criteria.length > 0 ? ' and ' : '';
      this.criteria += "sm.groupyear='" + this.groupyear +"'";

    }

    if (this.studentgroup > 0) {

      this.criteria += this.criteria.length > 0 ? ' and ' : '';
      this.criteria += "sm.studentgroup='" + this.studentgroup +"'";

    }

    if (this.studentcodefrom !=null) {

      if( this.studentcodeto !=null ) {
        this.criteria += this.criteria.length > 0 ? ' and ' : '';
        this.criteria += "sm.studentcode between '" + this.studentcodefrom + "' and '" + this.studentcodeto + "'";
      } else {
        this.criteria += this.criteria.length > 0 ? ' and ' : '';
        this.criteria += "sm.studentcode ='" + this.studentcodefrom +"'" ;
      }

    }

    if (this.acadyear > 0) {

      this.criteria += this.criteria.length > 0 ? ' and ' : '';
      this.criteria += "acadyear=" + this.acadyear

    }

    if (this.semester > 0) {

      this.criteria += this.criteria.length > 0 ? ' and ' : '';
      this.criteria += "semester=" + this.semester

    }


    if (this.datefrom > 0 ) {

      if (this.dateto > 0  ) {
          this.criteria += this.criteria.length > 0 ? ' and ' : '';
        this.criteria =
          this.criteria +
         "admitdate  between TO_DATE('"  +  formatDate(this.datefrom, 'dd/MM/yyyy') + "','dd/mm/yyyy') and TO_DATE('" + formatDate(this.dateto, 'dd/MM/yyyy') + "','dd/mm/yyyy')";
      } else { 
         this.criteria += this.criteria.length > 0 ? ' and ' : '';
         this.criteria = this.criteria + "admitdate = TO_DATE('"  +  formatDate(this.datefrom, 'dd/MM/yyyy') + "','dd/mm/yyyy')";
      }
    }

    //console.log(this.criteria);

  }

  async HandleEventValue (e:any) {

    await this.reFreshGroupYear();
    await this.getProgram();
    await this.getcriteria();

  }
  async HandleEventDivChangeValue(e:any){
    await this.getLvl();
    await this.getcriteria();
  }
  async HandleEventStucodeChanageValue () {
    this.studentcodeto = this.studentcodefrom;
    await this.getcriteria();
  }
}