import { Component, OnInit } from "@angular/core";
import { locale } from "devextreme/localization";
import notify from "devextreme/ui/notify";
import { HttpService } from "src/app/services/http.service";
import { Encrypt } from "src/app/shareds/encrypt";
import { UtilService } from "../../services/util.service";
import { AlertService } from "../../services/alert.service";
@Component({
    standalone: false,
  selector: "app-prgstudenttransfer",
  templateUrl: "./prgstudenttransfer.component.html",
  styleUrls: ["./prgstudenttransfer.component.css"],
})
export class PrgstudenttransferComponent implements OnInit {
  semester: number = +sessionStorage.getItem("masemester");
  acadyear: number = +sessionStorage.getItem("maacadyear");
  facultyid: any;
  facultylist: any;
  levelid: any;
  levellist: any;
  campusid: any;
  campuslist: any;
  transfertype: any;
  transfertypedes: string = null;
  transfertypelist: any;
  itemcount: any;
  editmodeopen: boolean = false;
  studenttransfer: any[] = [];
  studentid: any;
  studentcode: any;
  studentinfo: any;
  studentlist: any;
  // studentgroupnamelist: any = [];
  stugroupnamelistold: any;
  stugroupnamelistnew: any;
  transferdatefrom: Date = new Date();
  transferdateto: Date = new Date();
  tmpdate: Date;
  dfrom: number;
  dto: number;
  mfrom: number;
  mto: number;
  yfrom: number;
  yto: number;
  camwhere: string;
  facwhere: string;
  levwhere: string;
  tftypewhere: string;
  svalue: string;
  loadingVisible: boolean = false;
  tranferstatuslist = [
    { comboid: "Y", comboshow: "Y : ทำการ" },
    { comboid: "N", comboshow: "N : ไม่ทำการ" },
  ];
  newStudentgroupEditorOptions = {
    searchEnabled: true,
    searchExpr: "comboshow",
    searchMode: "contains",
    showDataBeforeSearch: true,
  };
  btnsearchclicked: boolean = false;
  insertmode: boolean = false;
  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private util: UtilService,
    private alert: AlertService
  ) {
    locale("th");
    this.transferdatefrom = new Date(
      this.transferdatefrom.getFullYear(),
      this.transferdatefrom.getMonth(),
      this.transferdatefrom.getDate() - 1
    );
  }
  popupVisible: boolean = false;
  searchstudentid: any;
  searchstudentlist: any;
  tmptextsearch1 = "";
  tmptextsearch2 = "";
  tmptextsearch3 = "";
  ngOnInit() {
    this.itemcount = 0;
    //this.loadingVisible = true;
    this.data.getcombo("ComboStuSet/All").then((response: any) => {
      this.stugroupnamelistold = response;
    });
    this.data.getcombo("ComboStuSet/All").then((response: any) => {
      this.stugroupnamelistnew = response;
      // console.log(this.stugroupnamelistnew);
    });
    // this.data.getcombo("ComboStuSet/All").then((response: any) => {
    //   this.studentgroupnamelist = response;
    // })
    this.data.getcombo("ComboStumas/studenttransfer").then((response: any) => {
      this.studentlist = response;
      //this.loadingVisible = false;
    });
    this.data.getcombo("ComboFac/All").then((response: any) => {
      this.facultylist = response;
    });
    this.data.getcombo("ComboLev/All").then((response: any) => {
      this.levellist = response;
    });
    this.data.getcombo("ComboCam/All").then((response: any) => {
      this.campuslist = response;
    });
    this.data
      .getcombo("ComboSysbyt/getSysbytedes/STUDENTTRANSFER/TRANSFERTYPE")
      .then((response: any) => {
        this.transfertypelist = response;
        // console.log(this.transfertypelist)
        this.transfertype = "P";
      });

    this.setstudentidValue = this.setstudentidValue.bind(this);
    this.getFilterednewStudentgroup = this.getFilterednewStudentgroup.bind(this);
  }
  onEditCanceled(e: any) {
    this.insertmode = false;
  }
  gettransferdes(){
    this.transfertypedes = null;
    this.transfertypedes = this.transfertypelist?.store?.filter(
      (item) => item.comboid == this.transfertype
    )[0].comboshow;
  }
  getStudenttransfer() {
    let strwhere = "";
    let showstrwhere = "";

    if (this.acadyear > 0) {
      showstrwhere += " ปีการศึกษา=" + this.acadyear;
    }

    if (this.semester > 0) {
      showstrwhere += " ภาคที่=" + this.semester;
    }
    if (this.facultyid > 0) {
      showstrwhere += " " + this.facwhere;
    }

    if (this.levelid > 0) {
      showstrwhere += " " + this.levwhere;
    }

    if (this.campusid > 0) {
      showstrwhere += " " + this.camwhere;
    }

    if (this.transfertype != null) {
      showstrwhere +=
        " " +
        "ประเภท=" +
        this.transfertypelist?.store?.filter(
          (item) => item.comboid == this.transfertype
        )[0].comboshow;
    }

    if (this.transferdatefrom != null && this.transferdateto != null) {
      this.dfrom = this.transferdatefrom.getDate();
      this.dto = this.transferdateto.getDate();
      this.mfrom = this.transferdatefrom.getMonth();
      this.mto = this.transferdateto.getMonth();
      this.yfrom = this.transferdatefrom.getFullYear();
      this.yto = this.transferdateto.getFullYear();

      showstrwhere +=
        " วันที่โอนย้าย ระหว่าง " +
        this.dfrom +
        "/" +
        Number(this.mfrom + 1) +
        "/" +
        Number(this.yfrom + 543) +
        " ถึง " +
        this.dto +
        "/" +
        Number(this.mto + 1) +
        "/" +
        Number(this.yto + 543);
    }
    if (this.transfertype != null && this.transfertype != undefined) {
      this.svalue = showstrwhere;
      this.loadingVisible = true;
      this.data
        .get(
          "Prgstudenttransfer/Getbyaca/" +
            this.util.ntz(this.acadyear) +
            "/" +
            this.util.ntz(this.semester) +
            "/" +
            this.util.ntz(this.facultyid) +
            "/" +
            this.util.ntz(this.levelid) +
            "/" +
            this.util.ntz(this.campusid) +
            "/" +
            this.util.ntb(this.transfertype) +
            "/" +
            this.util.ntb(this.util.getdateformat(this.transferdatefrom)) +
            "/" +
            this.util.ntb(this.util.getdateformat(this.transferdateto))
        )
        .then((response: any) => {
          this.loadingVisible = false;
          if (response.length !== 0) {
            this.studenttransfer = response;
          } else {
            this.itemcount = 0;
            this.studentinfo = [];
            this.alert.Showwarning("ไม่พบข้อมูล");
            this.studenttransfer = [];
          }
        });
    } else {
      this.itemcount = 0;
      this.studentinfo = [];
      this.alert.Showwarning("กรุณาระบุประเภทการย้าย");
      this.studenttransfer = [];
    }
    this.btnsearchclicked = true;
  }
  getStudentinfo(studentid) {
    this.data
      .get("Prgstudenttransfer/Getviewstudentinfobystuid/" + studentid)
      .then((response: any) => {
        this.itemcount = Object.keys(response).length;
        this.studentinfo = response;
        // console.log(this.studentinfo)
      });
  }
  dataSave(data: any) {
    data.cancel = true;
    var parameter: any;
    if (data.changes.length != 0) {
      parameter = data.changes[0]["data"];
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keystudentid = data.changes[0]["key"].studentid;
          parameter.keyacadyear = data.changes[0]["key"].acadyear;
          parameter.keysemester = data.changes[0]["key"].semester;
          parameter.keytransfertype = data.changes[0]["key"].transfertype;
          if (
            parameter.newgroupyear !== null &&
            parameter.newgroupyear !== undefined &&
            parameter.newstudentgroup !== null &&
            parameter.newstudentgroup !== undefined
          ) {
            parameter.newprogramid = this.stugroupnamelistnew?.store?.filter(
              (item) =>
                "" + item.keystr1id == "" + parameter.newgroupyear &&
                "" + item.comboid == "" + parameter.newstudentgroup
            )[0].key2id;
          }

          //if (data.changes[0]['key'].transferstatus ==="Y"){
          //    this.alert.Showerror('ข้อมูลอยู่ในสถานะไม่สามารถแก้ไขข้อมูลได้');
          //this.getStudenttransfer();
          // }else{
          if(data.changes[0]['data'].transferstatus == 'Y')
            delete parameter.transferdate;
          // console.log(parameter);
          this.data
            .put("Prgstudenttransfer/Put", parameter)
            .then((resp: any) => {
              if(resp.result != 0){
                // console.log(resp)
                this.getStudenttransfer();
                this.alert.Showsuccess();
                data.component.cancelEditData();
              } else {
                this.alert.Showwarning(resp.message);
              }
            });
          // }
          break;

        case "insert":
          // console.log(this.stugroupnamelist);
          parameter.newprogramid = this.stugroupnamelistnew?.store?.filter((item) => "" + item.keystr1id == "" + parameter.newgroupyear && "" + item.comboid == "" + parameter.newstudentgroup)[0].key2id;
          parameter.transferdate = this.util.getdateformatora(parameter.transferdate);
          parameter.transfertype = this.transfertype;
          // return;
          // console.log(parameter);
          // var result = this.alert.MsgBoxCriticalresult(`เมื่อบันทึกรายการโอนย้ายหลักสูตร/สาขา จะมีผลเมื่อมีการปรับสถานะเป็น "ทำรายการ" ในภายหลัง`);
          // result.show().then((repa) => {
          // if (repa.value === "Y") {
          this.data.post("Prgstudenttransfer/Post", parameter).then((resp: any) => {
              this.getStudenttransfer();
              this.alert.Showsuccess();
              data.component.cancelEditData();
          });
          //  }
          //});
          break;

        case "remove":
          if (data.changes[0]["key"].transferstatus === "Y") {
            this.alert.Showerror("ข้อมูลอยู่ในสถานะไม่สามารถแก้ไขข้อมูลได้");
            this.getStudenttransfer();
          } else {
            this.data
              .delete(
                "Prgstudenttransfer/Delete/" +
                  data.changes[0]["key"].studentid +
                  "/" +
                  data.changes[0]["key"].acadyear +
                  "/" +
                  data.changes[0]["key"].semester +
                  "/" +
                  data.changes[0]["key"].transfertype
              )
              .then((resp: any) => {
                this.itemcount = 0;
                this.studentinfo = [];
                this.getStudenttransfer();
                this.alert.Showsuccess();
              });
          }
          data.component.cancelEditData();
          break;
      }
    }
  }
  onInsertingstart(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      e.data.acadyear = this.acadyear;
      e.data.semester = this.semester;
      e.data.transfertype = "P";
      e.data.transferdate = new Date();
      e.data.transferstatus = "N";
      sessionStorage.setItem("editmodeopen", "true");
      this.insertmode = true;
    } else {
      e.cancel = true;
    }
  }
  selectionChanged(data: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      if (
        data.selectedRowKeys[0]?.studentid != null &&
        data.selectedRowKeys[0]?.studentid !== "undefined"
      ) {
        this.studentid = data.selectedRowKeys[0].studentid;
        if (
          data.selectedRowKeys[0]?.newstudentcode != null &&
          data.selectedRowKeys[0]?.newstudentcode !== ""
        ) {
          this.studentcode = data.selectedRowKeys[0].newstudentcode;
        } else {
          this.studentcode = data.selectedRowKeys[0].studentcode;
        }
        this.getStudentinfo(data.selectedRowKeys[0].studentid);
      }
    }
  }

  setnewgroupyearValue(rowData: any, value: any): void {
    rowData.newstudentgroup = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }

  getFilterednewStudentgroup(options: any) {
    return {
      store: this.stugroupnamelistnew?.store,
      // filter: options.data ? ["key1id", "=", options.data.newgroupyear] : null,
      filter: options.data ? ["keystr1id", "=", options.data.newgroupyear] : null,
      paginate: true,
      pageSize: 10,
    };
  }

  updateCell(eventData: any, cellInfo: any) {
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  setstudentidValue(rowData: any, value: any, currentRowData: any) {
    return this.getdata(value).then((data: any) => {
      rowData.studentid = value;
      rowData.oldgroupyear = data[0].groupyear;
      rowData.oldstudentgroup = data[0].studentgroup;
      rowData.oldprogramid = data[0].programid;
    });
  }
  setoldstudentgroup(rowData: any, value: any, currentRowData: any) {
    // rowData.oldstudentgroup = value;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setnewstudentgroup(rowData: any, value: any) {
    // console.log(value)
    // rowData.newstudentgroup = value;
    // console.log(rowData);
    (<any>this).defaultSetCellValue(rowData, value);
  }
  getdata(val: any) {
    return this.data
      .get("Prgstudenttransfer/Getstudentbyid/" + val)
      .then((data) => {
        return data;
      });
  }

  getShowstrwhere(e: any) {
    if (typeof e.itemData.campusshow != "undefined")
      this.camwhere = "วิทยาเขต=" + e.itemData.campusshow || e.itemData;

    if (typeof e.itemData.facultyshow != "undefined")
      this.facwhere = "วิทยาลัย/คณะ/สถาบัน=" + e.itemData.facultyshow || e.itemData;

    if (typeof e.itemData.levelidshow != "undefined")
      this.levwhere = "ระดับ=" + e.itemData.levelidshow || e.itemData;
  }
  showLoadPanel() {
    this.loadingVisible = true;
  }
  onContentReadyHandler(e: any) {
    this.loadingVisible = false;
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
  ShowpopupSearchStudent() {
    this.popupVisible = true;
  }
  SearchStudenttransfer() {
    if (this.searchstudentid == null || this.searchstudentid == undefined) {
      this.alert.Warning("กรุณาระบุรหัสนักศึกษา");
    } else {
      this.loadingVisible = true;
      this.data
        .get(
          "Prgstudenttransfer/Getsearchstudenttransfer/" + this.searchstudentid
        )
        .then((response: any) => {
          this.searchstudentlist = response;
          this.tmptextsearch1 = this.searchstudentlist[0]?.studentcode;
          this.tmptextsearch2 =
          this.searchstudentlist[0]?.prefixname +
          "" +
          this.searchstudentlist[0]?.studentname +
          "  " +
          this.searchstudentlist[0]?.studentsurname;
          this.tmptextsearch3 = this.searchstudentlist[0]?.pgnameold;
          this.loadingVisible = false;
        });
    }
  }
  onToolbarPreparing(e: any) {
    var toolbarItems = e.toolbarOptions.items;
    if (
      this.transfertype == null ||
      this.transfertype == undefined ||
      this.transfertype === -1
    ) {
      $.each(toolbarItems, function (_, item) {
        if (item.name === "addRowButton") {
          item.options.onClick = function (args: any) {
            alert("คุณยังไมได้ระบุประเภทการย้าย");
          };
        }
      });
    }
    // e.toolbarOptions.items.unshift({
    //   location: "before",
    //   template: "heddershow",
    // });
  }
  
  onToolbarPreparing1(e: any) {
    var toolbarItems = e.toolbarOptions.items;
    if (
      this.transfertype == null ||
      this.transfertype == undefined ||
      this.transfertype === -1 || this.btnsearchclicked
    ) {
      $.each(toolbarItems, function (_, item) {
        if (item.name === "addRowButton") {
          item.options.onClick = function (args: any) {
            alert("คุณยังไมได้ระบุประเภทการย้าย");
          };
        }
      });
    }
    e.toolbarOptions.items.unshift({
      location: "before",
      template: "heddershow",
    });
  }
}
