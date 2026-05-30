import { filter } from "rxjs/operators";
import { locale } from "devextreme/localization";
import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { Encrypt } from "src/app/shareds/encrypt";
import notify from "devextreme/ui/notify";
import { AlertService } from "src/app/services/alert.service";
import { UtilService } from "src/app/services/util.service";
import { DxDataGridComponent } from "devextreme-angular";
@Component({
    standalone: false,
  selector: "app-prgstudentgroup",
  templateUrl: "./prgstudentgroup.component.html",
  styleUrls: ["./prgstudentgroup.component.css"],
})
export class PrgstudentgroupComponent implements OnInit {
  @ViewChild("dataGridRef", { static: false }) dataGrid: DxDataGridComponent;
  param = {} as any;
  paramto = {} as any;
  campusdata: any[] = [];
  campusdatato: any[] = [];

  lvldata: any[] = [];
  facdata: any[] = [];
  studentgrouplist: any[] = [];
  studentgrouplistto: any[] = [];
  statuslist: any[] = [];
  stuentsexlist: any[] = [];
  lstEntryType: any[] = [];
  lstEntryDegree: any[] = [];

  campusid: number = +sessionStorage.getItem("macampusid");
  facultyid: number = +sessionStorage.getItem("mafacultyid");
  levelid: number = +sessionStorage.getItem("malevelid");
  studentgroup: number;
  groupyear: number;
  studentstatus: number = 10;
  studentstatusto: number = 10;
  campusidto: number = +sessionStorage.getItem("macampusid");
  groupyearto: number;
  studentgroupto: number = 0;
  vbytecode: any;
  rules: any;
  admitacadyear: number;
  admitacadyearto: number;
  stugroupall: any;
  stugroup: any;
  stugroupto: any;
  stugrouptest: any;
  editmodeopen: any;
  tmpcampusid: any;
  veiwstudentlist: any;
  grouplist: any = [];
  grouplistto: any = [];
  grouplistbygroupyear: any = [];
  grouplistbygroupyearto: any = [];
  actiontypelst: any;

  constructor(
    private http: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService
  ) {
    locale("th");
    this.rules = { X: /[02-9]/ };
  }

  ngOnInit(): void {
    this.getCampus();
    this.getCampusto();
    this.getLvl();
    this.getFac();
    this.getStatus();
    this.getActionType();
    this.getStudentSex();
  }

  getFilteredstugroup() {
    if (
      this.util.ntz(this.campusid) !== -9 &&
      this.util.ntz(this.levelid) !== -9 &&
      this.util.ntz(this.facultyid) !== -9 &&
      this.util.ntb(this.groupyear) !== "null"
    ) {
      this.stugroup = this.stugroupall.filter(
        (item: any) =>
          item.groupyear == this.groupyear &&
          item.campusid == this.campusid &&
          item.levelid == this.levelid &&
          item.facultyid == this.facultyid
      );
    } else {
      this.stugroup = [];
    }
  }
  getFilteredstugroup2() {
    if (
      this.util.ntz(this.campusid) !== -9 &&
      this.util.ntb(this.groupyear) !== "null"
    ) {
      this.stugroupto = this.stugroupall.filter(
        (item: any) =>
          item.groupyear == this.groupyearto && item.campusid == this.campusidto
      );
    } else {
      this.stugroupto = [];
    }
  }
  getgrouplist() {
    if (this.admitacadyear > 0) {
      this.http
        .getcombo(
          "ComboStuset/Camfaclevadmit/-9/-9/" +
            this.util.ntz(this.admitacadyear) +
            "/" +
            this.util.ntz(this.facultyid) +
            "/" +
            this.util.ntz(-1) +
            "/" +
            this.util.ntz(-1)
        )
        .then((rep: any) => {
          this.grouplist = rep;
        });
    } else {
      this.grouplist = [];
    }
  }
  getgrouplistto() {
    if (this.admitacadyearto > 0) {
      this.http
        .get(
          "ComboStuset/Camfaclevadmit/" +
            this.util.ntz(this.campusidto) +
            "/-9/" +
            this.util.ntz(this.admitacadyearto) +
            "/-1/" +
            this.util.ntz(-9) +
            "/" +
            this.util.ntz(-9)
        )
        .then((rep: any) => {
          if (rep.length > 0) {
            for (let i = 0; i < rep.length; i += 1) {
              this.grouplistto.push({
                comboid: rep[i].comboid,
                comboshow: rep[i].comboshow,
                keystr1id: rep[i].keystr1id,
              });

              if (i == 0) {
                this.grouplistto = [];
              }
            }
          }
        });
    } else {
      this.grouplistto = [];
    }
  }

