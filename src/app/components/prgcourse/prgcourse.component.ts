import { Component, OnInit } from "@angular/core";
import { HttpService } from "./../../services/http.service";
import { locale} from "devextreme/localization";
import { AlertService } from "./../../services/alert.service";
import { UtilService } from "../../services/util.service";
import { Router } from "@angular/router";

@Component({
    standalone: false,
  selector: "app-prgcourse",
  templateUrl: "./prgcourse.component.html",
  styleUrls: ["./prgcourse.component.css"],
})
export class PrgcourseComponent implements OnInit {
  coulist: any[] = [];
  coulist2: any[] = [];
  coutyp: any;
  cousta: any;
  // coupre: any;
  // couver: any;
  cougro: any;
  // levshow: any;
  facshow: any[] = [];
  // degshow: any;
  depshow: any;
  // depfacshow: any;
  stdcod: any;
  gm: any;
  defclass: any;
  // procodshow: any;
  editmodeopen: boolean = false;
  facid: number = +sessionStorage.getItem("mafacultyid");
  couid: string;
  coursename: string;
  coursenameeng: string;
  couoldid: number;
  counewid: string;
  versionnew: string;
  popupVisible = false;
  courseloaded = true;
  isDropDownBoxOpened = false;
  // gridBoxValue: any[] = [];
  selectedCourse: any[] = [];
  selectedValue: any[] = [];
  courselang: any;
  infogrpcd: any;
  tmpcouidcopy: any;
  feeadjust: any = [];
  coursecode: string = "";
  revisioncode: string = "";
  combofeegrouplist: any = [];
  combofeelist: any = [];

  sumflaglist: any = [
    { id: "Y", name: "Y : รวมทุกวิชา" },
    { id: "N", name: "N : แยกรายวิชา" },
  ];

  yn = [
    { id: "Y", name: "Y : เก็บ" },
    { id: "N", name: "N : ไม่เก็บ" },
    // ...
  ];
  yn2 = [
    { id: "Y", name: "Y : เปิด" },
    { id: "N", name: "N : ปิด" },
    // ...
  ];
  // yn3 = [
  //   { id: "Y", name: "Y : คำนวณ" },
  //   { id: "N", name: "N : ไม่คำนวณ" },
  //   // ...
  // ];
  yn4 = [
    { id: "Y", name: "Y : แสดง" },
    { id: "N", name: "N : ไม่แสดง" },
    // ...
  ];
  ip = [
    { id: "I", name: "IP" },
    { id: "IP", name: "I" },
    // ...
  ];
  loadingVisible: boolean = false;
  loadingVisiblefee: boolean = false;

  constructor(
    private data: HttpService,
    private alert: AlertService,
    private util: UtilService,
    private routes: Router
  ) {
    locale("th");
  }
  ngOnInit(): void {
    this.getCombo();
    this.getFilteredDep = this.getFilteredDep.bind(this);
    //this.getInfogrpcd();
  }
  getCombo() {
    this.data.get("ComboDep/All").then((resp: any) => {
      this.depshow = resp;
    });
    this.data.getcombo("ComboFac/All").then((resp: any) => {
      this.facshow = resp;
    });
    this.data
      .get("ComboSysbyt/getSysbytedes/COURSE/STUDYCODE")
      .then((resp: any) => {
        this.stdcod = resp;
      });
    this.data
      .get("ComboSysbyt/getSysbytedes/COURSE/COURSEGROUP")
      .then((resp: any) => {
        this.cougro = resp;
      });
    this.data
      .get("ComboSysbyt/getSysbytedes/CLASS/CLASSSTATUS")
      .then((resp: any) => {
        this.defclass = resp;
      });
    this.data
      .get(
        "ComboSysbyt/getSysbytedes/GRADECONFIG/GRADEMODE"
      )
      .then((resp: any) => {
        this.gm = resp;
      });
    this.data
      .get("ComboSysbyt/getSysbytedes/COURSE/COURSESTATUS")
      .then((resp: any) => {
        this.cousta = resp;
      });
    this.data
      .get(
        "ComboSysbyt/getSysbytedes/COURSE/COURSELANGUAGE"
      )
      .then((resp: any) => {
        this.courselang = resp;
      });
    this.data
      .get("ComboSysbyt/getSysbytedes/COURSE/COURSETYPE")
      .then((resp: any) => {
        this.coutyp = resp;
      });
    this.data.getcombo("ComboCou/Combocouopenwithcredit").then((resp: any) => {
      this.coulist2 = resp;
      this.courseloaded = false;
    });
    this.data.getcombo(`ComboFeegro/All`).then(async (resp: any) => {
      this.combofeegrouplist = await resp;
    });
    this.data.getcombo(`ComboFee/All`).then(async (resp: any) => {
      this.combofeelist = await resp;
    });
  }
  changeDropDownBoxValue(args: any) {
    this.selectedValue = this.selectedCourse[0].courseid;
    this.isDropDownBoxOpened = false;
  }
  getFilteredDep(options: any) {
    return {
      store: this.depshow,
      filter: options.data ? ["key1id", "=", options.data.facultyid] : null,
    };
  }
  setdepid(rowData: any, value: any): void {
    rowData.departmentid = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  onEditorPreparing(e: any) {
    if (e.parentType === "dataRow" && e.dataField === "departmentid") {
      e.editorOptions.disabled = typeof e.row.data.facultyid !== "number";
    }
  }
/*   getInfogrpcd() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/COURSE/INFOGRP_CD")
      .then((resp: any) => {
        this.infogrpcd = resp;
      });
  } */
  getDefault(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      e.data.studycode1 = "C";
      e.data.studycode2 = "L";
      e.data.studycode3 = "S";
      e.data.grademode = "GD";
      e.data.coursetype = "N";
      e.data.defaultclassstatus = "W";
      e.data.coursestatus = "O";
      e.data.feecharge = "Y";
      e.data.transcriptshow = "Y";
      e.data.evaluateflag = "Y";
      e.data.creditmin = 3;
      e.data.creditmax = 3;
      e.data.facultyid = this.facid;
      sessionStorage.setItem("editmodeopen", "true");
    } else {
      e.cancel = true;
    }
  }
/*   getDefaultadjust(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      e.data.courseid = this.tmpcouidcopy;
    } else {
      e.cancel = true;
    }
  } */
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items[0].showText = "always";
    var toolbarItems = e.toolbarOptions.items;

