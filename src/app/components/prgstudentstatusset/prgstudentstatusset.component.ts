import { UtilService } from "./../../services/util.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpService } from "./../../services/http.service";
import { Encrypt } from "./../../shareds/encrypt";
import { locale } from "devextreme/localization";
import { DatePipe } from "@angular/common";
import { AlertService } from "./../../services/alert.service";
import { DxDataGridComponent } from "devextreme-angular";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";

@Component({
    standalone: false,
  selector: "app-prgstudentstatusset",
  templateUrl: "./prgstudentstatusset.component.html",
  styleUrls: ["./prgstudentstatusset.component.css"],
})
export class PrgstudentstatussetComponent implements OnInit {
  @ViewChild("dataGridRef", { static: false }) dataGrid: DxDataGridComponent;
  camcombo: any[] = [];
  camcomboid: number = +sessionStorage.getItem("macampusid");
  levcombo: any[] = [];
  levcombofromid: number = +sessionStorage.getItem("malevelid");
  levcombotoid: number = +sessionStorage.getItem("malevelid");
  faccombo: any[] = [];
  svalue: string;
  faccomboid: number = +sessionStorage.getItem("mafacultyid");
  procombo: any[] = [];
  procomboid: number;
  stulist: any[] = [];
  stusetlist: any[] = [];
  selectlist: any[] = [];

