import { Component, OnInit } from "@angular/core";
import { HttpService } from "./../../services/http.service";
import { AccountService } from "./../../services/account.service";
import { Encrypt } from "./../../shareds/encrypt";
import notify from "devextreme/ui/notify";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import { AlertService } from "./../../services/alert.service";
import { UtilService } from "../../services/util.service";

@Component({
    standalone: false,
  selector: "app-prgchangeofficer",
  templateUrl: "./prgchangeofficer.component.html",
  styleUrls: ["./prgchangeofficer.component.css"],
})
export class PrgchangeofficerComponent implements OnInit {
  // !for prgchangeofficer btu
  load = false;
  editmodeopen: boolean = false;
  camcombo: any[] = [];
  camcomboid: number = +sessionStorage.getItem("macampusid");
  levcombo: any[] = [];
  levcomboid: number = +sessionStorage.getItem("malevelid");
  faccombo: any[] = [];
  faccomboid: number = +sessionStorage.getItem("mafacultyid");
  groupyear: string;
  procombo: any[] = [];
  procomboid: number;
  statuslist: any = [];
  groupcodelist: any = [];
  divisioncodelist: any = [];
  studyperiodlist: any = [];
  schedulegrouplist: any = [];
  offlist: any = [];
  offNlist: any = [];
  prelist: any = [];
  stulist: any = [];
  stusetlist: any = [];
  stustacombo: any = [];
  officerid1: number;
  officerid2: number;
  officerid3: number;
  officerid4: number;
  officerid5: number;
  curcombolist: any;
  studentcodefrom: string;
  studentcodeto: string;
  admitacadyear: number = +sessionStorage.getItem("maacadyear");
  admitsemester: number = +sessionStorage.getItem("masemester");
  studentcode: string = "";
  studentstatusfrom: Number = 10;
  studentstatusto: Number = 10;
  popupVisible1 = false;
  popupVisible2 = false;
  popupVisible3 = false;
  lststudentgroup: any[] = [];
  studentgroupid: string = null;
  seqofficerlist: any[] = [
    {
      comboid: 1,
      comboshow: "อาจารย์ที่ปรึกษาลำดับทีี่ 1",
    },
    {
      comboid: 2,
      comboshow: "อาจารย์ที่ปรึกษาลำดับทีี่ 2",
    },
    {
      comboid: 3,
      comboshow: "อาจารย์ที่ปรึกษาลำดับทีี่ 3",
    },
    {
      comboid: 4,
      comboshow: "อาจารย์ที่ปรึกษาลำดับทีี่ 4",
    },
    {
      comboid: 5,
      comboshow: "อาจารย์ที่ปรึกษาลำดับทีี่ 5",
    },
  ];
  officerseq: Number = 1;
  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService
  ) {
    locale("th");
  }
  ngOnInit(): void {
    // this.getprocombo();
    this.getCombo();
  }
  getCombo() {
    this.getprocombo();
    this.data
      .getcombo("ComboSysbyt/getSysbytedeseng/STUDENTSET/GROUPCODE")
      .then((response: any) => {
        this.groupcodelist = response;
      });
    // *Combo DivisionCode List
    this.data.getcombo("ComboDiv/All").then((resp) => {
      this.divisioncodelist = resp;
    });
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTSET/STUDYPERIOD")
      .then((response: any) => {
        this.studyperiodlist = response;
      });
    // *Combo Faculty List
    this.data.getcombo("ComboFac/All").then((response: any) => {
      this.faccombo = response;
    });
    // *Combo Campus
    this.data.getcombo("ComboCam/All").then((response: any) => {
      this.camcombo = response;
    });
    // *Combo Level
    this.data.getcombo("ComboLev/All").then((response: any) => {
      this.levcombo = response;
    });
    // *Combo StudentStatus List
    this.data
      .getcombo(
        "ComboSysbyt/getSysbytedesnum" +
          "/" +
          "STUDENTSTATUS" +
          "/" +
          "STUDENTSTATUS"
      )
      .then((resp: any) => {
        this.statuslist = resp;
      });
    this.data.getcombo(`ComboSchgro/All`).then((resp: any) => {
      this.schedulegrouplist = resp;
    })
    // *Combo StudentGroup
    // this.data.get('ComboStuset/Allid').then((resp: any) => {
    //   this.stugroupcombo = resp;
    // });
    // *Combo OfficerList By Status
    this.data.getcombo("ComboOff/Getoffbystatus/0").then((response: any) => {
      this.offlist = response;
    });
    // *Combo OfficerList By Status = 'N'
    this.data.getcombo("ComboOff/Getoffbystatus/N").then((response: any) => {
      this.offNlist = response;
    });
    // *Combo Prefix Name
    this.data.getcombo("ComboPre/All").then((response: any) => {
      this.prelist = response;
    });
    // *Combo StudentSet List
    this.data.getcombo("ComboStuset/All").then((response: any) => {
      this.stusetlist = response;
    });
    // *Combo StudentStatus Number List
    this.data
      .get(
        "ComboSysbyt/getSysbytedesnum" +
          "/" +
          "STUDENTSTATUS" +
          "/" +
          "STUDENTSTATUS"
      )
      .then((resp: any) => {
        this.stustacombo = resp;
      });
  }
  getprocombo() {
    // let strwhere = '';
    // //this.svalue = this.levcomboid;
    // if (this.faccomboid > 0) {
    //   if (strwhere.length > 0) {
    //     strwhere = strwhere + ' and ';
    //   }
    //   strwhere = strwhere + 'facultyid=' + this.faccomboid;
    // }

    // if (this.levcomboid > 0) {
    //   if (strwhere.length > 0) {
    //     strwhere = strwhere + ' and ';
    //   }
    //   strwhere = strwhere + 'levelid=' + this.levcomboid;
    // }

    this.data
      .getcombo(
        "ComboPro/ProlvlCondition/M/" +
          this.util.ntz(this.faccomboid) +
          "/" +
          this.util.ntz(this.levcomboid)
      )
      .then((resp) => {
        this.procombo = resp;
      });
  }
  getcombogroup() {
    if (this.groupyear && this.levcomboid && this.camcomboid) {
      this.data
        .getcombo(
          `Prgchangeofficer/Getcombogroup/${this.groupyear}/${this.levcomboid}/${this.camcomboid}`
        )
        .then((resp) => {
          this.lststudentgroup = resp;
        });
    }
    // if (typeof e.itemData.campusshow != "undefined") {
    //   // alert(e.itemData.campusshow || e.itemData);
    //   this.camwhere = 'วิทยาเขต=' + e.itemData.campusshow || e.itemData;
    // }
    // if (typeof e.itemData.facultyshow != "undefined") {
    //   this.facwhere = 'วิทยาลัย/คณะ/สถาบัน=' + e.itemData.facultyshow || e.itemData;
    // }
    // if (typeof e.itemData.levelidshow != "undefined") {
    //   this.levwhere = 'ระดับ=' + e.itemData.levelidshow || e.itemData;
    // }
    // if (typeof e.itemData.programshow != "undefined") {
    //   this.prowhere = 'สาขาวิชาเอก=' + e.itemData.programshow || e.itemData;
    // }
    // if (typeof e.itemData.stdgroupname != "undefined") {
    //   this.stdwhere = 'กลุ่มเรียน=' + e.itemData.stdgroupname || e.itemData;
    // }
  }
  // getFilteredstugroup() {
  //   if (
  //     this.util.ntz(this.camcomboid) !== -9 &&
  //     this.util.ntz(this.levcomboid) !== -9 &&
  //     this.util.ntz(this.faccomboid) !== -9 &&
  //     this.util.ntb(this.groupyear) !== 'null'
  //   ) {
  //     this.stugroup = this.stugroupcombo.filter(
  //       (item: any) =>
  //         item.groupyear == this.groupyear &&
  //         item.campusid == this.camcomboid &&
  //         item.levelid == this.levcomboid &&
  //         item.facultyid == this.faccomboid
  //     );
  //   } else {
  //     this.stugroup = [];
  //   }
  // }
  // getstudentgroup(): void {
  //   if (
  //     this.util.ntz(this.camcomboid) !== -9 &&
  //     this.util.ntz(this.levcomboid) !== -9 &&
  //     this.util.ntz(this.faccomboid) !== -9 &&
  //     this.util.ntb(this.groupyear) !== 'null'
  //   ) {
  //     this.data
  //       .get(
  //         'ComboStuset/Camfaclev/' +
  //           this.util.ntz(this.camcomboid) +
  //           '/' +
  //           this.util.ntz(this.levcomboid) +
  //           '/' +
  //           this.util.ntz(this.faccomboid) +
  //           '/' +
  //           this.util.ntb(this.groupyear)
  //       )
  //       .then((rep) => {
  //         this.stugroup = rep;
  //       });
  //   }
  // }
  onSearch() {
    //this.editmodeopen = false;
    this.load = true;
    this.data
      .get(
        `Prgchangeofficer/getstudent/
        ${this.util.ntz(this.camcomboid)}/
        ${this.util.ntz(this.levcomboid)}/
        ${this.util.ntz(this.faccomboid)}/
        ${this.util.ntz(this.procomboid)}/
        ${this.util.ntz(this.studentstatusfrom)}/
        ${this.util.ntz(this.studentstatusto)}/
        ${this.util.ntb(this.studentcode)}/
        ${this.util.ntb(this.studentcodefrom)}/
        ${this.util.ntb(this.studentcodeto)}/
        ${this.util.ntz(this.admitacadyear)}/
        ${this.util.ntz(this.admitsemester)}/
        ${this.util.ntb(this.groupyear)}/
        ${this.util.ntb(this.studentgroupid)}`
      )
      .then((resp: any) => {
        if (resp.length !== 0) {
          this.stulist = resp;
        } else {
          this.alert.Showwarning("ไม่พบข้อมูล");
          this.stulist = [];
        }
        this.load = false;
      });
  }
  dataSave(data: any) {
    let parameter: any;
    data.cancel = true;
    if (data.changes.length !== 0) {
      parameter = data.changes[0]["data"];
      this.load = true;
      // console.log(parameter)
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keystudentid = data.changes[0]["key"].studentid;
          parameter.keyschedulegroupid = data.changes[0]["key"].schedulegroupid;
          //parameter.acadyear = +sessionStorage.getItem('maacadyear');
          //parameter.semester = +sessionStorage.getItem('masemester');
          // console.log(parameter)
          this.data.put("Prgchangeofficer/Put", parameter).then((resp: any) => {
            if(resp.result != 0){
              this.onSearch();
              this.alert.Showsuccess();
            } else {
              this.alert.Showwarning(this.util.ntb(resp.message) != 'null' ? this.util.ntb(resp.message) : 'ไม่สามารถบันทึกข้อมูลได้');
            }
            data.component.cancelEditData();
            this.load = false;
          });
          break;
      }
    } else {
      this.editmodeopen = false;
    }
  }
  onCancelEditmode() {
    this.editmodeopen = false;
  }
  onEditstart(e: any) {
    if (!this.editmodeopen) {
      this.editmodeopen = true;
    } else {
      this.alert.Warning(1);

      e.cancel = true;
    }
  }
  getDefault(e: any) {
    //e.data.facultytype = 'F';
    // e.data.facultyname = 'Vic';
  }
  selectionChanged(data: any) {
    if (!this.editmodeopen) {
    } else {
      this.alert.Warning(1);
    }
  }
  gridBox_displayExpr(item: any) {
    return item && item.officershow + " <" + item.facultyid + ">";
  }
  updateOfficer1(eventData: any, cellInfo: any) {
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  updateOfficer2(eventData: any, cellInfo: any) {
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  updateOfficer3(eventData: any, cellInfo: any) {
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  onSet() {
    let parameter: any;
    if(!this.officerid1) {
      this.alert.MsgBoxCritical(`กรุณาเลือกอาจารย์ที่ปรึกษา`);
      return;
    }
    if (!this.officerseq) {
      this.alert.MsgBoxCritical(`กรุณาเลือกลำดับของอาจารย์ที่ปรึกษา`);
      return;
    }
    this.load = true;
    this.data
      .put(
        "Prgchangeofficer/Putcopy/" +
          this.util.ntz(this.camcomboid) +
          "/" +
          this.util.ntz(this.levcomboid) +
          "/" +
          this.util.ntz(this.faccomboid) +
          "/" +
          this.util.ntz(this.procomboid) +
          "/" +
          this.util.ntz(this.studentstatusfrom) +
          "/" +
          this.util.ntz(this.studentstatusto) +
          "/" +
          this.util.ntb(this.studentcode) +
          "/" +
          this.util.ntb(this.studentcodefrom) +
          "/" +
          this.util.ntb(this.studentcodeto) +
          "/" +
          this.util.ntz(this.admitacadyear) +
          "/" +
          this.util.ntz(this.admitsemester) +
          "/" +
          (this.util.ntz(this.officerid1) == -9 ? 0 : this.util.ntz(this.officerid1)) +
          "/" +
          this.util.ntz(this.officerseq),
        // "/" +
        // this.util.ntz(this.officerid2) +
        // "/" +
        // this.util.ntz(this.officerid3),
        parameter
      )
      .then((resp: any) => {
        // console.log(resp)
        if (this.util.ntb(resp?.message) == "null") {
          this.onSearch();
          this.alert.Showsuccess();
          this.officerid1 = null;
          this.officerid2 = null;
          this.officerid3 = null;
          this.officerid4 = null;
          this.officerid5 = null;
          this.popupVisible1 = false;
        } else {
          this.alert.Showerror(resp?.message);
        }
        this.load = false;
      });
  }
  getprobyfac() {
    this.data
      .getcombo("ComboPro/Getbyfacid/" + this.util.ntz(this.faccomboid))
      .then((resp: any) => {
        this.curcombolist = resp;
      });
  }
}
