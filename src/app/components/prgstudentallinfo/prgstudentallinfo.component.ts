import { Component, OnInit } from "@angular/core";
import { Encrypt } from "./../../shareds/encrypt";
import { HttpService } from "src/app/services/http.service";
import { locale } from "devextreme/localization";
import { UtilService } from "src/app/services/util.service";
import { AlertService } from "src/app/services/alert.service";
import { Router } from "@angular/router";
import { DxButtonTypes } from "devextreme-angular/ui/button";
@Component({
    standalone: false,
  selector: "app-prgstudentallinfo",
  templateUrl: "./prgstudentallinfo.component.html",
  styleUrls: ["./prgstudentallinfo.component.css"],
})
export class PrgstudentallinfoComponent implements OnInit {
  studentcode: any;
  studentinfo: any[] = [];
  tmpstudentid: number;
  tmpstudentcode: string;
  tmpvstudentid: number;
  tmpvacadyear: number;
  tmpvsemester: number;
  studentstatuslist: any;
  enrollresult: any[] = [];
  enrollfeeresult: any[] = [];
  stuscholarresult: any[] = [];
  classexamresult: any[] = [];
  classtimeesult: any[] = [];
  tabs: any;
  schoclist: any[] = [];
  tmpvschoid: number;
  tmpofficerid1: number;
  tmpofficerid2: number;
  tmpofficerid3: number;
  offlist1: any[] = [];
  offlist2: any[] = [];
  offlist3: any[] = [];
  entdeglist: any[] = [];
  apptyplist: any[] = [];
  stuaddlist: any[] = [];
  stugralist: any[] = [];
  stureclist: any[] = [];
  tabcurrent: number = 0;
  stustatuslist: any[] = [];
  gradeprolist: any[] = [];
  showSelector: boolean = false
  searchBtn: DxButtonTypes.Properties = {
    icon: 'user',
    stylingMode: 'text',
    onClick: () => {
      this.showSelector = true
    },
  };