  stustacombo: any[] = [];
  stustanormalcombo: any[] = [];
  gprocombo: any[] = [];
  stugroupcombo: any[] = [];
  editmodeopen: boolean = false;
  groupyear: string;
  studentgroup: number;
  statusfrom: number = 10;
  statusto: number = 10;
  gproid: string;
  studentcodefrom: string;
  showstrwhere: string;
  studentcodeto: string;
  // admitacadyear: number = +sessionStorage.getItem("maacadyear");
  admitacadyear: number;
  admitsemester: number;
  // admitacadyearto: number = +sessionStorage.getItem("maacadyear");
  admitacadyearto: number;
  acadyear: number = +sessionStorage.getItem("maacadyear");
  semester: number = +sessionStorage.getItem("masemester");
  officerid1: number;
  officerid2: number;
  officerid3: number;
  tmpofficerid1: number;
  tmpofficerid2: number;
  tmpofficerid3: number;
  gridBoxValue: number[] = [3];
  popupVisible = false;
  camwhere: string;
  facwhere: string;
  levwhere: string;
  prowhere: string;
  stdwhere: string;
  vremark: string;
  vselect: number;
  year = new Date().getFullYear();
  month = new Date().getMonth();
  date = new Date().getDate();
  // vdate: any;
  vdate: Date = new Date();
  findate: any;
  statustostatus: number = 10;
  stugroup: any;
  gpafrom: number;
  gpato: number;
  vseq: number;
  ichk: boolean = false;
  datechk: boolean = true;
  checkBoxValue: boolean = false;
  loadingVisible: boolean = false;
  admstatusidlist;
  admstatusid;
  currentData: string[] = [];
  itemlists = [
    { id: 1, name: "นศ.รอพินิจ" },
    { id: 2, name: "นศ.ไม่ลงทะเบียน" },
    { id: 3, name: "นศ.เรียนครบกำหนดระยะเวลาการศึกษา" },
    { id: 4, name: "นศ.ค้างชำระเงิน" },
    // { id:5, name: 'นศ.ค้างชำระเงิน' },
    // { id:3, name: 'รุ่น/กลุ่ม' },
    //  { id:6, name: 'วิทยาทัณฑ์' }
    // ...
  ];
  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private util: UtilService,
    private alert: AlertService
  ) {
    locale("th");
  }
  ngOnInit(): void {
    //  // this.data.getcombo('ComboSysbyt/getSysbytedes/STUDENTMASTER/ADMSTATUSID').then((response: any) => this.admstatusidlist = response);
    //   //this.getFaccombo();
    //   //this.getCamcombo();
    //   //this.getLevcombo();
    //   this.getStustacombo();
    //  // this.getStustanormalcombo();
    //   this.getGprocombo();
    //   // this.getstugroup();
    this.getCombo();
    // this.vselect = this.itemlists[2]?.id;
    this.vselect = this.itemlists[0]?.id;
    // this.gettmpprgstustaset();
  }
  getCombo() {
    this.getFaccombo();
    this.getCamcombo();
    this.getLevcombo();
    this.getStustacombo();
    this.getGprocombo();
    this.getStustanormalcombo();
  }
  checkBoxChanged(e: any) {
    if (this.checkBoxValue) {
      this.checkBoxValue = false;
    } else {
      this.checkBoxValue = true;
      this.vdate = this.findate;
    }
  }
  getFaccombo() {
    this.data.getcombo("ComboFac/All").then((resp: any) => {
      this.faccombo = resp;
    });
  }
  // getDivcombo() {
  //   this.data.get('ComboDiv/All').then((resp: any) => {this.faccombo = resp;});
  // }
  getCamcombo() {
    this.data.getcombo("ComboCam/All").then((resp: any) => {
      this.camcombo = resp;
    });
  }
  getLevcombo() {
    this.data.getcombo("ComboLev/All").then((resp: any) => {
      this.levcombo = resp;
    });
  }
  // getStugroupcombo() {

  //     if (this.groupyear != null) {

  //       this.data.getcombo('Viewstudentgroupname/Getbygroupyear/' + this.groupyear).then((resp: any) => {this.stugroupcombo = resp;});

  //     }
  //   }
  getstudentgroup(): void {
    // if (this.groupyear) {
    //     this.data.getcombo('ComboStuset/Camfaclev/-9/-9/-9/'   + this.util.ntb(this.groupyear)).then(
    //         (rep:any) => {
    //             this.stugroup = rep;

    //         }
    //     );}
    if (this.groupyear) {
      this.data
        .getcombo("ComboStuset/bygropyear/" + this.util.ntb(this.groupyear))
        .then((rep: any) => {
          this.stugroup = rep;
        });
    }
  }
  // getstugroup() {
  //     this.data.get('ComboStuset/Allid').then((resp: any) => {
  //       this.stugroupcombo = resp;
  //      // console.dir(resp);
  //     });
  //   }

  // getFilteredstugroup() {

  //   if (this.util.ntb(this.groupyear) !== 'null'){

  //       this.stugroup = this.stugroupcombo.filter((item:any) => item.groupyear==this.groupyear);

  //     }
  //   else{
  //     this.stugroup=[];
  //   }
  // }
  getStustanormalcombo() {
    this.data
      .getcombo(
        "ComboSysbyt/getSysbytedesbyvalnum/STUDENTSTATUS/STUDENTSTATUS/between/10/39"
      )
      .then((resp: any) => {
        this.stustanormalcombo = resp;
      });
  }
  getStustacombo() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTSTATUS/STUDENTSTATUS")
      .then((resp: any) => {
        this.stustacombo = resp;
      });
  }
  getGprocombo() {
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTSTATUS/GRADEPRO")
      .then((resp: any) => {
        this.gprocombo = resp;
      });
  }
  gettmpprgstustaset(): void {
    this.loadingVisible = true;
    this.data.get("Prgstudentstatusset/All").then((rep: any) => {
      if (rep.length !== 0) {
        //console.dir(rep);
        this.stulist = rep;
      } else {
        //this.alert.Showwarning('ไม่พบข้อมูล');
        this.stulist = [];
      }

      this.loadingVisible = false;
    });
  }
  // gettmpprgstustasetgetdate(): void {
  //   this.data.get("Tmpprgstustaset/Getfindate").then((rep: any) => {
  //     if (rep.length !== 0) {
  //       // console.dir(rep);
  //       if (this.checkBoxValue) {
  //         // Number(tmpdate.getMonth() + 1) + '/' + tmpdate.getDate() + '/' + tmpdate.getFullYear() + ' ' + tmpdate.getHours() + ':' + tmpdate.getMinutes();

  //         this.vdate = rep[0].finishdate;
  //         this.findate = rep[0].finishdate;
  //       }
  //     }
  //   });
  // }
  onSearch(e: any) {
    let strwhere = "";
    let strwhereerror = "null";
    if (this.vselect == 1) {
      if (
        this.util.ntz(this.acadyear) === -9 ||
        this.util.ntz(this.semester) === -9
      ) {
        strwhereerror = "error";
        this.alert.Showwarning("กรุณากรอกข้อมูลปีที่การศึกษา/ภาคที่");
      }
      if (this.util.ntb(this.gproid) == "null") {
        strwhereerror = "error";
        this.alert.Showwarning("กรุณาเลือกข้อมูลสถานะพินิจ");
      }
    }
    if (strwhereerror !== "error") {
      let parameter: any = {};
      this.loadingVisible = true;
      this.data
        .put(
          "Prgstudentstatusset/Putinserttmp/" +
            this.util.ntz(this.vselect) +
            "/" +
            this.util.ntz(this.camcomboid) +
            "/" +
            this.util.ntz(this.faccomboid) +
            "/" +
            this.util.ntz(this.levcombofromid) +
            "/" +
            this.util.ntz(this.levcombotoid) +
            "/" +
            this.util.ntz(this.statusfrom) +
            "/" +
            this.util.ntz(this.statusto) +
            "/" +
            this.util.ntz(this.admitacadyear) +
            "/" +
            this.util.ntz(this.admitacadyearto) +
            "/" +
            this.util.ntb(this.groupyear) +
            "/" +
            this.util.ntb(this.studentgroup) +
            "/" +
            this.util.ntz(this.acadyear) +
            "/" +
            this.util.ntz(this.semester) +
            "/" +
            this.util.ntb(this.gproid),
          parameter
        )
        .then((resp: any) => {
          this.gettmpprgstustaset();
          // this.gettmpprgstustasetgetdate();
          if (resp.result.error) {
            this.alert.Showerror(resp.result.error);
          } else {
            // this.alert.Showsuccess();
          }
          //  this.load = false;
        });
    }
    // else {
    //   this.alert.Showwarning("กรุณากรอกข้อมูล");
    // }
  }
  dataSave(data: any) {
    this.editmodeopen = false;
    let parameter: any;
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]["data"];
      switch (data.changes[0]["type"]) {
        case "insert":
          this.data
            .post(
              "Prgstudentstatusset/Inserttmp/" +
                this.acadyear +
                "/" +
                this.semester,
              parameter
            )
            .then((resp: any) => {
              this.gettmpprgstustaset();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            });
        case "remove":
          this.data
            .delete("Prgstudentstatusset/Delete" + "/" + data.changes[0]["key"])
            .then((resp: any) => {
              this.gettmpprgstustaset();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            });

          break;
      }
    }
  }
  getDefault(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      sessionStorage.setItem("editmodeopen", "true");
    } else {
      e.cancel = true;
    }
  }
  onSet(e: any) {
    // let parameter: any;
    const datepipe: DatePipe = new DatePipe("en-US");
    let formatthistedDate = datepipe.transform(this.vdate, "MMddYYYY");
    if (this.util.ntz(this.statustostatus) !== -9) {
      if (
        this.statustostatus == 60 ||
        (this.statustostatus >= 70 && this.statustostatus <= 79)
      ) {
        if (!this.vdate) {
          this.alert.Showwarning("กรุณากรอกข้อมูลวันที่");
          return;
        }
        if (!this.vremark) {
          this.alert.Showwarning("กรุณากรอกข้อมูลหมายเหตุ");
          return;
        }
      }
      var result = this.alert.MsgBoxQuestion(
        "ท่านต้องการปรับสถานะเป็นชุด ใช่หรือไม่"
      );
      result.show().then((repa: any) => {
        if (repa.value === "Y") {
          this.loadingVisible = true;
          // let parameter: any = {};
          let parameter: any = {
            vcommand: 0,
            vtype: this.vselect,
            vcampusid: this.camcomboid,
            vfacultyid: this.faccomboid,
            vlevelid: this.levcombofromid,
            vlevelidto: this.levcombotoid,
            vgroupyear: this.groupyear,
            vstudentgroup: this.studentgroup,
            vadmitacadyear: this.admitacadyear,
            vadmitacadyearto: this.admitacadyearto,
            vfromstatus: this.statusfrom,
            // vtostatus: this.statusto,
            vstatustostatus: this.statustostatus,
            vacadyear: this.acadyear,
            vsemester: this.semester,
            vremark: this.vremark,
            vdate: formatthistedDate,
          };

          // this.data
          // .put(
          //   "Prgstudentstatusset/Putexecute" +
          //     "/" +
          //     this.util.ntz(this.acadyear) +
          //     "/" +
          //     this.util.ntz(this.semester) +
          //     "/" +
          //     this.util.ntz(this.statustostatus),
          //   parameter
          // )
          this.data
            .put(`Prgstudentstatusset/Putexecute`, parameter)
            .then((resp: any) => {
              this.loadingVisible = false;
              this.gettmpprgstustaset();
              if (resp.result.error) {
                this.alert.Showerror(resp.result.error);
              } else {
                this.alert.Showsuccess();
              }

              //  this.load = false;
            });
        }
      });
      //   } else {
      //     this.alert.MsgBoxCritical("กรุณาระบุหมายเหตุ");
      //     e.cancel = true;
      //   }
      // } else {
      //   this.alert.MsgBoxCritical("กรุณาระบุวันที่พ้นสภาพ");
      //   e.cancel = true;
      // }
    } else {
      this.alert.MsgBoxCritical("กรุณาระบุสถานสภาพ");
      e.cancel = true;
    }
  }

  gridonToolbarPreparing(e: any) {
    e.toolbarOptions.items.find(
      (i) => (i.name = "columnChooserButton")
    ).showText = "always";

    e.toolbarOptions.items.unshift({
      location: "before",
      template: "heddershow",
    });
  }

  deleteallselect(e: any) {
    if (this.dataGrid.selectedRowKeys.length == 0) {
      this.alert.MsgBoxCritical("กรุณาเลือกรายการที่ต้องการลบ");
      return true;
    } else {
      this.loadingVisible = true;
      this.data
        .put(
          "Prgstudentstatusset/DeleteAllSelect",
          this.dataGrid.selectedRowKeys
        )
        .then(async (resp: any) => {
          this.gettmpprgstustaset();
          this.alert.Showsuccess();
          this.loadingVisible = false;
        });
    }
  }

  selectTab(e: any) {
    if (e.name === "selectedIndex") {
      switch (e.value) {
        case 0:
          break;
        case 1:
          break;
      }
    }
  }

  onSetRemark(e) {
    if (!this.vremark) {
      this.alert.MsgBoxCritical("กรุณาระบุหมายเหตุพ้นสภาพ");
      return true;
    }

    let parameter: any = {};
    parameter.acadyear = this.acadyear;
    parameter.semester = this.semester;
    parameter.studentstatus = this.statustostatus;
    // parameter.sequence = this.vseq;
    // parameter.remark = this.vremark;
    // parameter.campusid = this.camcomboid;
    // parameter.facultyid = this.faccomboid;
    // parameter.levelid = this.levcombofromid;
    // parameter.levelidto = this.levcombotoid;

    var result = this.alert.MsgBoxQuestion(
      'ยืนยันปรับ "หมายเหตุพ้นสภาพ" ใช่หรือไม่'
    );
    result.show().then((repa: any) => {
      if (repa.value === "Y") {
        this.loadingVisible = true;
        this.data
          .put("Tmpprgstustaset/Setremark", parameter)
          .then((resp: any) => {
            this.loadingVisible = false;
            this.searchstdremark();
            if (resp.result.error) {
              this.alert.Showerror(resp.result.error);
            } else {
              this.alert.Showsuccess();
            }
          });
      }
    });
  }

  searchstdremark() {
    this.data
      .get(
        "Tmpprgstustaset/getstdremark/" +
          this.util.ntz(this.camcomboid) +
          "/" +
          this.util.ntz(this.faccomboid) +
          "/" +
          this.util.ntz(this.levcombofromid) +
          "/" +
          this.util.ntz(this.levcombotoid) +
          "/" +
          this.acadyear +
          "/" +
          this.semester +
          "/" +
          this.statustostatus +
          "/" +
          this.vseq
      )
      .then((resp: any) => (this.stulist = resp));
  }

  onExporting(e) {
    //if (e.format === 'xlsx') {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("data");
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "exportdata.xlsx"
        );
      });
    });
    //}
  }
}
