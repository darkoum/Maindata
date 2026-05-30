import { filter } from "rxjs/operators";
import { locale } from "devextreme/localization";
import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { Encrypt } from "src/app/shareds/encrypt";
import notify from "devextreme/ui/notify";
import { AlertService } from "src/app/services/alert.service";
import { UtilService } from "src/app/services/util.service";
@Component({
    standalone: false,
  selector: "app-prggraduateprogramset",
  templateUrl: "./prggraduateprogramset.component.html",
  styleUrls: ["./prggraduateprogramset.component.css"],
})
export class PrggraduateprogramsetComponent implements OnInit {
  // param = {} as any;
  campusdata: any[] = [];
  graduateprogramid: any;
  lvldata: any[] = [];
  facdata: any[] = [];
  studentgrouplist: any[] = [];
  studentgrouplistto: any[] = [];
  statuslist: any[] = [];
  stuentsexlist: any[] = [];
  lstEntryType: any[] = [];
  lstEntryDegree: any[] = [];
  load: boolean = false;
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
  datalist: any = [];
  graduatelist: any = [];
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
    //this.deletedata();
    this.getCampus();
    // this.getCampusto();
    this.getLvl();
    this.getStatus();
    // this.getFac();
    // this.getStatus();
    // this.getdata();

    // this.getEntryDegree();
    // this.getstugroup();
    //this.stulist();
    // this. refreshGroupyear();
    // this.getFilteredstugroup = this.getFilteredstugroup.bind(this);
  }

  getdata() {
    // console.log(this.campusid);
    // console.log(this.levelid);
    // console.log(this.groupyear);
    // console.log(this.studentgroup);
    this.load = true;
    this.http
      .get(
        "Prggraduateprogramset/getdata/" +
          this.util.ntz(this.campusid) +
          "/" +
          this.util.ntz(this.levelid) +
          "/" +
          this.util.ntb(this.groupyear) +
          "/" +
          this.util.ntz(this.studentgroup)
      )
      .then((resp: any) => {
        if (resp.length !== 0) {
          this.datalist = resp;
          this.graduateprogramid = resp[0].graduateprogramid;
          // this.graduateprogramid = 1002603;
          // console.log("graduateprogramid", this.graduateprogramid);
          this.getGetgraduat();
        } else {
          this.alert.Showwarning("ไม่พบข้อมูล");
        }
        this.load = false
      });
  }

  dataSave(data: any) {
    // this.editmodeopen = false;
    let parameter: any;

    if (data.changes.length !== 0) {
      this.load = true;
      data.cancel = true;
      parameter = data.changes[0]["data"];
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keystudentid = data.changes[0]["key"].studentid;
          // console.dir(parameter);
          this.http
            .put("Prggraduateprogramset/Putgraduate", parameter)
            .then((resp: any) => {
              this.getdata();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            });

          this.load = false;
          break;
      }
    }
  }
  updatedgraduate() {
    // console.log(this.graduateprogramid)
   // let paramx = {} as any;
    // paramx.campusid = this.campusid;
    // paramx.levelid = this.levelid;
    // paramx.groupyear = this.groupyear;
    // paramx.studentgroup = this.studentgroup;
    //paramx.graduateprogramid = this.graduateprogramid;
    //console.log('gr:',this.graduateprogramid);
    if (this.graduateprogramid) {
      // console.log(this.graduatelist)
      let graduateprogramabb = this.graduatelist?.store?.find(
        (x) => x.comboid === this.graduateprogramid
      )?.comboshow;
      // console.log(graduateprogramabb)
      var result = this.alert.MsgBoxQuestion(
        'ต้องการแก้ไขข้อมูลตรวจสอบจบเป็น  "' + graduateprogramabb + '" ทั้งหมดหรือไม่'
      );
      result.show().then(async (repa: any) => {
        if (repa.value === "Y") {
          this.load = true;
          let paramx = {
            campusid: this.util.ntz(this.campusid),
            levelid: this.util.ntz(this.levelid),
            groupyear: this.util.ntb(this.groupyear),
            studentgroup: this.util.ntz(this.studentgroup),
            graduateprogramid: this.util.ntz(this.graduateprogramid),
          };
          //  console.log("param",paramx);
          this.http
            .put("Prggraduateprogramset/updateall", paramx)
            .then(async (response: any) => {
              this.getdata();
              this.alert.Showsuccess();
              this.veiwstudentlist = null;
              this.graduateprogramid = -9;
            });
        } else {
          this.graduateprogramid = -9;
        }
      });
    } else {
      result = this.alert.MsgBoxInformation("กรุณาเลือกประเภทให้ถูกต้อง");
    }
    this.load = false;
  }

  getGetgraduat() {
    this.http
      .getcombo(
        "ComboPro/Getgraduateprogrambylevel/" + this.util.ntz(this.levelid)
      )
      .then((resp: any) => {
        this.graduatelist = resp;
        // console.log("graduatelist",this.graduatelist);
      });
  }

  getprogramid(e: any) {
    // console.log(e);
    this.graduateprogramid = e.key.graduateprogramid;
    // console.log("graduatid",this.graduateprogramid);
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
          // this.groupyear = rep[0].keystr1id;
        });
    } else {
      this.grouplist = [];
    }
  }

  getgrouplistbygroupyear() {
    // console.log(this.campusid);
    // console.log(this.levelid);
    // console.log(this.groupyear);
    this.http
      .getcombo(
        "ComboStuset/byCamLevGroupyear/" +
          this.util.ntz(this.campusid) +
          "/" +
          this.util.ntz(this.levelid) +
          "/" +
          this.util.ntz(this.groupyear)
      )
      .then((resp: any) => {
        this.grouplistbygroupyear = resp;
        //  console.log("grouplistbygroupyear",this.grouplistbygroupyear);
      });
  }

  getCampus() {
    this.http.getcombo("ComboCam/All").then((resp: any) => {
      this.campusdata = resp;
    });
  }

  getLvl() {
    this.http.getcombo("ComboLev/All").then((resp: any) => {
      this.lvldata = resp;
    });
  }
  getStatus() {
    this.http.getcombo("ComboSysbyt/getSysbytedes/STUDENTSTATUS/STUDENTSTATUS").then((resp: any) => {
      this.statuslist = resp;
    });
  }
}
