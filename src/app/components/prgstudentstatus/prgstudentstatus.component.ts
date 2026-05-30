import { Encrypt } from "./../../shareds/encrypt";
import { HttpService } from "src/app/services/http.service";
import { Component, OnInit } from "@angular/core";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import notify from "devextreme/ui/notify";
import { AlertService } from "src/app/services/alert.service";
import { UtilService } from "src/app/services/util.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
    standalone: false,
  selector: "app-prgstudentstatus",
  templateUrl: "./prgstudentstatus.component.html",
  styleUrls: ["./prgstudentstatus.component.css"],
})
export class PrgstudentstatusComponent implements OnInit {
  studentstatuslist: any;
  // studentcode: any = '6511511113';
  // studentcode: any = '6519100077';
  // studentcode: any = '6410450006';
  // studentcode: any = '66150041135';
  studentcode: any;
  studentinfo: any;
  statuslist: any;
  editmodeopen: boolean = false;
  tmpstudentid: any;
  studentreclist: any;
  studentstatuslog: any;
  enrolltypelist: any;
  enrollstatuslist: any;
  gradestatuslist: any;
  gradeprolist: any;
  officerlist1: any;
  officerlist2: any;
  officerlist3: any;
  recordtypelist: any;
  financestatuslist: any = [];
  rules: any;
  action: any;
  tmpacadyear: any;
  tmpsemester: any;
  tabcurrent: number = 0;
  tmpstudentname: any;
  popupVisible = false;
  closeButtonOptions: any;
  emailButtonOptions: any;
  year = new Date().getFullYear();
  month = new Date().getMonth();
  date = new Date().getDate();
  finishdate: any = new Date(this.year, this.month, this.date, 12, 0);
  tmpid: any
  tmpacad: any
  tmpsem: any
  tmpData: any
  tmpParam: any
  load:boolean = false
  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService,
    private routes: Router
  ) {
    locale("th");
    this.rules = { X: /[02-9]/ };
    //this.updateFinishdate.bind(this);
    const that = this;
    this.emailButtonOptions = {
      icon: "edit",
      text: "ตกลง",
      onClick: function (e) {
        that.updateFinishdate();
        that.popupVisible = false;
      },
    };
    if (sessionStorage.getItem("studentcodesearch") != null) {
      this.studentcode = sessionStorage.getItem("studentcodesearch");
      this.getStudentinfo();
      sessionStorage.removeItem("studentcodesearch");
    }
  }

  ngOnInit(): void {
    this.getstatuslist();
    this.getenrolltype();
    this.getenrollstatus();
    this.getgradestatus();
    this.getofficerlist();
    this.getgradeprolist();
    this.getrecordtype();
    this.getaction();
    this.getfinancestatuslist();
  }

  getStudentinfo() {
    if (typeof this.studentcode === "undefined" || this.util.ntb(this.studentcode) == null || this.studentcode == "") 
    {
      this.alert.MsgBoxCritical("กรุณาระบุรหัสนักศึกษา");
      // this.openformstudentsearch();
    } else {
      this.load = true;
      this.data
        .get("Prgstudentstatus/Getviewstudentinfobystucode/" + this.studentcode)
        .then((response: any) => {
          if(response?.length > 0){
            this.getStudentstatus();
            this.studentinfo = response;
            this.tmpstudentid = response[0]?.studentid;
            this.tmpacadyear = null;
            this.studentreclist = [];
            this.studentstatuslog = [];
            this.tmpstudentname =
            response[0]?.studentcode +
            " : " +
            response[0]?.prefixname +
            response[0]?.studentname +
            "  " +
            response[0]?.studentsurname;
          } else {
            this.alert.Showerror("ไม่พบข้อมูลนักศึกษา");
          }
          this.load = false;
        });
    }
  }

  getStudentstatus() {
    this.data
      .getcombo("Prgstudentstatus/Getstustabystucode/" + this.studentcode)
      .then((response: any) => {
        // console.log(response);
        this.studentstatuslist = response;
      });
  }

  getstatuslist() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedesnum/STUDENTSTATUS/STUDENTSTATUS")
      .then((response: any) => {
        this.statuslist = response;
      });
  }

  getfinancestatuslist(){
    this.data.getcombo("ComboSysbyt/getSysbytedes/STUDENTMASTER/FINANCESTATUS").then((response: any) => {
      this.financestatuslist = response;
    })
  }

  getenrolltype() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTSTATUS/ENROLLTYPE")
      .then((response: any) => {
        this.enrolltypelist = response;
      });
  }
  getgradeprolist() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTSTATUS/GRADEPRO")
      .then((response: any) => {
        this.gradeprolist = response;
      });
  }

  getenrollstatus() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTSTATUS/ENROLLSTATUS")
      .then((response: any) => {
        this.enrollstatuslist = response;
      });
  }

  getgradestatus() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTSTATUS/GRADESTATUS")
      .then((response: any) => {
        this.gradestatuslist = response;
      });
  }

  getrecordtype() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTRECORD/RECORDTYPE")
      .then((response: any) => {
        this.recordtypelist = response;
      });
  }
  getaction() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTSTATUSLOG/ACTION")
      .then((response: any) => {
        this.action = response;
      });
  }

  getofficerlist() {
    this.data.getcombo("ComboOff/Name").then((response: any) => {
      this.officerlist1 = response;
      this.officerlist2 = response;
      this.officerlist3 = response;
    });
  }

  onInsertingstart(e: any) {
    //e.createdatetime = Date.now()
    //console.log(Date.now())
    if (sessionStorage.getItem("editmodeopen") == "false") {
      sessionStorage.setItem("editmodeopen", "true");
    } else {
      e.cancel = true;
    }
  }

  onRecInsertingstart(e: any) {
    //e.createdatetime = Date.now()
    //console.log(Date.now())
    let tmpdate: Date;
    tmpdate = new Date();

    // e.data.createdatetime = tmpdate
    //  Number(tmpdate.getMonth() + 1) + '/' + tmpdate.getDate() + '/' + tmpdate.getFullYear();
    if (sessionStorage.getItem("editmodeopen") == "false") {
      e.data.createdatetime =
        Number(tmpdate.getMonth() + 1) +
        "/" +
        tmpdate.getDate() +
        "/" +
        tmpdate.getFullYear() +
        " " +
        tmpdate.getHours() +
        ":" +
        tmpdate.getMinutes();
      sessionStorage.setItem("editmodeopen", "true");
    } else {
      e.cancel = true;
    }
  }

  updateFinishdate() {
    // let parameter: any = {};
    // parameter.studentid = this.tmpid;
    // parameter.finishdate = this.finishdate;
    //console.log(this.finishdate)
    //[{studentid: this.tmpid,finishdate:this.finishdate}]if(data.changes[0]['data'].dateto){
    //        parameter.dateto = this.util.getdateformatora(data.changes[0]['data'].dateto);

    this.data
      .put("Prgstudentstatus/Putupdatefinishdate", {
        studentid: this.tmpstudentid,
        finishdate: this.util.getdateformatora(this.finishdate),
      })
      .then((resp: any) => {
        this.onSave(this.tmpData);
      });
  }

  ontmpSave(data: any) {
    this.tmpData = data;
    // console.log(this.tmpData)
    this.tmpParam = data.changes[0]["data"];
    // console.log(this.tmpData.changes[0]['key'])
    if (data.changes[0]["type"] == "remove") {
      this.onSave(data);
    } else {
      if (data.changes[0]["data"].studentstatus >= 40) {
        // console.log(data);
        this.finishdate = data.changes[0]["data"].approvedate;
        sessionStorage.setItem("editmodeopen", "false");
        this.tmpid = data.changes[0]["key"].studentid;
        this.tmpacad = data.changes[0]["key"].acadyear;
        this.tmpsem = data.changes[0]["key"].semester;
        this.popupVisible = true;

        // this.onSave(data)
      } else {
        this.onSave(data);
      }
    }
  }

  onSave(data: any) {
    let parameter: any;

    if (data.changes.length !== 0) {
      parameter = this.tmpParam;
      if (data.changes[0]["data"]?.approvedate) {
        parameter.approvedate = this.util.getdateformatora(
          data.changes[0]["data"].approvedate
        );
      }
      if (data.changes[0]["data"]?.datefrom) {
        parameter.datefrom = this.util.getdateformatora(
          data.changes[0]["data"].datefrom
        );
      }
      if (data.changes[0]["data"]?.dateto) {
        parameter.dateto = this.util.getdateformatora(
          data.changes[0]["data"].dateto
        );
      }
      data.cancel = true;
      //parameter = data.changes[0]['data'];

      switch (data.changes[0]["type"]) {
        case "update":
          //console.log(data.changes[0]['data'].approvedate)

          parameter.keystudentid = data.changes[0]["key"].studentid;
          parameter.keyacadyear = data.changes[0]["key"].acadyear;
          parameter.keysemester = data.changes[0]["key"].semester;

          this.data
            .put("Prgstudentstatus/Putstusta", parameter)
            .then((resp: any) => {
              this.alert.Showsuccess();
              data.component.cancelEditData();
              this.getStudentstatus();
              this.getStudentinfo();
            });

          break;

        case "insert":
          parameter.studentid = this.tmpstudentid;
          let tmpdate: Date;
          if (
            data.changes[0]["data"].delaypayment != null &&
            data.changes[0]["data"].delaypayment != ""
          ) {
            tmpdate = new Date(data.changes[0]["data"].delaypayment);
            parameter.delaypayment =
              Number(tmpdate.getMonth() + 1) +
              "/" +
              tmpdate.getDate() +
              "/" +
              tmpdate.getFullYear();
          }
          if (
            data.changes[0]["data"].approvedate != null &&
            data.changes[0]["data"].approvedate != ""
          ) {
            tmpdate = new Date(data.changes[0]["data"].approvedate);
            parameter.approvedate =
              Number(tmpdate.getMonth() + 1) +
              "/" +
              tmpdate.getDate() +
              "/" +
              tmpdate.getFullYear();
          }
          if (
            data.changes[0]["data"].datefrom != null &&
            data.changes[0]["data"].datefrom != ""
          ) {
            tmpdate = new Date(data.changes[0]["data"].datefrom);
            parameter.datefrom =
              Number(tmpdate.getMonth() + 1) +
              "/" +
              tmpdate.getDate() +
              "/" +
              tmpdate.getFullYear();
          }
          if (
            data.changes[0]["data"].dateto != null &&
            data.changes[0]["data"].dateto != ""
          ) {
            tmpdate = new Date(data.changes[0]["data"].dateto);
            parameter.dateto =
              Number(tmpdate.getMonth() + 1) +
              "/" +
              tmpdate.getDate() +
              "/" +
              tmpdate.getFullYear();
          }

          this.data
            .post("Prgstudentstatus/Poststusta", parameter)
            .then((resp: any) => {
              this.alert.Showsuccess();
              data.component.cancelEditData();
              this.getStudentstatus();
              this.getStudentinfo();
            });
          break;

        case "remove":
          this.data
            .delete(
              "Prgstudentstatus/Deletestusta" +
                "/" +
                data.changes[0]["key"].studentid +
                "/" +
                data.changes[0]["key"].acadyear +
                "/" +
                data.changes[0]["key"].semester
            )
            .then((resp: any) => {
              this.alert.Showsuccess();
              this.getStudentstatus();
              this.getStudentinfo();
            });
          data.component.cancelEditData();
          break;
      }
    } else {
      this.editmodeopen = false;
    }
  }

  onRecSave(data: any) {
    let parameter: any;
    data.cancel = true;
    if (data.changes.length !== 0) {
      parameter = data.changes[0]["data"];

      switch (data.changes[0]["type"]) {
        case "update":
          // parameter.keystudentrecordid = data.changes[0]["key"].studentrecordid;
          // parameter.keystudentid = this.tmpstudentid;
          // parameter.keyacadyear = this.tmpacadyear;
          // parameter.keysemester = this.tmpsemester;
          parameter.keystudentid = data.changes[0]["key"].studentid;
          parameter.keycreatedatetime = data.changes[0]["key"].createdatetime;

          this.data
            .put("Prgstudentstatus/Putsturec", parameter)
            .then((resp: any) => {
              this.alert.Showsuccess();
              data.component.cancelEditData();
              this.getStudentrecord(
                this.tmpstudentid,
                this.tmpacadyear,
                this.tmpsemester
              );
              this.getStudentlog(
                this.tmpstudentid,
                this.tmpacadyear,
                this.tmpsemester
              );
            });

          break;

        case "insert":
          parameter.studentid = this.tmpstudentid;
          parameter.acadyear = this.tmpacadyear;
          parameter.semester = this.tmpsemester;
          let tmpdate: Date;
          if (
            data.changes[0]["data"].recorddate != null &&
            data.changes[0]["data"].recorddate != ""
          ) {
            tmpdate = new Date(data.changes[0]["data"].recorddate);
            parameter.recorddate =
              Number(tmpdate.getMonth() + 1) +
              "/" +
              tmpdate.getDate() +
              "/" +
              tmpdate.getFullYear();
          }

          // if (
          //     data.changes[0]['data'].createdatetime != null &&
          //     data.changes[0]['data'].createdatetime != ''
          // ) {
          //     tmpdate = new Date(data.changes[0]['data'].createdatetime);
          //     parameter.createdatetime =
          //         Number(tmpdate.getMonth() + 1) + '/' + tmpdate.getDate() + '/' + tmpdate.getFullYear();
          // }else{
          // tmpdate = new Date();
          // console.log(tmpdate)
          //  parameter.createdatetime =
          //    Number(tmpdate.getMonth() + 1) + '/' + tmpdate.getDate() + '/' + tmpdate.getFullYear() + ' ' + tmpdate.getHours() + ':' + tmpdate.getMinutes();
          // }
          if (
            data.changes[0]["data"].approvedate != null &&
            data.changes[0]["data"].approvedate != ""
          ) {
            tmpdate = new Date(data.changes[0]["data"].approvedate);
            parameter.approvedate =
              Number(tmpdate.getMonth() + 1) +
              "/" +
              tmpdate.getDate() +
              "/" +
              tmpdate.getFullYear();
          }
          this.data
            .post("Prgstudentstatus/Poststurec", parameter)
            .then((resp: any) => {
              this.alert.Showsuccess();
              data.component.cancelEditData();
              this.getStudentrecord(
                this.tmpstudentid,
                this.tmpacadyear,
                this.tmpsemester
              );
              this.getStudentlog(
                this.tmpstudentid,
                this.tmpacadyear,
                this.tmpsemester
              );
            });
          break;

        case "remove":
          this.data
            .delete(
              "Prgstudentstatus/Deletesturec/" +
                // data.changes[0]["key"].studentrecordid
                data.changes[0]["key"].studentid +
                "/" +
                this.getdatetimeformat(data.changes[0]["key"].createdatetime)
            )
            .then((resp: any) => {
              this.alert.Showsuccess();
              data.component.cancelEditData();
              this.getStudentrecord(
                this.tmpstudentid,
                this.tmpacadyear,
                this.tmpsemester
              );
              this.getStudentlog(
                this.tmpstudentid,
                this.tmpacadyear,
                this.tmpsemester
              );
            });
          break;
      }
    } else {
      this.editmodeopen = false;
    }
  }
  getdatetimeformat(date:any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(date, 'ddMMYYYYHHmmss');
    return formattedDate;
  }
  Showerror(message: any, type: any) {
    let option = {
      message: message,
    };
    notify(option, type, 5000);
  }

  selectionChanged(data: any) {
    if (
      sessionStorage.getItem("editmodeopen") == "false" &&
      data.selectedRowKeys.length > 0
    ) {
      this.tmpacadyear = data.selectedRowKeys[0].acadyear;
      this.tmpsemester = data.selectedRowKeys[0].semester;
      // switch (this.tabcurrent) {
      //   case 0:
      //     if (this.tmpacadyear && this.tmpsemester) {
      //       this.getStudentrecord(
      //         data.selectedRowKeys[0].studentid,
      //         data.selectedRowKeys[0].acadyear,
      //         data.selectedRowKeys[0].semester
      //       );
      //     }
      //     break;

      //   case 1:
          if (this.tmpacadyear && this.tmpsemester) {
            this.getStudentlog(
              data.selectedRowKeys[0].studentid,
              data.selectedRowKeys[0].acadyear,
              data.selectedRowKeys[0].semester
            );
          }
      //     break;
      // }
    }
  }

  getStudentrecord(id: any, acad: any, sem: any) {
    this.data
      .get("Prgstudentstatus/Getsturecbysem/" + id + "/" + acad + "/" + sem)
      .then((response: any) => {
        this.studentreclist = response;
      });
  }

  getStudentlog(id: any, acad: any, sem: any) {
    // console.log(id, acad, sem);
    this.data
      .get("Prgstudentstatus/Getstustalogbysem/" + id + "/" + acad + "/" + sem)
      .then((response: any) => {
        this.studentstatuslog = response;
      });
  }
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items[0].showText = "always";
    e.toolbarOptions.items.unshift({
      location: "before",
      template: "tableName",
    });
  }

  onToolbarPreparing2(e: any) {
    e.toolbarOptions.items[0].showText = "always";
    var toolbarItems = e.toolbarOptions.items;
    if (this.tmpacadyear == null && this.tmpacadyear == undefined) {
      $.each(toolbarItems, function (_, item) {
        if (item.name === "addRowButton") {
          item.options.onClick = function (args: any) {
            alert("กรุณาระบุปีการศึกษา/ภาคที่");
          };
        }
      });
    }
    e.toolbarOptions.items.unshift({
      location: "before",
      template: "tableName",
    });
  }

  selectTab(e: any) {
    if (e.name === "selectedIndex") {
      switch (e.value) {
        case 0:
          this.tabcurrent = 0;
          if (this.tmpacadyear && this.tmpsemester) {
            this.getStudentrecord(
              this.tmpstudentid,
              this.tmpacadyear,
              this.tmpsemester
            );
          }

          break;

        case 1:
          this.tabcurrent = 1;
          if (this.tmpacadyear && this.tmpsemester) {
            this.getStudentlog(
              this.tmpstudentid,
              this.tmpacadyear,
              this.tmpsemester
            );
          }
          break;

        //         case 2:
        //             this.tabcurrent = 2;
        //             if (this.tmpacadid) {
        //                 this.getAcapro(this.tmpacadid);
        //             }
        //             break;
      }
    }
  }

  updatedatafrom(eventData: any, cellInfo: any) {
    //var d = new Date(cellInfo.data[str]);
    //if(eventData.value > d) {
    //  cellInfo.data[str] = eventData.value;
    //}
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  openformstudentsearch() {
    sessionStorage.setItem("prgform", sessionStorage.getItem("sysmenuid"));
    this.routes.navigate(["/15289"]);
  }  
}
