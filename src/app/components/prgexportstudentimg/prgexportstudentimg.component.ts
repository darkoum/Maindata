import { UtilService } from './../../services/util.service';
import { AlertService } from './../../services/alert.service';
import { Encrypt } from './../../shareds/encrypt';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { locale } from 'devextreme/localization';
import * as XLSX from 'xlsx';

@Component({
    standalone: false,
  selector: 'app-prgexportstudentimg',
  templateUrl: './prgexportstudentimg.component.html',
  styleUrls: ['./prgexportstudentimg.component.css']
})
export class PrgexportstudentimgComponent implements OnInit {
  faccombo : any;
  camcombo : any;
  camcomboid : number;
  //procomboid : number;
  procombo  :any ;
  faccomboid : number;
  levcombo : any ;
  levcomboid : number;
  levcomboidto : number;
  depcombo : any;
  depcomboid : number;

  acadyear : number;
  semester : number;
  reportdate : any// = new Date();
  reportdateto :any// = new Date();
  studentlist : any;
  test : any;
  folderpath : any = 'D:\\studentimg';
 // remoteProvider: RemoteFileSystemProvider;
  imageItemToDisplay: any = {};

  load = false;

  popupVisible = false;

  flagnonedownload = true;
  downloaddate : any = new Date();
  flagdldiabled = true;

  constructor(private data: HttpService, private encrypt: Encrypt,private alert: AlertService,private util: UtilService) { 
    locale('th');
  }

  ngOnInit(): void {
    this.popupVisible = false;
    this.acadyear = +sessionStorage.getItem('maacadyear');
    this.semester = +sessionStorage.getItem('masemester');

    this.data.get('ComboFac/All').then((resp: any) => {this.faccombo = resp;});
    this.data.get('ComboCam/All').then((resp: any) => {this.camcombo = resp;});
    this.data.get('ComboLev/All').then((resp: any) => {this.levcombo = resp;});
  }

  displayPopup(){
    this.popupVisible = true;
  }

getdepartmentlist(): void {
  this.data.getcombo('ComboDep/Getbyfacid/' + this.util.ntz(this.faccomboid)).then(
      (rep:any) => {
          this.depcombo = rep;
      }
  );
}

getprocombo() {
  let strwhere = '';
  //this.svalue = this.levcomboid;
  if (this.faccomboid > 0) {
    if (strwhere.length > 0) {
      strwhere = strwhere + ' and ';
    }
    strwhere = strwhere + 'facultyid=' + this.faccomboid;
  }

  if (this.levcomboid > 0) {
    if (strwhere.length > 0) {
      strwhere = strwhere + ' and ';
    }
    strwhere = strwhere + 'levelid=' + this.levcomboid;
  }

  if (this.faccomboid > 0 || this.levcomboid > 0){
    this.data.get('ComboPro/ProlvlCondition/C/' + this.util.ntz(this.faccomboid) +'/'+ this.util.ntz(this.levcomboid)).then((resp: any) => {this.procombo = resp;});
  }
}
  onSearch(){
    // if (this.util.ntz(this.camcomboid) == -9) {
    //   alert('กรุณาระบุวิทยาเขต');
    //   return true;
    // }
    this.load = true;

    this.data.get('Prgexportstudentimg/Getcondition/' + this.util.ntz(this.camcomboid) + 
    '/' + this.util.ntz(this.levcomboid) +
    '/' + this.util.ntz(this.levcomboidto) +
    '/' + this.util.ntz(this.faccomboid) +
    '/' + this.util.ntz(this.depcomboid) +
    '/' + this.util.ntb(this.util.getdateformat(this.reportdate)) +
    '/' + this.util.ntb(this.util.getdateformat(this.reportdateto)) +
    '/' + this.util.ntz(this.acadyear) + 
    '/' + this.util.ntz(this.semester) +
    '/' + (this.flagnonedownload == true ? 1 : 0)
    ).then((resp: any) => {
      this.studentlist = resp;
      this.load = false;
    });
  }

  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        template: 'labeldate'
      },
      {
        location: 'after',
        template: 'tablebutton'
      },
    );
  }

  checkedchanged(e :any){
    if(e.value == true){
      this.flagdldiabled=true;
      this.reportdate=null;
      this.reportdateto=null;
    }else{
      this.flagdldiabled=false;
    }
  }

  btClick(e:any){

    this.load = true;

    this.data.get('Prgexportstudentimg/DownloadFileExcel' + 
    '/' +this.util.getdateformat(this.downloaddate)+ 
    '/' + this.util.ntz(this.camcomboid) + 
    '/' + this.util.ntz(this.levcomboid) +
    '/' + this.util.ntz(this.levcomboidto) +
    '/' + this.util.ntz(this.faccomboid) +
    '/' + this.util.ntz(this.depcomboid) +
    '/' + this.util.ntb(this.util.getdateformat(this.reportdate)) +
    '/' + this.util.ntb(this.util.getdateformat(this.reportdateto)) +
    '/' + this.util.ntz(this.acadyear) + 
    '/' + this.util.ntz(this.semester) +
    '/' + (this.flagnonedownload == true ? 1 : 0)).then((resp: any) => {

        //console.log(resp);
        if(resp[0].json != "[]"){
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(JSON.parse(resp[0].json));
          const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
          XLSX.writeFile(workbook, "StudentList" + this.util.getdateformat(this.downloaddate) + ".xlsx");
          this.onSearch();
          this.load = false;
          this.alert.Showsuccess();
        }else{
          this.alert.Showwarning("ไม่พบข้อมูล");
          this.load = false;
        }
        
    });

  }

}