  constructor(
    private routes: Router,
    private data: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService,
  ) {
    locale("th");

    if (sessionStorage.getItem('studentcodesearch') != null) {
      this.studentcode = sessionStorage.getItem('studentcodesearch');
      this.getStudentinfo();
      sessionStorage.removeItem('studentcodesearch');
    }
  }
  ngOnInit(): void {
    // this.studentcode = '5619401309'
  }
  coursenameColumn_calculateCellValue(rowData: any) {
    return rowData.coursecode + "  " + rowData.coursename;
  }
  semesterColumn_calculateCellValue(rowData: any) {
    return rowData.acadyear + "/" + rowData.semester;
  }
  getStuaddResult(studentid: number) {
    this.data
      .get("Prgstudentallinfo/Getstubiobyid/" + studentid)
      .then((resp: any) => {
        this.stuaddlist = resp;
        // console.log(this.stuaddlist)
      });
  }
  getStugraResult(studentid: number) {
    this.data
      .get("Prgstudentallinfo/Getstugrabyid/" + studentid)
      .then((resp: any) => {
        this.stugralist = resp;
        // console.log(this.stugralist)
      });
  }
  getSturecResult(studentid: number) {
    this.data
      .get("Prgstudentallinfo/Getsturecbyid/" + studentid)
      .then((resp: any) => {
        this.stureclist = resp;
      });
  }
  getEnrollFeeResult(studentid: number, acadyear: number, semester: number) {
    if (studentid) {
      this.data
        .get(
          "Prgstudentallinfo/EnrollfeeGetbyidacd/" +
          studentid +
          "/" +
          acadyear +
          "/" +
          semester
        )
        .then((resp: any) => {
          this.enrollfeeresult = resp;
        });
    }
  }
  getScholarResult(studentid: number, acadyear: number, semester: number) {
    if (studentid) {
      this.data
        .get(`Prgstudentallinfo/GetScholarGetbyid/${studentid}/${acadyear}/${semester}`)
        .then((resp: any) => {
          this.stuscholarresult = resp;
        });
    }
  }
  getEnrollResult(studentid: number, acadyear: number, semester: number) {
    if (studentid) {
      this.data
        .get(
          "Prgstudentallinfo/GetEnrollResultGetbyid/" +
          studentid +
          "/" +
          acadyear +
          "/" +
          semester
        )
        .then((resp: any) => {
          this.enrollresult = resp;
        });
    }
  }
  getClassTimeResult(studentid: number, acadyear: number, semester: number) {
    if (studentid) {
      this.data
        .get(
          "Prgstudentallinfo/GetClassTimeTableGetbystuid/" +
          studentid +
          "/" +
          acadyear +
          "/" +
          semester
        )
        .then((resp: any) => {
          this.classtimeesult = resp;
        });
    }
  }
  getClassExamResult(studentid: number, acadyear: number, semester: number) {
    if (studentid) {
      this.data
        .get(
          "Prgstudentallinfo/ClassExamGetbystu/" +
          studentid +
          "/" +
          acadyear +
          "/" +
          semester
        )
        .then((resp: any) => {
          this.classexamresult = resp;
        });
    }
  }
  selectionChanged(data: any) {
    if (
      sessionStorage.getItem("editmodeopen") == "false" &&
      data.selectedRowKeys.length > 0
    ) {
      this.tmpvstudentid = data.selectedRowKeys[0].studentid;
      this.tmpvacadyear = data.selectedRowKeys[0].acadyear;
      this.tmpvsemester = data.selectedRowKeys[0].semester;
      switch (this.tabcurrent) {
        case 0:
          this.getEnrollResult(
            this.tmpvstudentid,
            this.tmpvacadyear,
            this.tmpvsemester
          );
          break;
        case 1:
          this.getClassTimeResult(
            this.tmpvstudentid,
            this.tmpvacadyear,
            this.tmpvsemester
          );
          break;
        case 2:
          this.getClassExamResult(
            this.tmpvstudentid,
            this.tmpvacadyear,
            this.tmpvsemester
          );
          break;
        case 3:
          this.getEnrollFeeResult(
            this.tmpvstudentid,
            this.tmpvacadyear,
            this.tmpvsemester
          );
          break;
        // case 4:
        //   this.getScholarResult(
        //     this.tmpvstudentid,
        //     this.tmpvacadyear,
        //     this.tmpvsemester
        //   );
        //   break;
      }
      this.getScholarResult(
              this.tmpvstudentid,
              this.tmpvacadyear,
              this.tmpvsemester
            );
    }
  }
  selectTab(e: any) {
    if (e.name === "selectedIndex") {
      if (this.tmpvstudentid && this.tmpvacadyear && this.tmpvsemester) {
        switch (e.value) {
          case 0:
            this.tabcurrent = 0;
            this.getEnrollResult(
              this.tmpvstudentid,
              this.tmpvacadyear,
              this.tmpvsemester
            );
            break;
          case 1:
            this.tabcurrent = 1;
            this.getClassTimeResult(
              this.tmpvstudentid,
              this.tmpvacadyear,
              this.tmpvsemester
            );
            break;
          case 2:
            this.tabcurrent = 2;
            this.getClassExamResult(
              this.tmpvstudentid,
              this.tmpvacadyear,
              this.tmpvsemester
            );
            break;
          case 3:
            this.tabcurrent = 3;
            this.getEnrollFeeResult(
              this.tmpvstudentid,
              this.tmpvacadyear,
              this.tmpvsemester
            );
            break;
          case 4:
            this.tabcurrent = 4;
            this.getScholarResult(
              this.tmpvstudentid,
              this.tmpvacadyear,
              this.tmpvsemester
            );
            break;
        }
      } else {
        this.alert.Showwarning("กรุณาเลือกสถานภาพรายภาค");
      }
    }
  }
  selectTab1(e: any) {
    if (e.name === "selectedIndex") {
      switch (e.value) {
        case 0:
          this.getSturecResult(this.tmpstudentid);

          break;

        case 5:
          this.getStugraResult(this.tmpstudentid);

          break;
      }
    }
  }
  selectenroll(e: any) {
    this.getEnrollResult(
      this.tmpvstudentid,
      this.tmpvacadyear,
      this.tmpvsemester
    );
  }
  selectclasstime(e: any) {
    this.getClassTimeResult(
      this.tmpvstudentid,
      this.tmpvacadyear,
      this.tmpvsemester
    );
  }
  getStudentinfo() {
    // console.log(this.studentcode)
    if (typeof this.studentcode == 'undefined' || this.studentcode == 'undefined' || this.util.ntb(this.studentcode)=="null") {
      // this.openformstudentsearch();
      // this.showSelector = true
      this.alert.MsgBoxCritical("กรุณาระบุรหัสนักศึกษา")
    } else {
      this.data
        .get("Prgstudentallinfo/Getviewstudentinfobystucode/" + this.studentcode)
        .then((resp: any) => {
          if (resp.length !== 0) {
            this.studentinfo = resp;
            // console.log(this.studentinfo)
            this.tmpvstudentid = resp[0].studentid;
            this.tmpstudentid = resp[0].studentid;
            this.tmpvschoid = resp[0].schoolid;
            this.tmpstudentcode = resp[0].studentcode;
            this.getStudentstatus(this.tmpstudentcode);
            // this.studentstatuslist = [];
            this.enrollresult = [];
            this.classtimeesult = [];
            this.classexamresult = [];
            this.enrollfeeresult = [];
            this.stuscholarresult = [];
            this.stureclist = [];
            this.stuaddlist = [];
            this.stugralist = [];
            if (this.tmpvschoid) this.getScho(this.tmpvschoid);
            this.getEntdeglist(resp[0].entrydegree);
            this.getStuaddResult(resp[0].studentid);
            this.getStustatuslist(resp[0].studentstatus);
            this.getGradeprolist(resp[0].gradepro);
            this.getSturecResult(resp[0].studentid);
            if (resp[0].officerid !== null) {
              // this.getOff1(resp[0].officerid);
              this.getOff1(resp[0].studentid);
            } else {
              this.getOff1(0);
            }
          } else {
            this.alert.Showwarning("ไม่พบข้อมูลนักศึกษา");
            this.studentinfo = [];
            this.studentstatuslist = [];
            this.enrollresult = [];
            this.classtimeesult = [];
            this.classexamresult = [];
            this.enrollfeeresult = [];
            this.stuscholarresult = [];
            this.stureclist = [];
            this.stuaddlist = [];
            this.stugralist = [];
          }
        });
    }
  }
  getScho(schoid: number) {
    this.data.get("Prgstudentallinfo/Getschobyid/" + schoid)
      .then((resp: any) => {
        this.schoclist = resp;
      });
  }
  getStudentstatus(stucode: string) {
    if(stucode){
      this.studentstatuslist = null;
      this.data.get("Prgstudentallinfo/Getstustabystucode/" + stucode).then(
        (resp: any) => {
          if (resp.length !== 0) {
            this.studentstatuslist = resp;
          } else {
            this.studentstatuslist = [];
          }
        });
    }
  }
  getOff1(offid: number) {
    this.data.get("Prgstudentallinfo/Getoffbyid/" + offid).then((resp: any) => {
      this.offlist1 = resp;
    });
  }
  getStustatuslist(stusta: number) {
    this.data
      .get(
        `Prgstudentallinfo/SysbytGetbycode/STUDENTSTATUS/STUDENTSTATUS/${stusta}`)
      .then((resp: any) => {
        this.stustatuslist = resp;
      });
  }
  getGradeprolist(gpro: number) {
    this.data
      .get("Prgstudentallinfo/SysbytGetbycode/STUDENTSTATUS/GRADEPRO/" + gpro)
      .then((resp: any) => {
        this.gradeprolist = resp;
      });
  }
  getEntdeglist(entdeg: string) {
    this.data
      .get("Prgstudentallinfo/Getentdegbycode/" + entdeg)
      .then((resp: any) => {
        this.entdeglist = resp;
      });
  }
  onRowPrepared(e: any) {
    if (e.rowType == "header") {
      e.rowElement.style.color = "#455344";
      e.rowElement.style.backgroundColor = "#cdeace";
    }
  }
  onRowPrepared2(e: any) {
    if (e.rowType == "header") {
      e.rowElement.style.color = "#455344";
      e.rowElement.style.backgroundColor = "#f4cacb";
    }
  }
  onRowPrepared3(e: any) {
    if (e.rowType == "header") {
      e.rowElement.style.color = "#455344";
      e.rowElement.style.backgroundColor = "#f4cacb";
    }
  }
  onRowPrepared4(e: any) {
    if (e.rowType == "header") {
      e.rowElement.style.color = "#455344";
      e.rowElement.style.backgroundColor = "#c1d6e9";
    }
  }
  cellTemplateGrade(c: any, e: any) {
    switch (e.value) {
      case "A":
        c.style.color = "#5F4B8B";
        break;
      case "B+":
        c.style.color = "#5671A9";
        break;
      case "B":
        c.style.color = "#00B5E0";
        break;
      case "C+":
        c.style.color = "#008753";
        break;
      case "C":
        c.style.color = "#A7CC23";
        break;
      case "D+":
        c.style.color = "#736355";
        break;
      case "D":
        c.style.color = "#a1968f";
        break;
      case "F":
        c.style.color = "#4B4B4B";
        break;
    }
    c.style.fontWeight = "bold";
    c.textContent = e.value;
    c.title = e.value;
  }
  customizeText(e: any) {
    return "รวม: " + e.value;
  }
  customizeTexta(e: any) {
    return "รวม: " + e.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
  customizeTextb(e: any) {
    return (
      "ค้างชำระ: " + e.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
    );
  }
  sumcreditattempt(e: any) {
    return "ลงรวม: " + e.value;
  }
  sumcreditsatisfy(e: any) {
    return "ผ่านรวม: " + e.value;
  }
  gridonToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift({
      location: "before",
      template: "heddershow",
    });
  }
  openformstudentsearch() {
    sessionStorage.setItem('prgform', sessionStorage.getItem('sysmenuid'));
    this.routes.navigate(['/15289']);
  }
  // onStudentSelected(code: string) {
  //   this.studentcode = code;
  // }
}