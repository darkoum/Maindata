// import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { Encrypt } from "src/app/shareds/encrypt";
import { UtilService } from "../../services/util.service";
import { AlertService } from "../../services/alert.service";
import { Router } from "@angular/router";
@Component({
    standalone: false,
  selector: "app-prgprerequisite",
  templateUrl: "./prgprerequisite.component.html",
  styleUrls: ["./prgprerequisite.component.css"],
})
export class PrgprerequisiteComponent implements OnInit {
  editmodeopen: boolean = false;
  courselist: any;
  revisionlist: any[] = [];
  feechargelist: any = [
    { feecharge: "Y", feechargedes: "Y : เก็บ" },
    { feecharge: "N", feechargedes: "N : ไม่เก็บ" },
  ];
  facultylist: any;
  coursetypelist: any;
  coursestatuslist: any = [
    { coursestatus: "O", coursestatusdes: "O : เปิด" },
    { coursestatus: "C", coursestatusdes: "C : ปิด" },
  ];
  combotypeid :any;
  combotypelist: any = [
    { comboid: 1, comboshow: "1 : วิชา" },
    { comboid: 2, comboshow: "2 : ระดับ" },
    { comboid: 3, comboshow: "3 : หลักสูตร" },
  ];

  prerequisitelist: any;
  prerequisitetypelist: any;
  prerequisiteCIDtypelist: any;
  prerequisiteCIDlist2: any;
  coursecode: any;
  revisioncode: any;
  itemcount: any;
  courseidx: any;
  selectedValue: any[] = [];
  comboprerequisitecourse: any = [];
  couid: any;
  coursename: any;
  coursenameeng: any;
  loadingVisible: boolean = false;
  coulist = [];
  cousta;
  facid: number = +sessionStorage.getItem("mafacultyid");
  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private util: UtilService,
    private alert: AlertService,
    private routes: Router
  ) {
    if (sessionStorage.getItem("coursecodesearch") != null) {
      this.coursecode = sessionStorage.getItem("coursecodesearch");
      //this.setRevisioncode();
      sessionStorage.removeItem("coursecodesearch");
    }
    this.setCellValuebytype = this.setCellValuebytype.bind(this);
    this.setcelltmptype = this.setcelltmptype.bind(this);
  }
  ngOnInit(): void {
    this.itemcount = 0;
    this.getCombo();
  }
  getCombo() {
    this.data
      .get("ComboSysbyt/getSysbytedes/PREREQUISITE/PREREQUISITECOURSEIDTYPE")
      .then((response: any) => {
        this.prerequisiteCIDtypelist = response;
      });
    this.data.get("ComboFac/All").then((resp: any) => {
      this.facultylist = resp;
      // console.log("facultylist",this.facultylist);
    });
    this.data
      .get("ComboSysbyt/getSysbytedes/COURSE/COURSETYPE")
      .then((response: any) => {
        this.coursetypelist = response;
      });
    this.data
      .get("ComboSysbyt/getSysbytedes/PREREQUISITE/PREREQUISITETYPE")
      .then((response: any) => {
        this.prerequisitetypelist = response;
      });
    this.data.getcombo(`ComboCou/Getallcombo`).then((resp: any) => {
      this.comboprerequisitecourse = resp;
      //console.log(resp)
      // console.log("comboprerequisitecourse",this.comboprerequisitecourse);
    });

    this.data.get("ComboSysbyt/getSysbytedes/COURSE/COURSESTATUS").then((resp: any) => {
        this.cousta = resp;
      });

  }
  // setRevisioncode() {
  //   if (this.util.ntb(this.coursecode) != "null") {
  //     this.coursecode = this.coursecode.trim();
  //     this.revisionlist = [];
  //     this.prerequisitelist = "";
  //     this.courselist = "";
  //     this.itemcount = 0;
  //     this.revisioncode = null;
  //     if (this.coursecode) {
  //       this.data
  //         .get(`Prgprerequisite/Getcoubycode/${this.coursecode}`)
  //         .then((resp: any) => {
  //           this.revisionlist = resp;
  //         });
  //     }
  //   } else {
  //     this.clearRevisioncode();
  //   }
  // }
  clearRevisioncode() {
    this.revisionlist = [];
    this.prerequisitelist = "";
    this.courselist = "";
    this.itemcount = 0;
    this.revisioncode = null;
  }


  // getCourse() {
  //   if (this.revisionlist.length > 0 && this.revisioncode) {
  //     this.courseidx = this.revisionlist?.filter(
  //       (item) => item.revisioncode == this.revisioncode
  //     )[0].courseid;
  //     this.data
  //       .get(`Prgprerequisite/Getprecourse/${this.courseidx}`)
  //       .then((resp: any) => {
  //         this.itemcount = Object.keys(resp).length;
  //         this.courselist = resp;
  //         this.getPrerequisite(resp[0].courseid);
  //         this.courseidx = resp[0].courseid;
  //       });
  //   }
  // }
  getpre(ctype: any) {
    this.data
      .get(`Prgprerequisite/Getbycoutypeonly/${ctype}`)
      .then((resp: any) => {
        this.prerequisiteCIDlist2 = resp;
      });
  }
  getPrerequisite(data: any) {
    this.data
      .get(`Prgprerequisite/Getprerbyid/${data}`)
      .then((response: any) => {
        this.prerequisitelist = response;
        // console.log("prerequisitelist",this.prerequisitelist);
      });
  }
  dataSave(data: any) {
    data.cancel = true;
    let parameter: any;
    if (data.changes.length != 0) {
      parameter = data.changes[0]["data"];
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keycourseid = data.changes[0]["key"].courseid;
          parameter.keyprerequisitegroup =
            data.changes[0]["key"].prerequisitegroup;
          parameter.keyprerequisitecourseid =
            data.changes[0]["key"].prerequisitecourseid;
          this.data.put("Prgprerequisite/Put", parameter).then((resp: any) => {
            this.getPrerequisite(this.courseidx);
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });
          break;
        case "insert":
          this.data
            .post("Prgprerequisite/Post", parameter)
            .then((resp: any) => {
              this.getPrerequisite(this.courseidx);
              this.alert.Showsuccess();
              data.component.cancelEditData();
            });
          break;

        case "remove":
          this.data
            .delete(
              "Prgprerequisite/Delete" +
                "/" +
                data.changes[0]["key"].courseid +
                "/" +
                data.changes[0]["key"].prerequisitegroup +
                "/" +
                data.changes[0]["key"].prerequisitecourseid
            )
            .then((resp: any) => {
              this.getPrerequisite(this.courseidx);
              this.alert.Showsuccess();
            });
          data.component.cancelEditData();
          break;
      }
    }
  }
  
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items[0].showText = "always";
    e.toolbarOptions.items.unshift({
      location: "before",
      template: "tableName",
    });
  }
  // onEditstart(e: any) {
  //   this.selectedValue = e.data.prerequisitecourseid;
  //   if (sessionStorage.getItem("editmodeopen") == "false") {
      
  //     sessionStorage.setItem("editmodeopen", "true");
  //   }
  // }
  
  onEditstart(e: any) {
    this.selectedValue = [];
    if (!this.editmodeopen) {
      this.selectedValue = e.data.prerequisitecourseid;
      this.editmodeopen = true;
    } else {
      this.alert.Warning(1);
      e.cancel = true;
    }
  }

  // onEditstart(e: any) {
  //   this.selectedValue = [];
  //   if (!this.editmodeopen) {
  //     this.selectedValue = e.data.prerequisitecourseid;
  //     this.editmodeopen = true;
  //   } else {
  //     this.alert.Warning(1);
  //     e.cancel = true;
  //   }
  // }

  onCancelEditmode() {
    this.editmodeopen = false;
  }

  onInsertingstart(e: any) {
    e.data.prerequisitegroup = 1;
    e.data.gradepointmin = 1;
    e.data.prerequisitetype = "P";
    e.data.courseid = this.courseidx;
    if (sessionStorage.getItem("editmodeopen") == "false") {
      sessionStorage.setItem("editmodeopen", "true");
    } else {
      this.alert.Warning(1);
      e.cancel = true;
    }
  }
  updateCourse(eventData: any, cellInfo: any) {
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  selectionChanged(data: any) {
    if (!this.editmodeopen) {
    } else {
      this.alert.Warning(1);
    }
  }

  async setcelltmptype(newData: any, value: any, currentRowData: any) {
    let key = this.comboprerequisitecourse.store.filter((coursecode: any) => {
      return coursecode.keystr1id === value;
    })[0].comboid;
    newData.prerequisitecourseid = key;
    // newData.prerequisitecourseid = value;

    // let key = this.comboprerequisitecourse.store.filter((course: any) => {
    //   return course.keystr1id === value;
    // })[0].keystr1id;

    // let key = this.comboprerequisitecourse.filter((course: any) => {
    //   return course.keystr1id === value;
    // })[0].combogroup;

    // key = 1501100
    // console.log("key",key)
    // newData.prerequisitecourseid = key;
    // console.log("newData",newData)
  }

  async setCellValuebytype(newData: any, value: any, currentRowData: any) {
    newData.prerequisitecourseidtype = value;
    newData.prerequisitecourseid = null;
    newData.prerequisitecourseid = await this.getpre(value);
  }


  onFieldBlur(data: any, field1: string, field2: string): void {
    // Update your backend API with the modified data
    const courseid = { [field1]: data[field1] };
    const updatedData = { [field2]: data[field2] };
    // data.prerequisitenote = "test"
    let parameters = {
      courseid: courseid.courseid,
      prerequisitenote: updatedData.prerequisitenote,
    };
    this.data.put(`Prgprerequisite/Putnote`, parameters).then((resp: any) => {
      data.prerequisitenote = updatedData.prerequisitenote;
    });
  }
  openformcoursesearch() {
    sessionStorage.setItem("prgform", sessionStorage.getItem("sysmenuid"));
    this.routes.navigate(["/15320"]);
  }
  onSearch() {
    this.prerequisitelist = [];
    this.loadingVisible = true;
    if(this.util.ntz(this.facid) != -9 || this.util.ntb(this.couid) != 'null' || this.util.ntb(this.coursename) != 'null'){
      this.data
        .get("Prgcourse/Getbyfac/" + this.util.ntz(this.facid) + "/" + this.util.ntb(this.couid) + "/" + this.util.ntb(this.coursename))
        .then((resp: any) => {
          if (resp.length !== 0) {
            this.coulist = resp;
          } else {
            this.alert.Showwarning("ไม่พบข้อมูล");
            this.coulist = [];
          }
          this.loadingVisible = false;
        });
    } else {
      this.alert.Showwarning("กรุณาระบุ วิทยาลัย/คณะ/สถาบัน รหัสวิชา หรือชื่อวิชา");
        this.loadingVisible = false
    }
  }
  selectionChange(e) {
    if (this.util.ntb(e.selectedRowKeys[0].coursecode) != "null") {
      // this.tmpcouidcopy = e.selectedRowKeys[0].courseid;
      this.coursecode = e.selectedRowKeys[0].coursecode;
      // console.log("courseid",e.selectedRowKeys[0].courseid)
      // this.getFeeAdjust(this.coursecode);
      this.data.get(`Prgprerequisite/Getprecourse/${e.selectedRowKeys[0].courseid}`).then((resp: any) => {
          this.itemcount = Object.keys(resp).length;
          this.courselist = resp;
          this.getPrerequisite(resp[0].courseid);
          this.courseidx = resp[0].courseid;
        });
    }
  }
}