  getgrouplistbygroupyear() {
    if (
      this.util.ntz(this.campusid) != -9 &&
      this.util.ntz(this.levelid) != -9 &&
      this.util.ntz(this.facultyid) != -9 &&
      this.util.ntb(this.groupyear) != "null"
    ) {
      this.http
        .getcombo(
          "ComboStuset/byCamLevFacGroupyear/" +
            this.campusid +
            "/" +
            this.levelid +
            "/" +
            this.facultyid +
            "/" +
            this.groupyear
        )
        .then((resp: any) => {
          this.grouplistbygroupyear = resp;
        });
    }
  }

  getgrouplistbygroupyearto() {
    this.http
      .getcombo("ComboStuset/bygropyear/" + this.util.ntz(this.groupyearto))
      .then((resp: any) => {
        this.grouplistbygroupyearto = resp;
      });
  }

  getCampus() {
    this.http.getcombo("ComboCam/All").then((resp: any) => {
      this.campusdata = resp;
    });
  }

  getCampusto() {
    this.http.getcombo("ComboCam/All").then((resp: any) => {
      this.campusdatato = resp;
    });
  }

  getLvl() {
    this.http.getcombo("ComboLev/All").then((resp: any) => {
      this.lvldata = resp;
    });
  }
  getFac() {
    this.http.getcombo("ComboFac/All").then((resp: any) => {
      this.facdata = resp;
    });
  }

  getStatus() {
    this.http
      .getcombo("ComboSysbyt/getSysbytedesnum/STUDENTSTATUS/STUDENTSTATUS")
      .then((response: any) => {
        this.statuslist = response;
      });
  }

  getStudentSex() {
    this.http
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTBIO/STUDENTSEX")
      .then((response: any) => {
        this.stuentsexlist = response;
      });
  }

  getEntryType() {
    this.http
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTBIO/ENTRYTYPE")
      .then((response: any) => {
        this.lstEntryType = response;
      });
  }

  getActionType() {
    this.http
      .getcombo("ComboSysbyt/getSysbytedes/TMPDBSTUDENTGROUP/ACTIONTYPE")
      .then((response: any) => {
        this.actiontypelst = response;
      });
  }

  selectionChanged(data: any) {}

  getviewstudent() {}

  // async liststudent() {
    // this.param.campusid = this.util.ntz(this.campusid);
    // this.param.admitacadyear = this.util.ntz(this.admitacadyear);
    // this.param.studentgroup = this.util.ntb(this.studentgroup);
    // this.param.studentstatus = this.util.ntz(this.studentstatus);
    // this.param.studentstatusto = this.util.ntz(this.studentstatusto);
    // await this.deletedata();
    // this.http.post("Prgstudentgroup/Post", this.param).then((resp: any) => {
    //   this.stulist();
    // });
  // }
  getgrouplisttox(e) {
    for (let i = 0; i < this.grouplistto.length; i += 1) {
      if (this.studentgroupto == this.grouplistto[i].comboid) {
        this.groupyearto = this.grouplistto[i].keystr1id;
      }
    }
  }
  executedat() {
    if (this.groupyearto > 0 && this.studentgroupto > 0) {
      this.paramto = {};
      // this.paramto.keystudentgroup = this.studentgroup;
      this.paramto.campusid = this.util.ntz(this.campusid);
      this.paramto.facultyid = this.util.ntz(this.facultyid);
      this.paramto.levelid = this.util.ntz(this.levelid); //this.levelid;
      this.paramto.groupyear = this.util.ntb(this.groupyear); //this.groupyear;
      this.paramto.studentgroup = this.util.ntb(this.studentgroup); //this.studentgroup;
      this.paramto.studentstatus = this.util.ntz(this.studentstatus); //this.studentstatus;
      this.paramto.studentstatusto = this.util.ntz(this.studentstatusto); //this.studentstatusto;
      this.paramto.groupyearto = this.groupyearto;
      this.paramto.studentgroupto = this.studentgroupto;
      // console.log(this.paramto)
      this.http
        .put("Prgstudentgroup/Putall", this.paramto)
        .then(async (response: any) => {
          if(this.util.ntb(response?.message) == 'null'){
            
            this.alert.Showsuccess();
            this.veiwstudentlist = null;
            // this.deletedata();
            // this.liststudent();
            this.stulist();
          }else {
            this.alert.Showerror(response.message);
          }
        });
    } else {
      this.alert.MsgBoxInformation("กรุณาระบุข้อมูลรุ่น/กลุ่มเรียนให้ครบ");
    }
  }
  deletedata() {
    this.veiwstudentlist = null;
    this.http.delete("Prgstudentgroup/Deletebyuserid").then(
      (response: any) => {},
      (error: any) => {}
    );
  }

