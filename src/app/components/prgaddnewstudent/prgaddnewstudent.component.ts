import { environment } from "./../../../environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";
import { HttpService } from "src/app/services/http.service";
import notify from "devextreme/ui/notify";
import * as XLSX from "xlsx";
import { UtilService } from "src/app/services/util.service";
import { locale } from "devextreme/localization";
import { Encrypt } from "src/app/shareds/encrypt";
import { DatePipe } from "@angular/common";
import { DxDataGridComponent } from "devextreme-angular";


@Component({
    standalone: false,
  selector: "app-prgaddnewstudent",
  templateUrl: "./prgaddnewstudent.component.html",
  styleUrls: ["./prgaddnewstudent.component.css"],
})
export class PrgaddnewstudentComponent implements OnInit {
  load: boolean = false;
  campuslist = [];
  campusid: number = 1;
  admitacadyear: number;
  admitsemester: number;

  groupyear: string;

  studentgroup: string;
  studentgrouplist = { store: [] };

  studentlist = [];
  prefixidlist = [];

  gencodelist = [
    { id: 1, show: "รหัสอัตโนมัติ" },
    { id: 2, show: "สร้างรหัสอัตโนมัติภายหลัง" },
  ];
  chkgencode: number = 1;
  startstudentcode: number;

  chkdigit: boolean = false;

  studentstatus: string = "10";
  statuslist = [];

  tmpdberrorlist = [];
  admitdate = new Date();
  dataimport = [];

  programid: string;
  studentcodedigit: string;

  //! Add by Plus
  @ViewChild('mainGrid', { static: false }) dataGrid: DxDataGridComponent;

  documentlist: any = [];
  searchtype: boolean = false;
  studentcode: string;
  tmpdata: any;
  emailButtonOptionsreprint: any;
  closeButtonOptionsreprint: any;
  popupVisiblereprint: any = false;

  remark: any = "";
  constructor(
    private data: HttpService,
    private alert: AlertService,
    private util: UtilService,
    private encrypt: Encrypt
  ) {
    locale("th");
    const that = this;
    this.emailButtonOptionsreprint = {
      icon: "edit",
      text: "ตกลง",
      onClick: function (e) {
        that.updatedocflag(that.tmpdata,'N',that.remark);
        that.popupVisiblereprint = false;
      }
    };

    this.closeButtonOptionsreprint = {
      icon: "close",
      text: "ยกเลิก",
      onClick: function (e) {
        that.popupVisiblereprint = false;
      }
    };
  }
  citizeneditorOptions = {
  mask: `0 0000 00000 00 0`,
  maskRules: {
    X: /[02-9]/,
  },
  maskInvalidMessage: 'เลขบัตรประชาชนต้องมี 13 หลัก',
  valueChangeEvent: 'keyup'
  }

  ngOnInit(): void {
    this.data
      .getcombo("ComboPre/All")
      .then((resp: any) => (this.prefixidlist = resp));
    this.data
      .getcombo("ComboCam/All")
      .then((resp: any) => (this.campuslist = resp));
    this.data
      .getcombo("ComboSysByt/getSysbytedes/STUDENTSTATUS/STUDENTSTATUS")
      .then((resp: any) => (this.statuslist = resp));
  }

  getstudentgroup(campusid, groupyear) {
    this.data
      .getcombo(
        "ComboStuSet/bycamgropyear/" +
          this.util.ntz(campusid) +
          "/" +
          this.util.ntb(groupyear)
      )
      .then((resp: any) => (this.studentgrouplist = resp));
  }

  setadmityear(e) {

    if (e) {
      let tmp = this.studentgrouplist.store;
      this.admitacadyear = tmp.filter((r) => r.comboid == e)[0].keystr1id;
      this.admitsemester = tmp.filter((r) => r.comboid == e)[0].keystr2id;
    }

    this.data
      .get(
        "Prgaddnewstudent/getstudentgroupdetail/" +
          this.util.ntb(this.groupyear) +
          "/" +
          this.util.ntb(this.studentgroup)
      )
      .then((resp: any) => {

        this.startstudentcode = resp.startstudentcode;
        this.programid = resp.programid;
      });
  }

