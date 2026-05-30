import { locale } from 'devextreme/localization';
import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { Encrypt } from 'src/app/shareds/encrypt';

@Component({
    standalone: false,
  selector: 'app-prgstudentlog',
  templateUrl: './prgstudentlog.component.html',
  styleUrls: ['./prgstudentlog.component.css']
})
export class PrgstudentlogComponent {
  studentcode: any;
  tmpstudentid :any
  studentinfo: any;
  eventtype : any = null
  eventtypelist : any
  studentupdateloglist: any

  dynamicolddata: any
  dynamicnewdata: any
  showSelector: boolean = false
  constructor(private data: HttpService, private encrypt: Encrypt, private alert: AlertService, private util:UtilService){
  }
  ngOnInit(): void {
    locale("th")
    this.getEventtypelist()
    //this.studentcode = '6708413'
  }
  getEventtypelist(){
    this.data.get("ComboSysbyt/getSysbytedes/STUDENTUPDATELOG/EVENTTYPE").then(
      (response: any) => {
          this.eventtypelist = response;
      }
  )
  }
  getStudentinfo() {
    if(this.studentcode){
    this.data.get("Prgstudentlog/Getviewstudentinfobystucode/" + this.studentcode).then(
        (response: any) => {
          this.tmpstudentid = response[0].studentid
          this.studentinfo = response
          this.getStudentupdatelog()
        }
    );
    }else{
      // this.alert.Showerror("กรุณาระบุเลขประจำตัวนักศึกษา");
      this.alert.MsgBoxCritical("กรุณาระบุรหัสนักศึกษา");
      // this.showSelector = true
    }
  }
  getStudentupdatelog() {
   // console.log("Stuupdlog/Getstuupdlogbystucode/"+this.studentcode +"/"+this.eventtype);
    if(this.tmpstudentid){
          // this.data.get("Stuupdlog/Getstuupdlogbystucode/"+ this.tmpstudentid +"/"+ this.util.ntb(this.eventtype)).then(
          this.data.get("Prgstudentlog/Getstuupdlogbystucode/"+ this.tmpstudentid +"/"+ this.util.ntb(this.eventtype)).then(
              (response: any) => {
                  this.studentupdateloglist = response;
              }
          );
      }
  }
  onToolbarPreparing(e:any){
    e.toolbarOptions.items[0].showText = 'always';
    e.toolbarOptions.items.unshift({
      location: 'before',
      template: 'tableName'
    });
  }
}