  stulist() {
    this.veiwstudentlist = null;
    // this.http.get(`Prgstudentgroup/All/${this.util.ntz(this.campusid)}/${this.util.ntz(this.admitacadyear)}/${this.util.ntb(this.studentgroup)}/${this.util.ntz(this.studentstatus)}/${this.util.ntz(this.studentstatusto)}`).then((resp: any) => {
    this.http.get(`Prgstudentgroup/All/${this.util.ntz(this.campusid)}/${this.util.ntz(this.levelid)}/${this.util.ntz(this.facultyid)}/${this.util.ntb(this.groupyear)}/${this.util.ntb(this.studentgroup)}/${this.util.ntz(this.studentstatus)}/${this.util.ntz(this.studentstatusto)}`).then((resp: any) => {
      this.veiwstudentlist = resp;
      if (resp.length == 0) {
        this.alert.Showwarning("ไม่พบข้อมูล");
      }
    });
  }

  stutransfer(e: any) {
    //console.log(e)
    if (this.groupyearto > 0 && this.studentgroupto > 0) {
      this.paramto.keystudentid = e.key;// e.key.studentid;
      this.paramto.keystudentgroup = this.studentgroup ? this.studentgroup : e.data.studentgroup;
      this.paramto.keygroupyear = this.groupyear ? this.groupyear : e.data.groupyear;
      this.paramto.groupyear = this.groupyearto;
      this.paramto.studentgroup = this.studentgroupto;
      //console.log(this.paramto)
      // return
      this.http.put("Prgstudentgroup/Put", this.paramto).then(async (response: any) => {
          // this.liststudent();
          if(this.util.ntb(response?.message) == 'null'){
            this.stulist();
            this.alert.Showsuccess();
          } else {
            this.alert.Showerror(response.message);
          }
        });
    } else this.alert.MsgBoxInformation("กรุณาระบุข้อมูลรุ่น/กลุ่มเรียน ที่ต้องการย้ายด้านล่าง ให้ครบ");
  }

  dataSave(data: any) {
    let parameter: any;
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]["data"];
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keystudentid = data.changes[0]["key"].studentid;
          this.http
            .put("Prgstudentgroup/Puttmp", parameter)
            .then((resp: any) => {
              this.stulist();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            });
          break;
        // case "remove":
        //   this.http
        //     .delete("Prgcampus/Delete" + "/" + data.changes[0]["key"].campusid)
        //     .then((resp: any) => {
        //       this.alert.Showsuccess();
        //     });
        //   data.component.cancelEditData();
        //   break;
      }
    }
  }

  gridonToolbarPreparing(e: any) {
    // e.toolbarOptions.items.find(i=>i.name="columnChooserButton").showText = 'always';

    // e.toolbarOptions.items.unshift({
    //   location: "before",
    //   template: "heddershow",
    // });
  }

  deleteallselect(e: any) {
    if (this.dataGrid.selectedRowKeys.length == 0) {
      this.alert.MsgBoxCritical("กรุณาเลือกรายการที่ต้องการลบ");
      return true;
    } else {
      this.http
        .put("Prgstudentgroup/DeleteDataSelect", this.dataGrid.selectedRowKeys)
        .then(async (resp: any) => {
          this.stulist();
          this.alert.Showsuccess();
        });
    }
  }
}
