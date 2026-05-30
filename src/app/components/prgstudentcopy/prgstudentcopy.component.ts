import { Component, OnInit } from "@angular/core";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { AlertService } from "src/app/services/alert.service";
import { HttpService } from "./../../services/http.service";
import { formatDate } from "@angular/common";
import { locale } from "devextreme/localization";
import { UtilService } from "src/app/services/util.service";
import { filter } from 'rxjs/operators';

@Component({
    standalone: false,
  selector: "app-prgstudentcopy",
  templateUrl: "./prgstudentcopy.component.html",
  styleUrls: ["./prgstudentcopy.component.css"],
})
export class PrgstudentcopyComponent implements OnInit {
  load = false;
  studentcodeold: any;
  studentcodenew: any;
  studentlist: any;
  student: any;

  statuslist: any;
  // studentstatus = "64";
  studentstatus: any = 64;

  studentgroup = null;
  groupyear: any;
  studentcode: any;
  campusid = 1;
  facultyid: any;
  levelid: any;

  campuslist: any;
  facultylist: any;
  levellist: any;
  studentgrouplist: any;
  oldstudentid: any;
  studentid: any;

  chkbutton = false;
  appacadyear: any;
  appsemester: any;
  appdate: any;

  selectedKeys: any;
  tasks: DataSource;
  newcourse: DataSource;
  selectAllModeVlaue: string = "allPages";
  selectionModeValue: string = "all";
  oldstudentstatus: number;
  popupVisible = false;
  transferedlist: any;
  searchstudentcode: string;
  amountoldcourse: number = 0;
  amounttransfercourse: number = 0;
  constructor(
    private data: HttpService,
    private alert: AlertService,
    private util: UtilService
  ) {
    locale("th");
  }
ngOnInit(): void {
    this.getCombo();
    // this.studentcodeold = '63130042878'
    // this.studentcodeold = '5291400568';
    // this.studentcodeold = '67150040018';
  }
  getCombo() {
    this.data
      .getcombo("ComboSysByt/getSysbytedesnum/STUDENTSTATUS/STUDENTSTATUS")
      .then((rep: any) => {
        this.statuslist = rep;
      });
    this.data.getcombo("ComboCam/All").then((rep: any) => {
      this.campuslist = rep;
    });
    this.data.getcombo("ComboFac/All").then((rep: any) => {
      this.facultylist = rep;
    });
    this.data.getcombo("ComboLev/All").then((rep: any) => {
      this.levellist = rep;
    });
  }

  getstudentgroup(): void {
    this.studentgrouplist = null;
    this.data
      .getcombo(
        "ComboStuset/Camfaclev/" +
          this.util.ntz(this.campusid) +
          "/" +
          this.util.ntz(this.levelid) +
          "/" +
          this.util.ntz(this.facultyid) +
          "/" +
          this.util.ntb(this.groupyear)
      )
      .then((rep: any) => {
        this.studentgrouplist = rep;
        //console.log(response);
      });
  }
  
