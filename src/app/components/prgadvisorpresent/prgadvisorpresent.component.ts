import { Component, OnInit } from "@angular/core";
import { HttpService } from "./../../services/http.service";
import { AccountService } from "./../../services/account.service";
import { Encrypt } from "./../../shareds/encrypt";
import notify from "devextreme/ui/notify";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import { AlertService } from "./../../services/alert.service";
import { UtilService } from "../../services/util.service";
import ScrollView from "devextreme/ui/scroll_view";

@Component({
    standalone: false,
  selector: "app-prgadvisorpresent",
  templateUrl: "./prgadvisorpresent.component.html",
  styleUrls: ["./prgadvisorpresent.component.css"],
})
export class PrgadvisorpresentComponent implements OnInit {
  // *For prgadvisorpresent
  editmodeopen: boolean = false;
  loadingVisible: boolean = false;
  facid: number = +sessionStorage.getItem("mafacultyid");
  officer: any;
  chkpresent: boolean = false;
  existsadvisor: boolean = false;
  officertype = 1;
  feeadjust: any = [];
  searchtype = [
    {
      comboid: 0,
      comboshow: `รหัสอาจารย์`
    },
    {
      comboid: 1,
      comboshow: `ชื่ออาจารย์`
    },
  ]
  officertypeto = 1;
  officerlist: any[] = [];
  studentadvisor: any[] = [];
  officercodeto: string;
  studentcodefrom: string;
  studentcodeto: string;
  seqofficerfrom: number = 1;
  seqofficerto: number = 1;
  seqofficerlist: any [] = [
    {
      comboid: 1,
      comboshow: 'อาจารย์ที่ปรึกษาลำดับที่ 1'
    },
    {
      comboid: 2,
      comboshow: 'อาจารย์ที่ปรึกษาลำดับที่ 2'
    },
    {
      comboid: 3,
      comboshow: 'อาจารย์ที่ปรึกษาลำดับที่ 3'
    },
    {
      comboid: 4,
      comboshow: 'อาจารย์ที่ปรึกษาลำดับที่ 4'
    },
    {
      comboid: 5,
      comboshow: 'อาจารย์ที่ปรึกษาลำดับที่ 5'
    },
  ];
  lstfaculty: any[] = [];
  lstprogram: any[] = [];
  statuslist: any[] = [];
  stulist: any[] = []
  tmpdata: any
  tmpfacultyid: number
  tmpprogramid: number
  tmpstudentstatus: number
  // getStudentname: any;
  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService
  ) {
    locale("th");
    this.getStudentname = this.getStudentname.bind(this);
  }
  ngOnInit(): void {
    this.getCombo();
  }
  getCombo() {
    this.loadingVisible = true
    this.data.getcombo(`ComboOff/All`).then((resp: any) => {
      this.officerlist = resp;
    })
    this.data.getcombo(`ComboFac/All`).then((resp: any) => {
      this.lstfaculty = resp;
      // console.log(this.lstfaculty)
    })
    this.data.getcombo(`ComboPro/Allwithoutstatus`).then((resp: any) => {
      this.lstprogram = resp;
      // console.log(this.lstprogram)
    })
    this.data.getcombo(`ComboSysbyt/getSysbytedesnum/STUDENTSTATUS/STUDENTSTATUS`).then((resp: any) => {
      this.statuslist = resp;
    })
    this.data.getcombo("ComboStumas/All").then((response:any) => {
      this.stulist = response
      this.loadingVisible = false
    })
  }
  getDefault(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      e.officerid = this.officer;
      e.studentcode = null;
      e.studentfullname = null;
      sessionStorage.setItem("editmodeopen", "true");
    } else {
      e.cancel = true;
    }
  }
  setstudentidValue(rowData: any, value: any) {
    rowData.studentid = value;
  }
  getStddetail(studentid: number){
    return new Promise((resolve) => {
      this.data
        .get(`Prgadvisorpresent/GetStddetail/${studentid}`)
        .then((response: any) => {
          if (response.length > 0) {
            resolve(response[0]);
          } else {
            resolve("");
          }
        });
    });
  }
  async updateCell(eventData:any, cellInfo: any) {
  if (cellInfo.setValue) {
    this.tmpdata = await this.getStddetail(eventData.value)
    cellInfo.component.cellValue(cellInfo.rowIndex, 'facultyid', this.tmpdata.facultyid)
    cellInfo.component.cellValue(cellInfo.rowIndex, 'programid', this.tmpdata.programid)
    cellInfo.component.cellValue(cellInfo.rowIndex, 'studentstatus', this.tmpdata.studentstatus)
    cellInfo.setValue(eventData.value);
  }
}
  onToolbarPreparing(e: any) {
    e.toolbarOptions.items[0].showText = "always";
    var toolbarItems = e.toolbarOptions.items;
    if (this.officer == null || this.officer == undefined) {
      $.each(toolbarItems, function (_, item) {
        if (item.name === "addRowButton") {
          item.options.onClick = function (args: any) {
            // console.log(this.officer)
            alert("กรุณาเลือกอาจารย์ที่ปรึกษา");
          };
        }
      });
    }
  }
  async getStudentname(rowData: any, value: any, current: any) {
    rowData.studentcode = value;
    rowData.studentfullname = await this.getStudentnameapi(value);
  }
  getStudentnameapi(value: any) {
    return new Promise((resolve) => {
      this.data
        .get(`Prgadvisorpresent/getstudentname/${value}`)
        .then((response: any) => {
          if (response.length > 0) {
            resolve(response[0].studentfullname);
          } else {
            resolve("");
          }
        });
    });
  }
  dataSave(data: any) {
    let parameter: any;
    // console.log(data)
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]["data"];
      // parameter['seq'] = this.seqofficerfrom;
      // console.log(parameter);
      // return;
      switch (data.changes[0]["type"]) {
        case "insert":
          parameter.officerid = this.officer;
          parameter.seq = this.seqofficerfrom;
          delete parameter.studentfullname;
          this.data.post("prgadvisorpresent/Post", parameter).then((resp: any) => {
            this.onSearch();
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });
          break;
        case "remove":
            if(this.existsadvisor == true){
              this.alert.Showwarning("ไม่สามารถลบอาจารย์ที่ปรึกษาได้ เนื่องจากนักศึกษายังไม่มีการบันทึกอาจารย์ที่ปรึกษา");
              return;
            }
            this.data
            .delete(`Prgadvisorpresent/Delete/${data.changes[0]["key"].studentcode}/${this.seqofficerfrom}/${data.changes[0]["key"].currentacadyear}/${data.changes[0]["key"].currentsemester}`)
            .then(
              (resp: any) => {
                this.onSearch();
                this.alert.Showsuccess();
                data.component.cancelEditData();
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
    if(this.officer || this.existsadvisor == true){
      // console.log(this.officer)
      this.loadingVisible = true;
      this.data.get(`Prgadvisorpresent/Getstudentadvisor/${this.officertype}/${this.officer}/${this.seqofficerfrom}/${this.chkpresent}/${this.existsadvisor}`).then((resp: any) => {
        this.studentadvisor = resp;
        this.studentcodefrom = this.studentadvisor[0]?.studentcode;
        this.studentcodeto = this.studentadvisor[(resp.length - 1)]?.studentcode;
        // console.log(this.studentadvisor)
        // if(resp.length <= 0){
        //   this.alert.Showwarning("ไม่พบข้อมูล");
        // }
        if(resp?.result == 0)
          this.alert.Showwarning(resp?.message);
        this.loadingVisible = false;
      });
    } else {
      this.alert.MsgBoxInformation("กรุณากรอกเงื่อนไข");
    }
  }
  changeOfficer(){
    if(this.officer){
      if(this.officercodeto){
        if(this.studentcodefrom && this.studentcodeto){
          let param = {
            officer: this.officer,
            seqfrom: this.seqofficerfrom,
            seqto: this.seqofficerto,
            officercodeto: this.officercodeto,
            studentcodefrom: this.studentcodefrom,
            studentcodeto: this.studentcodeto
          }
          this.loadingVisible = true;
          // return;
          this.data.put(`Prgadvisorpresent/changeadvisor`, param).then((resp: any) => {
            if(resp.result != 0){
              this.onSearch();
              this.alert.Showsuccess();
            } else {
              this.alert.Showerror(resp.message);
            }
            this.loadingVisible = false;
          });
        } else {
          this.alert.MsgBoxInformation("กรุณาระบุรหัสนักศึกษา");
        }
      } else {
        this.alert.MsgBoxInformation("กรุณาระบุที่ปรึกษาปลายทาง");
      }
    } else {
      this.alert.MsgBoxInformation("กรุณาระบุที่ปรึกษาต้นทาง");
    }
  }
}
