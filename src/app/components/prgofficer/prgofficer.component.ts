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
  selector: "app-prgofficer",
  templateUrl: "./prgofficer.component.html",
  styleUrls: ["./prgofficer.component.css"],
})
export class PrgofficerComponent implements OnInit {
  //@ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  offlist: any;
  protyp: any;
  preshow: any;
  workpositionshow: any;
  positioncodeshow: any;
  officerstatusshow: any;
  officertypeshow: any;
  offautlist: any;
  offposlist: any;
  tmpOfficerid: any;
  prosta: any;
  propre: any;
  prover: any;
  proedi: any;
  levshow: any;
  levshow2: any;
  facshow: any = [];
  camshow: any;
  camshow2: any;
  facshow2: any;
  degshow: any;
  depshow: any = [];
  depsubshow: any = [];
  editstate = true
  lstDept;
  deptid;
  chkmis = false;
  load = false;

  depfacshow: any;
  showyn: any;

  // procodshow: any;
  // editmodeopen: boolean = false;
  // editmodeopen2: boolean = false;
  editmodeopen3: boolean = false;
  offimgx;
  st: boolean = false;
  stx;
  facid: number;
  proid: number;
  offcode: any;
  xdepid: any[] = [];
  depsubcombo: any;
  depcombo: any;
  flag1 = [
    { key: "Y", value: "Y : YES" },
    { key: "N", value: "N : NO" },
  ];
  imgv = [
    { key: false, value: "N : ไม่แสดงรูป" },
    { key: true, value: "Y : แสดงรูป" },
  ];
  loadingVisible: boolean = false;

  officerimg: any;

  positiontypelist;
  offtypecode: any;
  citizeneditorOptions = {
  mask: `0 0000 00000 00 0`,
  maskRules: {
    X: /[02-9]/,
  },
  maskInvalidMessage: 'เลขบัตรประชาชนต้องมี 13 หลัก',
  valueChangeEvent: 'keyup'
  }
  phoneeditorOptions = {
      mask: '(X00) 000-0000',
      // mask: `(X00) 000-0000`,
      // mask: `000 000-0000`,
      maskRules: {
      X: /[02-9]/,
      },
      maskInvalidMessage: 'หมายเลขโทรศัพท์ต้องมี 10 หลัก',
      valueChangeEvent: 'keyup'
  }
  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService
  ) {
    locale("th");
  }

  ngOnInit(): void {
    // this.getOff();
    this.getPre();
    this.getWorkposition();
    // this.getDepsubcombo();
    this.getDepcombo();
    // this.getProtyp();
    // this.getProsta();
    // this.getPropre();
    // this.getProver();
    // this.getProedi();
    this.getPositioncode();
    // this.getLev();
    this.getLev2();
    this.getFac();
    this.getCam();
    this.getCam2();
    this.getFac2();
    // this.getDeg();
    this.getDep();
    // this.getDepsub();
    //this.getDep2();
    //this.getProcod();
    // this.getShowyn();
    this.getOfficerstatus();
    this.getOfficertype();
    // this.depshow  = this.getDep();
    this.getFilteredDep = this.getFilteredDep.bind(this);
    this.getFilteredDep2 = this.getFilteredDep2.bind(this);
    this.getFilteredDepsub = this.getFilteredDepsub.bind(this);
    this.getFilteredDepsub2 = this.getFilteredDepsub2.bind(this);

    this.data
      .get("ComboSysbyt/getSysbytedes/OFFICER/POSITIONTYPE")
      .then((resp: any) => (this.positiontypelist = resp));
    // this.st=false;
  }