  getstudent(): void {
    if (this.studentcodeold) {
      this.load = true;
      this.studentcode = null;
      this.studentcodenew = null;
      this.chkbutton = false;
      this.student = null;
      this.data.get("Prgstudentcopy/Getviewstudentinfobystucode/" + this.studentcodeold)
        .then(async (rep: any) => {
          this.studentlist = rep[0];
          if (rep[0]) {
            this.oldstudentid = rep[0].studentid;
            this.oldstudentstatus = rep[0].studentstatus;
            //for set studentstatus change status after transfer
            //this.studentstatus= rep[0].studentstatus;
            await this.getoldstudentcode(rep[0].studentid);
            await this.getcouesrold(rep[0].studentid);
          } else {
            this.alert.Showerror("เกิดข้อผิดพลาด");
          }
          this.load = false;
        });
    }
  }
  getoldstudentcode(oldstudentid: any) {
    this.data.get("Prgstudentcopy/Getbyid/" + oldstudentid).then((rep: any) => {
      if (rep[0]) {
        this.data.get("Prgstudentcopy/Getviewstudentinfobystucode/" + rep[0].studentcode)
        .then((repx: any) => {
          if (repx[0]) {
            this.student = repx[0];
          }
        });
        this.chkbutton = true;
        this.studentcode = rep[0].studentcode;
        this.studentid = rep[0].studentid;
        this.getcouesrnew(rep[0].studentid);
      }
    });
  }
  getcouesrnew(oldstudentid: any) {
    this.newcourse = null;
    this.data
      .get("Prgstudentcopy/Getenrsumbyid/" + oldstudentid)
      .then((rep: any) => {
        //console.log(rep);
        this.amounttransfercourse = rep?.length;
        if (rep) {
          this.newcourse = new DataSource({
            store: new ArrayStore({
              key: "id",
              data: rep,
            }),
          });
        }
      });
  }
  getcouesrold(oldstudentid: any) {
    this.data
      .get("Prgstudentcopy/Getenrsumbyid/" + oldstudentid)
      .then((rep: any) => {
        this.amountoldcourse = rep?.length;
        if (rep) {
          this.tasks = new DataSource({
            store: new ArrayStore({
              key: "id",
              data: rep,
            }),
          });
          // console.log(this.tasks);
        }
      });
  }
  getnewstudent(): void {
    if (this.studentcodenew) {
      this.studentid = null;
      this.data
        .get(
          "Prgstudentcopy/Getviewstudentinfobystucode/" + this.studentcodenew
        )
        .then((rep: any) => {
          //console.log(rep);
          if (rep[0]) {
            this.studentid = rep[0].studentid;
          } else {
            this.alert.MsgBoxCritical("ไม่พบรหัสนักศึกษา");
          }
        });
    }
  }
  gettransferedlist(){
    this.data.get('Prgstudentcopy/Gettransferedlist/'+this.searchstudentcode).then((rep:any) => {
      this.transferedlist = rep[0];
      // console.log(this.transferedlist)
    });
  }

  getstudentcode(): void {
    if (this.studentgroup) {
      this.data
        .get(
          "Prgstudentcopy/Getbystugroup/" +
            this.groupyear +
            "/" +
            this.studentgroup
        )
        .then((rep: any) => {
          //console.log(rep);
          this.studentcode = rep[0].studentcode;
        });
    }
  }

  gennewstudent(): void {
    //console.log("xxxxx");
    if(this.oldstudentstatus != 10){
      this.alert.MsgBoxCritical('นักศึกษาไม่อยู่ในสถานะปกติ ไม่สามารถทำรายการได้');
      return
    }
    if(!this.campusid){
      this.alert.MsgBoxCritical('กรุณาเลือกศูนย์/วิทยาเขต')
      return
    }
    if(!this.facultyid){
      this.alert.MsgBoxCritical('กรุณาเลือกวิทยาลัย/คณะ/สถาบัน')
      return
    }
    if(!this.levelid){
      this.alert.MsgBoxCritical('กรุณาเลือกระดับชั้น')
      return
    }
    if (!this.studentgroup) {
      this.alert.MsgBoxCritical("กรุณาระบุรุ่นกลุ่มเรียนนักศึกษา");
    } else {
      if (!this.studentcode) {
        this.alert.MsgBoxCritical("กรุณาระบุรหัสนักศึกษา");
      } else {
        if(!this.studentstatus){
          // console.log(this.statuslist)
          var resstatus = this.alert.MsgBoxQuestion(
            "ท่านยังไม่ได้กำหนดสถานะนักศึกษาหลังโอน หากไม่กําหนดสถานะนักศึกษาจะถูกกําหนดเป็น "+this.statuslist.store.filter(x => x.comboid == this.oldstudentstatus)[0].comboshow+" (สถานะเดิมของนักศึกษา) ใช่หรือไม่"
          );
          resstatus.show().then((rep) => {
          if (rep.value === "Y") {
            this.load = true;
            this.data
              .put(
                "Prgstudentcopy/Putcopy/" +
                  this.oldstudentid +
                  "/" +
                  this.studentcode +
                  "/" +
                  this.groupyear +
                  "/" +
                  this.studentgroup +
                  "/" +
                  this.oldstudentstatus,
                  // "/" +
                  // this.appacadyear +
                  // "/" +
                  // this.appsemester +
                  // "/" +
                  // formatDate(this.appdate, "yyyy-MM-dd", "en-US"),
                "{}"
              )
              .then((resp: any) => {
                this.load = false;
                this.getoldstudentcode(this.oldstudentid);
                if (resp.result.error) {
                  this.alert.Showerror(
                    "ทำรายการไม่สำเร็จ " + resp.result.error
                  );
                } else {
                  this.alert.Showsuccess();
                }
              });
            this.load = false;
          }
        });
        } else {
          var result = this.alert.MsgBoxQuestion(
            "ต้องการสร้างนักศึกษาใหม่ใช่หรือไม่"
          );
          result.show().then((rep) => {
            if (rep.value === "Y") {
              this.load = true;
              this.data
                .put(
                  "Prgstudentcopy/Putcopy/" +
                    this.oldstudentid +
                    "/" +
                    this.studentcode +
                    "/" +
                    this.groupyear +
                    "/" +
                    this.studentgroup +
                    "/" +
                    this.studentstatus,
                    // "/" +
                    // this.appacadyear +
                    // "/" +
                    // this.appsemester +
                    // "/" +
                    // formatDate(this.appdate, "yyyy-MM-dd", "en-US"),
                  "{}"
                )
                .then((resp: any) => {
                  this.load = false;
                  this.getoldstudentcode(this.oldstudentid);
                  if (resp.result.error) {
                    this.alert.Showerror(
                      "ทำรายการไม่สำเร็จ " + resp.result.error
                    );
                  } else {
                    this.alert.Showsuccess();
                  }
                });
              this.load = false;
            }
          });
        }
      }
    }
  }