  onSearch() {
    this.load = true;
    if(!this.searchtype){
      this.data
      .get(
        "Prgaddnewstudent/getbystugroup/" +
        this.util.ntb(this.groupyear) +
        "/" +
        this.util.ntb(this.studentgroup)
      )
      .then((resp: any) => {
        this.studentlist = resp;
        this.load = false;
      });
    } else {
      if(this.studentcode){
        this.data.get(`Prgaddnewstudent/Getbystucode/${this.studentcode}`)
        .then((resp: any) => {
          this.studentlist = resp;
          this.load = false;
        });
      } else {
        this.alert.MsgBoxCritical("กรุณาระบุรหัสนักศึกษา");
      }
    }
  }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.find(
      (i) => (i.name = "columnChooserButton")
    ).showText = "always";
    e.toolbarOptions.items.unshift({
      location: "before",
      visible: !this.searchtype,
      template: "heddershow",
    });
  }

  calchkdigit() {
    if (this.chkdigit && this.startstudentcode) {
      this.data
        .get(
          "Prgaddnewstudent/getcheckdigit/" +
            this.util.ntb(this.startstudentcode)
        )
        .then((resp: any) => (this.studentcodedigit = resp.studentcode));
    }
  }

  getDefault(e: any) {
    e.data.groupyear = this.groupyear;
    e.data.studentgroup = this.studentgroup;
    e.data.admitdate = this.admitdate;
    e.data.studentstatus = this.studentstatus;
    sessionStorage.setItem("editmodeopen", "true");
    if (this.chkgencode == 1) {
      if (this.chkdigit) {
        e.data.studentcode = this.studentcodedigit;
      } else {
        e.data.studentcode = this.startstudentcode;
      }
    } else {
      e.data.studentcode = "GENCODEAFTER";
    }
  }

  Save(data: any) {
    let parameter: any = {};
    let param2: any = {};
    let citizenid: any;

    if (data.changes.length !== 0) {
      data.cancel = true;
    if (data.changes[0]["type"] == "insert") {
      let datax = data.changes[0]["data"];
      parameter.studentcode = datax.studentcode;
      parameter.prefixid = datax.prefixid;
      parameter.studentname = datax.studentname;
      parameter.studentsurname = datax.studentsurname;
      parameter.studentnameeng = datax.studentnameeng;
      parameter.studentsurnameeng = datax.studentsurnameeng;
      parameter.groupyear = datax.groupyear;
      parameter.studentgroup = datax.studentgroup;
      parameter.admitdate = datax.admitdate;
      parameter.studentstatus = datax.studentstatus;
      parameter.programid = this.programid;
    } else if (data.changes[0]["type"] == "update") {
      
      if(data.changes[0]["data"].citizenid || data.changes[0]["data"].citizenid == null || data.changes[0]["data"].citizenid == undefined || data.changes[0]["data"].citizenid == ""){
        citizenid = data.changes[0]["data"].citizenid
        param2 = data.changes[0]["data"];
        parameter = data.changes[0]["data"];
        delete parameter?.citizenid

      }else{
        parameter = data.changes[0]["data"];
      }

    } else {
      parameter = data.changes[0]["data"];
    }
  
    switch (data.changes[0]["type"]) {
    
      case "update":

        if(Object.keys(parameter).length === 0){
          param2.keystudentcode = data.changes[0]["key"].studentcode;
          param2.citizenid = citizenid
          this.updatecitizenid(param2)
        } else {

        parameter.keystudentid = data.changes[0]["key"].studentid;

            this.data.put("Prgaddnewstudent/Put", parameter).then((resp: any) => {
              this.alert.Showsuccess();
              this.onSearch();
              data.component.cancelEditData();

             });
             if(citizenid){
              param2 = {}
              param2.keystudentcode = data.changes[0]["key"].studentcode;
              param2.citizenid = citizenid
              this.updatecitizenid(param2)
             }
          }

        break;

      case "insert":
        this.data.post("Prgaddnewstudent/Post", parameter).then((resp: any) => {
          this.alert.Showsuccess();
          this.onSearch();
          this.startstudentcode = Number(this.startstudentcode) + 1;
          this.calchkdigit();
          data.component.cancelEditData();
          param2.keystudentcode = data.changes[0]["data"].studentcode
          param2.citizenid = data.changes[0]["data"].citizenid
          this.updatecitizenid(param2)
        });
        break;

      case "remove":
        this.data
          .delete("Prgaddnewstudent/Delete/" + data.changes[0]["key"].studentid)
          .then((resp: any) => {
            this.alert.Showsuccess();
            this.onSearch();
          });
        data.component.cancelEditData();
        break;
    }
  }
  }

  updatecitizenid(v) {
      this.data.put("Prgaddnewstudent/PutCitizen", v).then((resp: any) => {
          this.alert.Showsuccess();
          this.onSearch();
        });
  }

  genstudentcode() {
    if (!this.startstudentcode) {
      this.alert.MsgBoxCritical("กรุณาระบุรหัสนักศึกษาเริ่มต้น");
      return;
    }
    var result = this.alert.MsgBoxQuestion(
      "ต้องการสร้างรหัสนักศึกษาทั้งหมดใช่หรือไม่"
    );
    result.show().then((repa) => {
      if (repa.value === "Y") {
        this.data
          .put(
            "Prgaddnewstudent/Genstudentcode/" +
              this.util.ntb(this.groupyear) +
              "/" +
              this.util.ntb(this.studentgroup) +
              "/" +
              this.util.ntb(this.startstudentcode) +
              "/" +
              this.chkdigit,
            {}
          )
          .then((resp: any) => {
            this.alert.Showsuccess();
            this.onSearch();
          });
      }
    });
  }

  onFileChange(ev: any) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: "binary" });
      const sheet_name_list = workBook.SheetNames;
      jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]], {
        defval: "",
      });

      if(jsonData[0]?.คำนำหน้า && jsonData[0]?.ชื่อ && jsonData[0]?.นามสกุล && jsonData[0]?.เลขประจำตัวประชาชน){

          let idModified = jsonData.map(
            (obj : any) => {
                return {
                    "คำนำหน้า" : obj.คำนำหน้า,
                    "ชื่อ" : obj.ชื่อ,
                    "นามสกุล" : obj.นามสกุล,
                    //"ชื่ออังกฤษ" : obj.ชื่ออังกฤษ,
                    //"นามสกุลอังกฤษ" : obj.นามสกุลอังกฤษ,
                    //"Emaill" : obj.Emaill,
                    //"วันเดือนปีเกิด" : this.util.getdateformatora(this.ExcelDateToJSDate(obj.วันเดือนปีเกิด)),
                    // "ที่อยู่1" : obj.ที่อยู่1,
                    // "ที่อยู่2" : obj.ที่อยู่2,
                    // "อำเภอ" : obj.อำเภอ,
                    // "จังหวัด" : obj.จังหวัด,
                    // "รหัสไปรษณีย์" : obj.รหัสไปรษณีย์,
                    // "โทรศัพท์" : obj.โทรศัพท์,
                    // "GPA" : obj.GPA,
                    //"เลขที่บัตรประชาชน" : obj.เลขที่บัตรประชาชน,
                  // "วันเดือนปีเกิด":this.getdateformat(new Date(Math.round((obj.วันเดือนปีเกิด - 25569)*86400*1000))),
                  // scholardate":(this.util.ntb(obj.เลขประจำตัวประชาชน) != "null"? this.getdateformat(this.ExcelDateToJSDate(obj.วันที่โอน)):"")
                    "no": obj.__rowNum__,
                    "เลขประจำตัวประชาชน" : obj.เลขประจำตัวประชาชน
                }
            }
        );
      
      //const dataString = JSON.stringify(jsonData) ;
      //console.log(idModified);
      this.dataimport = idModified;
      //console.log(idModified);
    }else{
      this.alert.MsgBoxCritical("รูปแบบไฟล์ไม่ถูกต้อง");
    }
    };
    reader.readAsBinaryString(file);
  }

  ExcelDateToJSDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
 }

  importfile() {
    var result = this.alert.MsgBoxQuestion("ยืนยันนำเข้าไฟล์ใช่หรือไม่");
    result.show().then((repa) => {
      if (repa.value === "Y") {
        let studentcode;
        if (this.chkgencode == 1) {
          studentcode = this.startstudentcode;
        } else {
          studentcode = "GENCODEAFTER";
        }
        // this.load = true;
        this.data.post("Prgaddnewstudent/importstudent", {
            chkdigit: this.chkdigit,
            startstudentcode: studentcode,
            admitdate: this.admitdate,
            programid: this.programid,
            studentstatus: this.studentstatus,
            groupyear: this.groupyear,
            studentgroup: this.studentgroup,
            data: this.dataimport,
          }).then((resp: any) => {
            // this.load = false;
            if(resp?.error){
              this.alert.Showerror(resp?.error);
            }else{
              this.gettmpdb();
              this.onSearch();
              this.alert.Showsuccess();
            }
          });
      }
    });
  }

  gettmpdb(): void {
    this.data.get('Prgaddnewstudent/Geterrorlist').then(
      (rep: any) => {
        //console.log(rep);
        this.tmpdberrorlist = rep;
      }
    );
  }

  DownloadExam() {
    let parameter= {'filename' : this.encrypt.encryptData('/FILE_EXAMIMP/Import_Student.xlsx')};
    this.data.post('Prgaddnewstudent/Getbynamepost',parameter)
    .then((rep: any) => {
      //console.log(data);
        if (rep.result == "" || !rep.result) {
          this.alert.Warningfilenotfound();
        } else {
          //console.log(rep);
          var link = document.createElement('a');
            link.setAttribute('href', rep.result);
            link.setAttribute('download', "ตัวอย่าง.xlsx");
            link.click();
        }
    });
  }

  getDocLst(studentid: number){
    this.data.get(`Prgaddnewstudent/Getdocbystuid/${studentid}`).then((rep:any) => {this.documentlist = rep;});
  }

  changesearchtype(){
    this.studentcode = null;
    this.studentgroup = null;
    this.admitacadyear = null;
    this.admitsemester = null;
  }
  updatedocflagno(data){
    this.tmpdata = data;
    this.popupVisiblereprint = true;
}
  updatedocflag(data,docflag,docnote){
    var datax;
    if (docnote == '') {
      datax = {keystudentid:data.studentid,keydoccode:data.doccode,docflag: docflag};
    }else{
      datax = {keystudentid:data.studentid,keydoccode:data.doccode,docflag: docflag,docnote: docnote};
    }
    this.data.put('Prgaddnewstudent/Putdoc', datax).then(
      (resp:any) => {
        // this.data.get('Studoc/Getbyid/'+ data.studentid).then((rep:any) => {this.documentlist = rep;});
        this.getDocLst(data.studentid);
        this.alert.Showsuccess();
      }
    );
}
Download(data : any){
  let parameter= {'filename' : this.encrypt.encryptData('STUDENTDOC/'+ data.acadyear +'/'+ data.doccode +'/'+ data.filename)};
  this.data.post('Prgaddnewstudent/Getbynamepost',parameter)
  .then((rep: any) => {
      if (rep.result == "" || !rep.result) {
        this.alert.Warningfilenotfound();
      } else {
        let type = "";
        let repx = "";
        if(rep.result.indexOf("application/pdf") > 0){
          type = "application/pdf";
          repx = rep.result.replace('data:application/pdf;base64,','');
        }else{
          type = "image/jpg";
          repx = rep.result.replace('data:image/jpg;base64,','');
        }
        var file = this.b64toBlob(repx, type,'');
        var imgURL = URL.createObjectURL(file);
        let pdfWindow = window.open("")
        pdfWindow.document.write("<iframe width='100%' height='100%' src='" + imgURL + "'></iframe>")
      }
  });
}
b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  //console.log(byteArrays);

  return new File(byteArrays, "pot", { type: contentType });
}
}
