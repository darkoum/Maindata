import { Component, OnInit } from "@angular/core";
import notify from "devextreme/ui/notify";
import { Encrypt } from "./../../shareds/encrypt";
import { HttpService } from "src/app/services/http.service";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import { UtilService } from "src/app/services/util.service";
import { AlertService } from "src/app/services/alert.service";
import { Router } from "@angular/router";
import { tick } from "@angular/core/testing";
import { filter, min } from "rxjs/operators";
@Component({
    standalone: false,
  selector: "app-prgstudentbioentry",
  templateUrl: "./prgstudentbioentry.component.html",
  styleUrls: ["./prgstudentbioentry.component.css"],
})
export class PrgstudentbioentryComponent implements OnInit {
  // !prgstudentbioentry
  // *datalist's variable
  dummysource: any = [];
  comboentryconfiggroup: any = [];
  storeentryconfig: any = [];
  studentinfo: any = [];
  columntype: any = [];
  comboquestion: any = [];
  tmpcombo: any = [];
  // *ngmodel's variable
  entryconfiggroup: string = null;
  loadingVisible: boolean = false;
  studentid: number = 0;
  studentcode: string = null;
  // validatorRules: any = {
  //   nameRequired: [{type: 'required', message: 'กรุณากรอกข้อมูล'}],
  //   citizenidchk: [{type: 'range', min: 13, max:14,  message: 'เลขบัตรประชาชนไม่ถูกต้อง'}],
  // }
  eachRowRules: { _rule: any[] } = {
    _rule: [],
  };
  // eachOption: {option: any[]} = {
  //   option: []
  // }
  citizeneditorOptions = {
    // mask: '+1 (X00) 000-0000',
    mask: `0 0000 00000 00 0`,
    maskRules: {
      X: /[02-9]/,
    },
    maskInvalidMessage: "เลขบัตรประชาชนต้องมี 13 หลัก",
    valueChangeEvent: "keyup",
  };
  phoneeditorOptions = {
    mask: `000-000-0000`,
    maskRules: {
      X: /[02-9]/,
    },
    maskInvalidMessage: "หมายเลขโทรศัพท์ต้องมี 10 หลัก",
    valueChangeEvent: "keyup",
  };
  dataGridInstance: any;
  constructor(
    private routes: Router,
    private data: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService
  ) {
    locale("th");
    if (sessionStorage.getItem("studentcodesearch") != null) {
      this.studentcode = sessionStorage.getItem("studentcodesearch");
      this.getstudentdata(this.studentcode);
      sessionStorage.removeItem("studentcodesearch");
    }
  }
  ngOnInit(): void {
    this.getCombo();
    // this.studentcode = '67111140041'
  }
  getCombo() {
    this.data
      .getcombo(`Prgstudentbioentry/Getentryconfiggroup`)
      .then((resp: any) => {
        this.comboentryconfiggroup = resp;
        // this.comboentryconfiggroup.store.unshift({ comboshow: 'ทั้งหมด', comboid: 'N' });
        this.entryconfiggroup = this.comboentryconfiggroup?.store[0]?.comboid;
      });
  }
  // entryconfiggroupbtn_changed() {
  //   if (this.entryconfiggroup) this.getstoreconfiggroup(this.entryconfiggroup);
  // }
  getstoreconfiggroup() {
    if(this.entryconfiggroup){
      this.loadingVisible = true;
      this.storeentryconfig = null;
      // .get(`Prgstudentbioentry/Getstoreconfiggroup/${configgroup}`)
      if(this.studentid){
        this.data.get(`Prgstudentbioentry/Getanswer/${this.entryconfiggroup}/${this.studentcode}/null`).then((resp: any) => {
          this.storeentryconfig = resp;
          // console.log(this.storeentryconfig)
          this.loadingVisible = false;
        })
      } else {
        this.data.get(`Prgstudentbioentry/Getstoreconfiggroup/${this.entryconfiggroup}`)
        .then((resp: any) => {
          this.storeentryconfig = resp;
          this.loadingVisible = false;
        });
      }
    }
  }
 