  copycourse(): void {
    var result = this.alert.MsgBoxQuestion("รายวิชาที่สามารถทำการโอนย้ายได้ จะต้องได้รับเกรด C ขึ้นไป ต้องการทําการโอนย้ายใช่หรือไม่");
    result.show().then((rep: any) => {
      if (rep.value === "Y") {
        this.load = true;
        this.data
          .put(
            "Prgstudentcopy/Putset/" +
              this.oldstudentid +
              "/" +
              this.studentid +
              "/I",
            "{}"
          )
          .then((resp: any) => {
            this.getcouesrnew(this.studentid);
            if (resp.result.error) {
              this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.result.error);
            } else {
              this.alert.Showsuccess();
            }
            this.load = false;
          });
      }
    });
    // this.selectedKeys.forEach(data => {

    //   console.log(data);

    // });
  }

  deletecourse(): void {
    var result = this.alert.MsgBoxQuestion("ต้องการลบรายวิชาใช่หรือไม่");
    result.show().then((rep: any) => {
      if (rep.value === "Y") {
        this.load = true;
        this.data.put("Prgstudentcopy/Putset/" + this.oldstudentid + "/" + this.studentid + "/D", "{}")
          .then((resp: any) => {
            this.getcouesrnew(this.studentid);
            //console.log(resp);
            if (resp.result.error) {
              this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.result.error);
              this.load = false;
            } else {
              this.alert.Showsuccess();
              this.load = false;
            }
          });
      }
    });
  }

  updatecourse(): void {
    var result = this.alert.MsgBoxQuestion("ยืนยันปรับปรุงเกรดใช่หรือไม่");
    result.show().then((rep: any) => {
      if (rep.value === "Y") {
        this.load = true;
        this.data
          .put(
            "Prgstudentcopy/Putset/" +
              this.oldstudentid +
              "/" +
              this.studentid +
              "/U",
            "{}"
          )
          .then((resp: any) => {
            this.getcouesrnew(this.studentid);
            //this.Showerror('ทำรายการสำเร็จ', 'success');
            //console.log(resp);
            if (resp.result.error) {
              this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.result.error);
            } else {
              this.alert.Showsuccess();
            }
            this.load = false;
          });
      }
    });
  }

  updatestudentid(): void {
    var result = this.alert.MsgBoxQuestion(
      "ยืนยันการผูกรหัสนักศึกษาใช่หรือไม่"
    );
    result.show().then((rep: any) => {
      if (rep.value === "Y") {
        this.data
          .put(
            "Prgstudentcopy/Putstumas/" +
              this.oldstudentid +
              "/" +
              this.studentid,
            "{}"
          )
          .then((resp: any) => {
            //this.Showerror('ทำรายการสำเร็จ', 'success');
            //console.log(resp);
            if (resp.result.error) {
              this.alert.Showerror("ทำรายการไม่สำเร็จ " + resp.result.error);
            } else {
              this.getstudent();
              this.alert.Showsuccess();
            }
          });
      }
    });
  }

  // CopyCourseid(item: any) {
  //   this.data
  //     .put(
  //       "Prgstudentcopy/PutcopyCouseid/" +
  //         this.oldstudentid +
  //         "/" +
  //         this.student.studentid +
  //         "/" +
  //         item.id,
  //       "{}"
  //     )
  //     .then((rep: any) => {
  //       this.getcouesrnew(this.student.studentid);
  //     });
  // }
}