    e.toolbarOptions.items.unshift({
      location: "before",
      template: "tableName1",
    });
    if (this.facid == null || this.facid == undefined) {
      $.each(toolbarItems, function (_, item) {
        if (item.name === "addRowButton") {
          item.options.onClick = function (args: any) {
            alert("กรุณาเลือกวิทยาลัย/คณะ/สถาบัน");
          };
        }
      });
    }
  }
  onToolbarPreparingCoat(e: any) {
    e.toolbarOptions.items[0].showText = "always";
    var toolbarItems = e.toolbarOptions.items;
    e.toolbarOptions.items.unshift({
      location: "before",
      template: "tableName",
    });
  }
  dataSave(data: any) {
    let parameter: any;
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]["data"];
      
      // console.log("param",parameter);
      // return
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.gridname = "course";
          parameter.keycourseid = data.changes[0]["key"].courseid;
          // if(parameter?.coursenameeng){
          //   parameter.coursenameeng =  parameter?.coursenameeng.toUpperCase();
          // }
          this.data.put("Prgcourse/Put", parameter).then((resp: any) => {
            // this.onSearch();
            // this.alert.Showsuccess();
            // data.component.cancelEditData();
            if(resp.result > 0){
              this.onSearch()
              this.alert.Showsuccess();
              data.component.cancelEditData();
            } else {
              this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.message);
            }
          });
          break;
        case "insert":
          parameter.gridname = "course";
          // if(parameter?.coursenameeng){
          //   parameter.coursenameeng =  parameter?.coursenameeng.toUpperCase();
          // }
          this.data.post("Prgcourse/Post", parameter).then((resp: any) => {
            if(resp.result > 0){
              this.onSearch()
              this.alert.Showsuccess();
              data.component.cancelEditData();
            } else {
              this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.message);
            }
          });
          break;
        case "remove":
          if (this.feeadjust.length <= 0) {
            this.data
              // .delete("prgcourse/Delete" + "/" + data.changes[0]["key"].courseid)
              .delete(
                `Prgcourse/Delete/${this.util.ntz(
                  data.changes[0]["key"].courseid
                )}/${this.util.ntz(
                  data.changes[0]["key"].feegroupid
                )}/${this.util.ntz(data.changes[0]["key"].feeid)}`
              )
              .then((resp: any) => {
                  if(resp.result > 0){
                    this.onSearch()
                    this.alert.Showsuccess();
                    data.component.cancelEditData();
                  } else {
                    this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.message);
                  }
                });
          } else {
            this.alert.Showwarning(
              `ไม่สามารถลบรายวิชาได้ เนื่องจากมีการปรับค่าค่าธรรมเนียม`
            );
          }
          break;
      }
    } else {
      this.editmodeopen = false;
    }
  }
  adjustSave(data: any) {
    let parameter: any;
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]["data"];
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.gridname = "coursefeeadjust";
          parameter.keycourseid = data.changes[0]["key"].courseid;
          parameter.keyfeegroupid = data.changes[0]["key"].feegroupid;
          parameter.keyfeeid = data.changes[0]["key"].feeid;
          this.data.put("Prgcourse/Put", parameter).then((resp: any) => {
            // this.onSearch();
            // this.alert.Showsuccess();
            // data.component.cancelEditData();
            if(resp.result > 0){
              this.onSearch()
              this.alert.Showsuccess();
              data.component.cancelEditData();
            } else {
              this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.message);
            }
            this.getFeeAdjust(this.coursecode,this.revisioncode);
          });
          break;
        case "insert":
          parameter.gridname = "coursefeeadjust";
          parameter.courseid = this.tmpcouidcopy;
          parameter.feegroupid = -1;
          this.data.post("Prgcourse/Post", parameter).then((resp: any) => {
            // this.onSearch();
            // this.alert.Showsuccess();
            // data.component.cancelEditData();
            if(resp.result > 0){
              this.onSearch()
              this.alert.Showsuccess();
              data.component.cancelEditData();
            } else {
              this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.message);
            }
            this.getFeeAdjust(this.coursecode,this.revisioncode);
          });
          break;
        case "remove":
          this.data
            .delete(
              `Prgcourse/Delete/${this.util.ntz(
                data.changes[0]["key"].courseid
              )}/${this.util.ntz(
                data.changes[0]["key"].feegroupid
              )}/${this.util.ntz(data.changes[0]["key"].feeid)}`
            )
            .then(
              (resp: any) => {
                // this.onSearch();
                // this.alert.Showsuccess();
                // data.component.cancelEditData();
                if(resp.result > 0){
                  this.onSearch()
                  this.alert.Showsuccess();
                  data.component.cancelEditData();
                } else {
                  this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.message);
                }
                this.getFeeAdjust(this.coursecode,this.revisioncode);
              },
              (error: any) => {
                data.component.cancelEditData();
              }
            );
          break;
      }
    } else {
      this.editmodeopen = false;
    }
  }
  onSearch() {
      this.feeadjust = [];
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
          this.loadingVisible = false
        });
      } else {
        this.alert.Showwarning("กรุณาระบุ วิทยาลัย/คณะ/สถาบัน รหัสวิชา หรือชื่อวิชา");
        this.loadingVisible = false
        
      }
      
  }
  getFeeAdjust(coursecode: string,revisioncode: string) {
     //console.log("revisioncode",coursecode,revisioncode)
    //this.loadingVisiblefee = true
    this.data.get(`Prgcourse/Getfeeadjust/${coursecode}/${revisioncode}`).then((resp: any) => {
      this.feeadjust = resp
      //this.loadingVisiblefee = false
      //console.log("feeadjust", this.feeadjust)
    });
  }
  showCopy() {
    this.loadingVisible = true;
    this.data.getcombo("ComboCou/Combocouopenwithcredit").then((resp: any) => {
      this.coulist2 = resp;
      this.popupVisible = true;
      this.couoldid = this.tmpcouidcopy;
      this.counewid = null;
      this.versionnew = null;
      this.loadingVisible = false;
    });

  }
  onCopy() {
    if (!this.couoldid || !this.counewid || !this.versionnew){
        this.alert.MsgBoxInformation("กรุณาระบุข้อมูลการคัดลอกให้ครบทั้ง 3 ช่อง"); 
    }else{
      let strwhere = "coursecode='" + this.counewid + "'";
      let parameter: any;
      this.data.put('Prgcourse/Putcopy/' + this.couoldid + '/' + this.counewid + '/' + this.versionnew, parameter).then((resp:any) => {
              this.popupVisible = false;
              this.tmpcouidcopy = '';
              this.onSearch();
      });
    }
  }

  onContentReadyHandler(e: any) {
    // this.loadingVisible = false;
  }
  selectionChange(e) {
    if (this.util.ntb(e.selectedRowKeys[0]?.coursecode) != "null") {
      this.tmpcouidcopy = e.selectedRowKeys[0].courseid;
      this.coursecode = e.selectedRowKeys[0].coursecode;
      this.revisioncode = e.selectedRowKeys[0].revisioncode;
      this.getFeeAdjust(this.coursecode,this.revisioncode);
    }
  }
  popup_hidden(e) {
    this.tmpcouidcopy = "";
  }
  // callform(e) {
  //   sessionStorage.setItem("coursecodesearch", e.data.coursecode);
  //   this.routes.navigate(["/" + sessionStorage.getItem("prgform")]);
  //   sessionStorage.removeItem("prgform");
  // }
}