assertThaiId = async (thaiId: any) => {
        const m = thaiId.value.match(/(\d{12})(\d)/)
        if (!m) {
            this.alert.Showwarning('เลขบัตรประจำตัวประชาชนต้องมี 13 หลัก')
            throw new Error('เลขบัตรประจำตัวประชาชนต้องมี 13 หลัก')
        }
        const digits = m[1].split('');
        const sum = digits.reduce((total: number, digit: string, i: number) => {
            return total + (13 - i) * +digit;
        }, 0)
        const lastDigit = `${(11 - sum % 11) % 10}`
        const inputLastDigit = m[2]
        if (lastDigit !== inputLastDigit) {
            this.alert.Showwarning('เลขบัตรประจำตัวประชาชนไม่ถูกต้อง')
            throw new Error('เลขบัตรประจำตัวประชาชนไม่ถูกต้อง')
        }
        return true
    }
    assertPhone = async (phoneNumber: any) => {
        const m = phoneNumber.value.match(/(\d{10})/)
        if (!m) {
            this.alert.Showwarning('หมายเลขโทรศัพท์ต้องมี 10 หลัก')
            throw new Error('หมายเลขโทรศัพท์ต้องมี 10 หลัก')
        }
        return true
    }
  getDept() {
    this.deptid = null;
    if (this.facid) {
      this.data
        .getcombo("ComboDep/Getbyfacid/" + this.facid)
        .then((resp: any) => {
          this.lstDept = resp;
        });
    }
  }

  showLoadPanel() {
    //this.loadingVisible = true;
  }
  // getFilteredDep2(options :any) {
  //     if(options.data){
  //          return this.depshow.filter(data=> data.facultyid == options.data.facultyid || data.facultyid == -1).sort((a,b)=> a.facultyid - b.facultyid);
  //      }else{
  //          return this.depshow;
  //     }

  // }
  getFilteredDep(options: any) {
    return {
      store: this.depcombo,
      filter: options.data ? ["key1id", "=", options.data.facultyid] : null,
    };
  }
  getFilteredDep2(options: any) {
    return {
      store: this.depshow,
      filter: options.data ? ["key1id", "=", options.data.facultyid] : null,
    };
  }
  getFilteredDepsub(options: any) {
    // console.dir(options);
    return {
      store: this.depsubcombo,
      filter: options.data
        ? [
            ["key1id", "=", options.data.facultyid],
            "and",
            ["key2id", "=", options.data.departmentid],
          ]
        : null,
    };
  }
  getFilteredDepsub2(options: any) {
    // console.dir(options);
    return {
      store: this.depsubshow,
      filter: options.data
        ? [
            ["key1id", "=", options.data.facultyid],
            "and",
            ["key2id", "=", options.data.departmentid],
          ]
        : null,
    };
  }

  setdepid(rowData: any, value: any): void {
    rowData.departmentid = null;
    // rowData.departmentsubid = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  setdepid3(rowData: any, value: any): void {
    rowData.departmentid = null;
    (<any>this).defaultSetCellValue(rowData, value);
  }
  // setdepsubid(rowData: any, value: any): void {
  //   rowData.departmentsubid = null;
  //   (<any>this).defaultSetCellValue(rowData, value);
  // }
  setdepid2(rowData: any, value: any): void {
    // if (value = -1){
    //     rowData.facultyid = value;
    //     rowData.departmentid =-1;
    //     rowData.departmentsubid = -1;

    // }else{
    rowData.facultyid = value;
    rowData.departmentid = null;
    // rowData.departmentsubid = null;
    //}
    (<any>this).defaultSetCellValue(rowData, value);
  }
  // setdepsubid2(rowData: any, value: any): void {
  //   rowData.departmentsubid = null;
  //   (<any>this).defaultSetCellValue(rowData, value);
  // }
  onEditorPreparing(e: any) {
    if (e.parentType === "dataRow" && e.dataField === "departmentid") {
      e.editorOptions.disabled = typeof e.row.data.facultyid !== "number";
    }
  }
  // getOff() {
  //     this.data.get('Off/All').then((resp:any) => {
  //         this.offlist = resp;
  //     });
  // }
  getCam() {
    this.data.get("ComboCam/All").then((resp: any) => {
      this.camshow = resp;
    });
  }
  getCam2() {
    this.data.get("ComboCam/OverAll").then((response: any) => {
      this.camshow2 = response;
    });
  }

  getPre() {
    this.data.get("ComboPre/All").then((resp: any) => {
      this.preshow = resp;
    });
  }

  getWorkposition() {
    this.data.get("ComboPre/ComboPretype/W/A").then((resp: any) => {
      this.workpositionshow = resp;
    });
  }

  // getProtyp() {
  //     this.data.get('ComboSysbyt/getSysbytedes/PROGRAM/PROGRAMTYPE').then((resp:any) => {
  //         this.protyp = resp;
  //     });
  // }
  getPositioncode() {
    this.data
      .get("ComboSysbyt/getSysbytedes/OFFICER/POSITIONCODE")
      .then((resp: any) => {
        this.positioncodeshow = resp;
      });
  }
  getOfficerstatus() {
    this.data
      .get("ComboSysbyt/getSysbytedes/OFFICER/OFFICERSTATUS")
      .then((resp: any) => {
        this.officerstatusshow = resp;
      });
  }
  getOfficertype() {
    this.data
      .get("ComboSysbyt/getSysbytedesnum/OFFICER/OFFICERTYPE")
      .then((resp: any) => {
        this.officertypeshow = resp;
      });
  }
  // getProsta() {
  //     this.data.get('ComboSysbyt/getSysbytedesnum/PROGRAM/PROGRAMSTATUS').then((resp:any) => {
  //         this.prosta = resp;
  //     });
  // }
  // getPropre() {
  //     this.data.get('ComboSysbyt/getSysbytedes/PROGRAM/PROGRAMPREFIX').then((resp:any) => {
  //         this.propre = resp;
  //     });
  // }
  // getProver() {
  //     this.data.get('ComboSysbyt/getSysbytedes/PROGRAM/PROGRAMVERSION').then((resp:any) => {
  //         this.prover = resp;
  //     });
  // }
  // getProedi() {
  //     this.data.get('ComboSysbyt/getSysbytedes/PROGRAM/PROGRAMEDITTYPE').then((resp:any) => {
  //         this.proedi = resp;
  //     });
  // }
  // getShowyn() {
  //     this.data.get('ComboSysbyt/getSysbytedes/PROGRAM/SHOWTRANSCRIPT').then((resp:any) => {
  //         this.showyn = resp;
  //     });
  // }

  // getLev() {
  //     this.data.get('Lev/All').then((response:any) => {this.levshow = response;});
  // }
  getLev2() {
    this.data.get("ComboLev/OverAll").then((response: any) => {
      this.levshow2 = response;
    });
  }
  getFac() {
    this.data.get("ComboFac/OverAll").then((response: any) => {
      this.facshow = response;
    });
  }

  getFac2() {
    this.data.get("ComboFac/All").then((response: any) => {
      this.facshow2 = response;
    });
  }

  // getDeg() {
  //     this.data.get('Deg/All').then(
  //         (response:any) => {
  //                 this.degshow = response;
  //         }
  //     );
  // }

  getDepfac(options: any) {
    this.data
      .get("Dep/Getdepbyfac/" + options.data.facultyid)
      .then((response: any) => {
        this.depfacshow = response;
      });
  }
  //   console.

  // getDep() {
  //     this.data.get('Dep/All').then(
  //         (response:any) => {
  //             this.depshow = response;
  //             this.depshow.push({
  //                 departmentabb: '',
  //                 departmentabbeng: '',
  //                 departmentid: -1,
  //                 departmentname: 'ทุกภาค/สาขา',
  //                 departmentnameeng: '',
  //                 departmentshow: 'All : ทุกภาค/สาขาา',
  //                 facultyid: -1,
  //             });
  //         }
  //     );
  // }

  getDep() {
    this.data.get("ComboDep/OverAll").then((response: any) => {
      this.depshow = response;
      // console.dir(response);
    });
  }
  // getDepsub() {
  //   this.data.get('ComboDepsub/OverAll').then((response: any) => {
  //     this.depsubshow = response;
  //   });
  // }

  // getDep2() {
  //     this.data.get('Dep/All').then(
  //         (response:any) => {
  //             //   console.log(response);
  //             this.depshow2 = response;
  //         }
  //     );
  // }
  // getDepsubcombo() {
  //   this.data.get('ComboDepsub/All').then((response: any) => {
  //     this.depsubcombo = response;
  //   });
  // }
  getDepcombo() {
    this.data.get("ComboDep/All").then((response: any) => {
      this.depcombo = response;
    });
  }

  // getProcod() {
  //     this.data.get('Procod/All').then(
  //         (response:any) => {
  //             //   console.log(response);
  //             this.procodshow = response;
  //         }
  //     );
  // }

  getOffaut(officerid: number) {
    // this.data.get("Offaut/Getoffautbyid/" + officerid).then((resp: any) => {
    this.data.get("Prgofficer/Getoffautbyid/" + officerid).then((resp: any) => {
      this.offautlist = resp;
    });
  }

  getOffpos(officerid: number) {
    this.offposlist = [];
    this.data.get("Prgofficer/Getoffposbyid/" + officerid).then((resp: any) => {
      this.offposlist = resp;
      //console.log(resp);
    });
  }

  dataSave(data: any) {
    let parameter: any;
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]["data"];
      if(data.changes[0]["type"] == "insert" || data.changes[0]["type"] == "update"){
        if(parameter?.citizenid){
          if(this.checkID(parameter.citizenid) == false){
            this.alert.Showwarning("เลขประจำตัวประชาชน ไม่ถูกต้อง");
            return;
          }
        }
      }
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keyofficerid = data.changes[0]["key"].officerid;
          this.data.put("Prgofficer/Put", parameter).then((resp: any) => {
            this.onSearch();
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });
          break;
        case "insert":
          // console.log(parameter);
          parameter.officerpassword = data.changes[0]["data"].citizenid
          this.data.post("Prgofficer/Post", parameter).then((resp: any) => {
            this.onSearch();
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });
          break;
        case "remove":
          this.data
            .delete("Prgofficer/Delete/" + data.changes[0]["key"].officerid)
            .then((resp: any) => {
              this.onSearch();
              this.alert.Showsuccess();
            });
          // this.onSearch();
          data.component.cancelEditData();
          break;
      }
    } else {
      // this.editmodeopen = false;
      sessionStorage.setItem("editmodeopen", "false");
    }
  }

  //==========================================================================================================================================================
  dataSavex(data: any) {
    let parameter: any;

    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]["data"];

      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keyofficerid = data.changes[0]["key"].officerid;
          parameter.keysequence = data.changes[0]["key"].sequence;
          this.data.put("Prgofficer/Putoffaut", parameter).then((resp: any) => {
            this.getOffaut(this.tmpOfficerid);
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });

          break;

        case "insert":
          parameter.officerid = this.tmpOfficerid;
          this.data.post("Prgofficer/Postoffaut", parameter).then((resp: any) => {
            this.getOffaut(this.tmpOfficerid);
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });
          break;

        case "remove":
          this.data
            .delete(
              "Prgofficer/Deleteoffaut/" +
                data.changes[0]["key"].officerid +
                "/" +
                data.changes[0]["key"].sequence
            )
            .then((resp: any) => {
              this.getOffaut(data.changes[0]["key"].officerid);
              this.alert.Showsuccess();
            });
          data.component.cancelEditData();
          break;
      }
    }
  }

  //==========================================================================================================================================================

  dataSavexx(data: any) {
    let parameter: any;

    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]["data"];

      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keyofficerid = data.changes[0]["key"].officerid;
          parameter.keyacadyear = data.changes[0]["key"].acadyear;
          parameter.keysemester = data.changes[0]["key"].semester;
          parameter.keypositioncode = data.changes[0]["key"].positioncode;
          this.data.put("Prgofficer/Putoffpos", parameter).then((resp: any) => {
            this.getOffpos(this.tmpOfficerid);
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });

          break;

        case "insert":
          parameter.officerid = this.tmpOfficerid;
          // console.log(parameter);
          this.data.post("Prgofficer/Postoffpos", parameter).then((resp: any) => {
            this.getOffpos(this.tmpOfficerid);
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });
          break;

        case "remove":
          this.data
            .delete(
              "Prgofficer/Deleteoffpos/" +
                data.changes[0]["key"].officerid +
                "/" +
                data.changes[0]["key"].acadyear +
                "/" +
                data.changes[0]["key"].semester +
                "/" +
                data.changes[0]["key"].positioncode
            )
            .then((resp: any) => {
              this.getOffpos(this.tmpOfficerid);
              this.alert.Showsuccess();
            });
          data.component.cancelEditData();
          break;
      }
    }
  }

  //==========================================================================================================================================================

  Showerror(message: any, type: any) {
    let option = {
      message: message,
    };
    notify(option, type, 5000);
  }

  onCancelEditmode() {
    this.editstate = true;
    sessionStorage.setItem("editmodeopen", "false");
  }

  // onEditstart(e: any) {

  //     if (!this.editmodeopen) {
  //         this.editmodeopen = true;
  //     } else {
  //         this.alert.Warning(1);
  //         e.cancel = true;
  //     }
  // }

  onCancelEditmode2() {
    sessionStorage.setItem("editmodeopen", "false");
  }

  // onEditstart2(e: any) {

  //     if (!this.editmodeopen2) {
  //         this.editmodeopen2 = true;
  //     } else {
  //         this.alert.Warning(1);
  //         e.cancel = true;
  //     }

  // }

  onCancelEditmode3() {
    sessionStorage.setItem("editmodeopen", "false");
  }

  // onEditstart3(e: any) {

  //     if (!this.editmodeopen3) {
  //         this.editmodeopen3 = true;
  //     } else {
  //         this.alert.Warning(1);
  //         e.cancel = true;
  //     }
  // }

  // selectionChanged(data:any) {
  //     if (!this.editmodeopen) {
  //         this.tmpOfficerid = data.selectedRowKeys[0].officerid;

  //         if (data) {
  //             this.getOffaut(data.selectedRowKeys[0].officerid);
  //             this.getOffpos(data.selectedRowKeys[0].officerid);
  //         }
  //     } else {
  //         //this.alert.Warning(1);
  //     }
  // }

  getDefault(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      sessionStorage.setItem("editmodeopen", "true");
    }
    // else{

    //   //  alert("คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข")

    //   }
  }

  getDefaultoffaut(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      sessionStorage.setItem("editmodeopen", "true");
    }
    // else {

    //     //  alert("คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข")

    // }
  }

  getDefaultoffpos(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      sessionStorage.setItem("editmodeopen", "true");
    }
    // else {

    //     //  alert("คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข")

    // }
  }

  selectionChanged(data: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      if (data.currentSelectedRowKeys.length > 0) {
        this.tmpOfficerid = data.selectedRowKeys[0].officerid;
        this.getOffpos(data.selectedRowKeys[0].officerid);
        this.getOffaut(data.selectedRowKeys[0].officerid);
      } else {
        this.tmpOfficerid = null;
      }
    }
    // else {

    //             this.alert.Warning(1);
    //         }
  }

  selectionChangedoffaut(data: any) {
    //console.log(data.selectedRowKeys[0].roomusetypecode);
    if (sessionStorage.getItem("editmodeopen") == "false") {
      this.tmpOfficerid = data.selectedRowKeys[0].officerid;
      //this.dislist = this.getDis(data.selectedRowKeys[0].provinceid);
      this.getOffaut(data.selectedRowKeys[0].officerid);
    }
    // else {
    //             this.alert.Warning(1);
    //         }
  }

  onSearch() {
    let camidx = -9;
    let offcodex = "null";
    let offnamex = "null";
    let offsurnamex = "null";
    let offtypecodex = "null";
    let facidx = -9;
    this.offlist = [];
    this.offautlist = [];
    this.offposlist = [];
    if (this.offcode != "") {
      if (this.offcode != undefined) {
        offcodex = this.offcode;
      }
    }
    if (this.facid > 0) {
      facidx = this.facid;
    }
    if(this.facid == null && this.deptid == null && this.offtypecode == null && this.offcode == null ||this.offcode == '') {
      alert("กรุณาระบุข้อมูลอย่างน้อย 1 อย่าง");
    } else {
      this.load = true;
    // this.data.get('Off/Getoffbyfaccode/' +
    this.data
      .get(
        "Prgofficer/Getoffbyfaccode/" +
          this.util.ntz(this.facid) +
          "/" +
          this.util.ntz(this.deptid) +
          "/" +
          this.util.ntb(this.offtypecode) +
          "/" +
          this.chkmis +
          "/" +
          this.util.ntb(this.offcode)
      )
      .then((resp: any) => {
        if (resp.length !== 0) {
          //console.log(resp)
          this.offlist = resp;
        } else {
          this.Showerror("ไม่พบข้อมูล", "warning");
          this.offlist = [];
        }
        this.load = false;
      });
    }
    
  }

  onEditstart(e: any) {
    this.editstate = false

    this.data
      .get("Prgofficer/Getoffimg/" + this.util.ntb(e.data.officercode))
      .then((resp: any) => {
        if (resp.length !== 0) {
          this.officerimg = resp[0].offimg;
        } else {
          this.officerimg = "assets/images/null.jpg";
        }
      });
  }

  getofficerimg() {
    return this.officerimg;
  }

  // onSearchxx() {
  //   let strwhere = "";
  //   if (this.facid > 0) {
  //     // console.log(strwhere.length);
  //     if (strwhere.length > 0) {
  //       strwhere = strwhere + " and ";
  //     }
  //     strwhere = strwhere + "facultyid=" + this.facid;
  //   }
  //   if (this.offcode !== "") {
  //     if (this.offcode !== undefined) {
  //       // if (this.offcode !== null) {
  //       //let dataGrid = this.dataGrid.instance;
  //       //dataGrid.clearSelection();

  //       if (strwhere.length > 0) {
  //         strwhere = strwhere + " and ";
  //       }
  //       strwhere = strwhere + "officercode='" + this.offcode + "'";
  //     }
  //   }
  //   this.data.get("Off/Getoffby/" + strwhere).then((resp: any) => {
  //     this.offlist = resp;
  //     // this.studentlist = ""
  //   });
  // }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.find(
      (i) => (i.name = "columnChooserButton")
    ).showText = "always";
    var toolbarItems = e.toolbarOptions.items;
    if (this.tmpOfficerid == null && this.tmpOfficerid == undefined) {
      $.each(toolbarItems, function (_, item) {
        if (item.name === "addRowButton") {
          item.options.onClick = function (args: any) {
            alert("คุณยังไมได้ระบุข้อมูลอาจารย์");
          };
        }
      });
    }

    e.toolbarOptions.items.unshift({
      location: "before",
      template: "",
    });
  }

  gridofficerToolbarPreparing(e: any) {
    //     this.getClaRatTyp();
    // // this.classratetype.forEach(function (item) {
    //         this.selectclassratetype.push({ bytecode: 1, bytedesshow: 2 });
    //       // })
    // e.toolbarOptions.items.find(i => i.name = "columnChooserButton").showText = 'always';
    // e.toolbarOptions.items.unshift(
    //     {
    //         location: 'before',
    //         // template: 'รูปอาจารย์'
    //     },
    //     {
    //         location: 'before',
    //         widget: 'dxSelectBox',
    //         options: {
    //             //   width: 250,
    //             items: this.imgv,
    //             displayExpr: 'value',
    //             valueExpr: 'key',
    //             value: this.st,
    //             //   options: {
    //             // width: 250,
    //             onValueChanged: this.onshowpic.bind(this)
    //             //   }
    //         }
    //     }
    // );
  }

  onshowpic(e: any) {
    this.st = e.value;
    // this.onSearch();
  }
  onToolbarPreparing2(e: any) {
    e.toolbarOptions.items.find(
      (i) => (i.name = "columnChooserButton")
    ).showText = "always";
    var toolbarItems = e.toolbarOptions.items;
    if (this.tmpOfficerid == null && this.tmpOfficerid == undefined) {
      $.each(toolbarItems, function (_, item) {
        if (item.name === "addRowButton") {
          item.options.onClick = function (args: any) {
            alert("คุณยังไมได้ระบุข้อมูลอาจารย์");
          };
        }
      });
    }

    e.toolbarOptions.items.unshift({
      location: "before",
      template: "",
    });
  }
  onContentReadyHandler(e: any) {
    // Selects the first visible row
    this.loadingVisible = false;
  }

  updatedatafrom(eventData: any, cellInfo: any) {
    // console.log(eventData.value + ' '+cellInfo.data)
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }

  Changedpanel(e) {
    //console.log(e);
    if(this.tmpOfficerid){
      if (e.addedItems[0].title == "ตำแหน่งบริหาร") {
        this.getOffpos(this.tmpOfficerid);
      } else {
        this.getOffaut(this.tmpOfficerid);
      }
    }
  }

  checkID(id) {
    var sum, i;
    if (id.length != 13) return false;
    for (i = 0, sum = 0; i < 12; i++)
      sum += parseFloat(id.charAt(i)) * (13 - i);
    if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) return false;
    return true;
  }
}