  setAnswer(entryid: number, answer: any){
    // const rowIndex = this.dataGridInstance.getRowIndexByKey(entryid);
    // console.log(rowIndex)
    const row = this.storeentryconfig.find(x => x.entryid == entryid);
    if(row){
      row.invalue = answer;
      this.storeentryconfig = [...this.storeentryconfig];
    }
  }
  getstudentdata(studentcode: string) {
    // console.log(this.studentid)
    this.loadingVisible = true;
    this.data
      .get(`Prgstudentbioentry/Getstudentdata/${studentcode}`)
      .then((resp: any) => {
        this.studentinfo = resp;
        // console.log(resp)
        if(resp[0]?.result != 0){
          this.studentid = this.studentinfo[0]?.studentid;
          if(this.entryconfiggroup){
            this.storeentryconfig = null;
            this.getstoreconfiggroup();
          }
          // this.data
          //   .get(
            //     `Prgstudentbioentry/Setstoreconfiggroupwithstudentcode/${
              //       this.entryconfiggroup
              //     }/${this.util.ntb(studentcode)}/null`
              //   )
              //   .then((resp) => {
                //     this.storeentryconfig = resp;
                //     this.loadingVisible = false;
                //   });
        }else {
          this.alert.Showerror(resp[0].message);
          this.loadingVisible = false;
        }
      });
  }
  searchbtn() {
    if (
      typeof this.studentcode == "undefined" ||
      this.studentcode == "undefined" ||
      this.util.ntb(this.studentcode) == "null"
    ) {
      this.openformstudentsearch();
    } else {
      this.getstudentdata(this.studentcode);
    }
  }
  onEditingStart(e: any) {
    if (e.data.updatecolumn.includes("SUBDISTRICT")){
      e.data.combo = this.firstStatefilteredCombo(e, "SUBDISTRICT", "DISTRICT");
      this.eachRowRules = this.getValidationrules(e.data);
      return;
    }
    if(e.data.updatecolumn.includes("ADDRESS2"))
      e.data.combo = this.firstStatefilteredCombo(e, "ADDRESS2", "DISTRICT");
    if (e.data.updatecolumn.includes("DISTRICT"))
      e.data.combo = this.firstStatefilteredCombo(e, "DISTRICT", "PROVINCEID");
    if (e.data.updatecolumn.includes("ZIPCODE"))
      e.data.combo = this.firstStatefilteredCombo(e, "ZIPCODE", "SUBDISTRICT");
    this.eachRowRules = this.getValidationrules(e.data);
  }
  getValidationrules(eventData: any) {
    let _rule = [];
    if (
      eventData.updatecolumn.includes("NAME") ||
      eventData.updatecolumn.includes("PROVINCEID") ||
      eventData.updatecolumn.includes("DISTRICT") ||
      eventData.updatecolumn.includes("SUBDISTRICT") ||
      eventData.updatecolumn.includes("ADDRESS2") ||
      eventData.updatecolumn.includes("ZIPCODE")
    )
      _rule.push({
        type: "required",
        message: "กรุณากรอก" + eventData.entryname,
      });
    if (eventData.updatecolumn.includes("CITIZENID"))
      _rule.push({
        type: "async",
        message: "เลขบัตรประจำตัวประชาชนไม่ถูกต้อง",
        validationCallback: this.assertThaiId,
      });
    if (eventData.updatecolumn.includes("PHONE"))
      _rule.push({
        type: "async",
        message: "หมายเลขโทรศัพท์ไม่ถูกต้อง",
        validationCallback: this.assertPhone,
      });
    if (eventData.updatecolumn.includes("EMAIL"))
      _rule.push({ type: "email", message: "รูปแบบ E-Mail ไม่ถูกต้อง" });
    return { _rule };
  }
  firstStatefilteredCombo(eventData: any, searchstr: string, constr: string) {
    let prefix = null;
    let arryidx = 0;
    prefix =
      eventData.data.updatecolumn.substring(
        0,
        eventData.data.updatecolumn.indexOf(searchstr)
      ) + constr;
    arryidx = this.storeentryconfig.findIndex((x) => x.updatecolumn == prefix);
    if(arryidx <= 0 && searchstr.toUpperCase() == "ZIPCODE"){
      prefix = eventData.data.updatecolumn.substring(0, eventData.data.updatecolumn.indexOf(searchstr)) + 'ADDRESS2';
      arryidx = this.storeentryconfig.findIndex((x) => x.updatecolumn == prefix);
    }
    if (arryidx >= 1) {
      if (this.util.ntz(this.storeentryconfig[arryidx].invalue) != -9) {
        if (searchstr.toUpperCase() == "ZIPCODE") {
          return eventData.data.combo.filter(
            (x) =>
              x.comboid == this.util.ntz(this.storeentryconfig[arryidx].invalue)
          );
        } else {
          return eventData.data.combo.filter(
            (x) =>
              x.keystr1id ==
              this.util.ntz(this.storeentryconfig[arryidx].invalue)
          );
        }
      }
    }
  }
  updatedataform(eventData: any, cellInfo: any) {
    if (cellInfo.data.updatecolumn.includes("SUBDISTRICT")){
      this.filterCombo(eventData, cellInfo, "SUBDITTRCIT", "ZIPCODE");
      if(cellInfo.setValue){
        cellInfo.setValue(eventData.value);
      }
      return;
    }
    if (cellInfo.data.updatecolumn.includes("ADDRESS2"))
      this.filterCombo(eventData, cellInfo, "ADDRESS2", "ZIPCODE");
    if (cellInfo.data.updatecolumn.includes("DISTRICT"))
      this.filterCombo(eventData, cellInfo, "DISTRICT", "SUBDISTRICT");
    if (cellInfo.data.updatecolumn.includes("PROVINCEID"))
      this.filterCombo(eventData, cellInfo, "PROVINCEID", "DISTRICT");
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  clearinvalue(prefix: string, addresstype: string) {
    if (addresstype.toUpperCase() == "PROVINCEID") {
      let districtarryidx = this.storeentryconfig.findIndex(
        (x) => x.updatecolumn == prefix + "DISTRICT"
      );
      let subdistrictarryidx = this.storeentryconfig.findIndex(
        (x) => x.updatecolumn == prefix + "SUBDISTRICT"
      );
      let address2arryidx = this.storeentryconfig.findIndex(
        (x) => x.updatecolumn == prefix + "ADDRESS2"
      )
      let zipcodearryidx = this.storeentryconfig.findIndex(
        (x) => x.updatecolumn == prefix + "ZIPCODE"
      );
      this.storeentryconfig[districtarryidx].invalue = null;
      if(address2arryidx >= 0)
        this.storeentryconfig[address2arryidx].invalue = null;
      this.storeentryconfig[subdistrictarryidx].invalue = null;
      this.storeentryconfig[zipcodearryidx].invalue = null;
    } else if (addresstype.toUpperCase() == "DISTRICT") {
      let subdistrictarryidx = this.storeentryconfig.findIndex(
        (x) => x.updatecolumn == prefix + "SUBDISTRICT"
      );
      let zipcodearryidx = this.storeentryconfig.findIndex(
        (x) => x.updatecolumn == prefix + "ZIPCODE"
      );
      this.storeentryconfig[subdistrictarryidx].invalue = null;
      this.storeentryconfig[zipcodearryidx].invalue = null;
    } else if (addresstype.toUpperCase() == "SUBDISTRICT" || addresstype.toUpperCase() == "ADDRESS2") {
      let zipcodearryidx = this.storeentryconfig.findIndex(
        (x) => x.updatecolumn == prefix + "ZIPCODE"
      );
      this.storeentryconfig[zipcodearryidx].invalue = null;
    }
  }
  filterCombo(
    eventData: any,
    cellInfo: any,
    searchstr: string,
    constr: string //For filter district
  ) {
    let prefix = null;
    let fullprefix = null;
    let arryidx = 0;
    if (cellInfo.data.updatecolumn.includes(searchstr)) {
      prefix = cellInfo.data.updatecolumn.substring(
        0,
        cellInfo.data.updatecolumn.indexOf(searchstr)
      );
      fullprefix = prefix + constr;
    }
    arryidx = this.storeentryconfig.findIndex(
      (x) => x.updatecolumn == fullprefix
    );
    if (arryidx >= 1) {
      this.clearinvalue(prefix, searchstr);
      let filtered = this.storeentryconfig.filter(
        (x) => x.updatecolumn == fullprefix
      )[0].combo;
      if (searchstr.toUpperCase() == "SUBDISTRICT" || searchstr.toUpperCase() == "ADDRESS2") {
        filtered = filtered.filter((x) => x.comboid == eventData.value);
      } else {
        filtered = filtered.filter((x) => x.keystr1id == eventData.value);
      }
      this.storeentryconfig[arryidx].combo = filtered;
    }
  }
  assertThaiId = async (thaiId: any) => {
    // const m = thaiId.value.match(/(\d{12})(\d)/);
    const m =
      this.util.ntb(thaiId.value) != "null"
        ? thaiId.value.match(/(\d{12})(\d)/)
        : thaiId.match(/(\d{12})(\d)/);
    if (!m) {
      throw new Error("เลขบัตรประจำตัวประชาชนต้องมี 13 หลัก");
    }
    const digits = m[1].split("");
    const sum = digits.reduce((total: number, digit: string, i: number) => {
      return total + (13 - i) * +digit;
    }, 0);
    const lastDigit = `${(11 - (sum % 11)) % 10}`;
    const inputLastDigit = m[2];
    if (lastDigit !== inputLastDigit) {
      throw new Error("เลขบัตรประจำตัวประชาชนไม่ถูกต้อง");
    }
    return true;
  };
  assertPhone = async (phoneNumber: any) => {
    // const m = phoneNumber.value.match(/(\d{9}|\d{10})/)
    const m = phoneNumber.value.match(/(\d{10})/);
    if (!m) {
      throw new Error(`หมายเลขโทรศัพท์ต้องมี 10 หลัก`);
    }
    return true;
  };
  tmpassertThaiId(thaiId: string) {
    const m = thaiId.match(/(\d{12})(\d)/);
    if (!m) {
      return false;
    }
    const digits = m[1].split("");
    const sum = digits.reduce((total: number, digit: string, i: number) => {
      return total + (13 - i) * +digit;
    }, 0);
    const lastDigit = `${(11 - (sum % 11)) % 10}`;
    const inputLastDigit = m[2];
    if (lastDigit !== inputLastDigit) {
      return false;
    }
    return true;
  }
  async onRowValidating(e) {
    const data = { ...e.oldData, ...e.newData };
    e.isValid = true;
    if (data.updatecolumn.includes("CITIZENID")) {
      if (data.invalue.length != 13) e.isValid = false;
      e.isValid = this.tmpassertThaiId(data.invalue);
    } else if (
      this.util.ntb(data.invalue) == "null" &&
      data.updatecolumn == "NAME"
    ) {
      e.isValid = false;
    } else if (data.updatecolumn.includes("PHONE")) {
      if (data.invalue.length != 10) e.isValid = false;
    } else if (
      data.updatecolumn.includes("PROVINCEID") ||
      data.updatecolumn.includes("DISTRICT") ||
      data.updatecolumn.includes("SUBDISTRICT") ||
      data.updatecolumn.includes("ADDRESS2") ||
      data.updatecolumn.includes("ZIPCODE")
    ) {
      if (this.util.ntb(data.invalue) == "null") e.isValid = false;
    }
  }
  onEditorPreparing(e) {
    if (e.parentType === "dataRow" && e.dataField === "invalue") {
      // const com = e.row.data.combo.map(item => item.comboshow);
      const com = e.row.data.combo.map((item) => ({
        comboid: item.comboid,
        comboshow: item.comboshow,
      }));
      e.editorOptions.dataSource = com;
    }
  }
  onCellPrepared(e: any) {
    if(e.rowType === "data" && e.column.command === "edit") {
      if(!e.row.data.updatecolumn){
        var button = e.cellElement.querySelector(".dx-link-edit");
        button.remove();
      }
    }
  }
  comboshow(data: any) {
    return `${data.comboid} : ${data.comboshow}`;
  }
  comboid(data: any) {
    return data.comboid;
  }
  cellTemplate(c: any, e: any) {
    let cnt = 0;
    let tmpresult = [];
    if (e.data.combo != null) {
      let tmp = e.data.combo.forEach((el) => {
        if (el.comboid == e.key.invalue) c.textContent = el.comboshow;
        cnt += 1;
      });
    }
    if (e.data.columntype == `D` && e.key.invalue != null) {
      let date = new Date(e.key.invalue);
      let shortdate = date.toLocaleDateString(`th-TH`, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      c.textContent = shortdate;
    } else if (cnt <= 0) {
      if (e?.data?.updatecolumn?.includes("GPA")) {
        c.textContent =
          e.key.invalue > 100
            ? (e.key.invalue / 100).toFixed(2)
            : (e.key.invalue / 10).toFixed(2);
      } else {
        c.textContent = e.key.invalue;
      }
    }
  }
  datasave(data: any) {
    let parameter: any;
    data.cancel = true;
    if (data.changes.length !== 0) {
      parameter = data.changes[0]["data"];
      if (data.changes[0]["key"].columntype == `D`) {
        parameter.invalue = this.util.getdateformatora(
          data.changes[0]["data"].invalue
        );
      }
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keystudentid = this.studentinfo[0].studentid;
          parameter.keyupdatetable = data.changes[0]["key"].updatetable;
          parameter.keyupdatecolumn = data.changes[0]["key"].updatecolumn;
          parameter.columntype = data.changes[0]["key"].columntype;
          this.data
            .put("Prgstudentbioentry/Put", parameter)
            .then((resp: any) => {
              this.data
                .get(
                  // `Prgstudentbioentry/Setstoreconfiggroupwithstudentcode/${
                  `Prgstudentbioentry/Getanswer/${
                    this.entryconfiggroup
                  }/${this.util.ntb(this.studentcode)}/${this.util.ntb(
                    data.changes[0]["key"].entryid
                  )}`
                )
                .then((resp) => {
                  let arryidx = this.storeentryconfig.findIndex(
                    (x) => x.entryid == data.changes[0]["key"].entryid
                  );
                  this.storeentryconfig[arryidx].invalue = resp[0].invalue;
                  this.storeentryconfig[arryidx].combo = resp[0].combo;
                });
              this.alert.Showsuccess();
              data.component.cancelEditData();
            });
          break;
      }
    }
  }

  openformstudentsearch() {
    sessionStorage.setItem("prgform", sessionStorage.getItem("sysmenuid"));
    this.routes.navigate(["/15289"]);
  }
}
