import { Component, OnInit } from "@angular/core";
import { formatDate, locale } from "devextreme/localization";
import { AlertService } from "src/app/services/alert.service";
import { HttpService } from "src/app/services/http.service";
import { UtilService } from "src/app/services/util.service";
import { Router } from "@angular/router";
import { GetdataService } from "src/app/services/getdata.service";
import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
import { Console } from "console";

@Component({
    standalone: false,
  selector: "app-prgstudentcapture",
  templateUrl: "./prgstudentcapture.component.html",
  styleUrl: "./prgstudentcapture.component.css",
})
export class PrgstudentcaptureComponent implements OnInit {
  studentinfo: any;
  studentcode: any;
  rules: any;
  emailButtonOptions: any;
  popupVisible = false;
  tmpstudentid: any;
  studentreclist: any;
  tmpstudentname: any;
  year = new Date().getFullYear();
  month = new Date().getMonth();
  date = new Date().getDate();
  finishdate: any = new Date(this.year, this.month, this.date, 12, 0);
  issueDate: any = new Date(this.year, this.month, this.date, 12, 0);
  tmpissueDate: any = new Date(this.year, this.month, this.date, 12, 0);
  admitdate: any;

  // expiredate: any;
  // expiredate: any = new Date(this.year + 4, this.month, this.date, 12, 0);
  expiredate: Date = new Date()
  actiontype: any = "0";
  actionlist = [
    { comboid: "0", comboshow: "0 : ตรวจสอบ" },
    { comboid: "1", comboshow: "1 : พิมพ์บัตร" },
  ];

  iChkAdmit: boolean = false;

  // Add for RSU
  sequence: number = 1;
  cardhistory: any = [];
  repname: string = null;
  lstfaculty: any
  lstdepartment: any
  lstprefixname: any
  files: any[] = [];
  imagesrc : any[] = [];
  imgindex : any = 0;
  filelist: any = [];
  allowedFileExtensions: string[] = ['.jpg', '.jpeg', '.gif', '.png', '.pdf'];
  test: any
  formname: string = null
  schoclist: any;
  stuimg;
  longname: boolean = false
  cardlanguage: string = 'ไทย'
  displaycardexpire: string = 'แสดง'
  // languagelist = [
  //   { id: 'th', name: "ไทย" },
  //   { id: 'nation', name: "ต่างชาติ" },
  // ];
  languagelist = ['ไทย', 'ต่างชาติ']
  // displaycardexpirelist = [
  //   { id: 1, name: "แสดง" },
  //   { id: 2, name: "ไม่แสดง" },
  // ];
  displaycardexpirelist = ['แสดง', 'ไม่แสดง']

  studentname;
  facultyid;
  departmentid;

  constructor(
    private http: HttpService,
    private getdata: GetdataService,
    private alert: AlertService,
    private util: UtilService,
    private routes: Router
  ) {
    locale("th");
    this.rules = { X: /[02-9]/ };
    //this.updateFinishdate.bind(this);
    const that = this;
    // this.emailButtonOptions = {
    //   icon: "edit",
    //   text: "ตกลง",
    //   onClick: function (e) {
    //     that.updateFinishdate();
    //     that.popupVisible = false;
    //   }
    //};

    if (sessionStorage.getItem("studentcodesearch") != null) {
      this.studentcode = sessionStorage.getItem("studentcodesearch");
      this.getStudentinfo();
      sessionStorage.removeItem("studentcodesearch");
    }
    // this.studentcode = '422434'
    // this.studentcode = '6800002'
    // this.studentcode = '411794'
  }
  ngOnInit(): void {
    this.getCombo()
    this.studentinfo = []
  }
  getCombo() {
    this.http.getcombo(`ComboFac/All`).then((response: any) => {
      this.lstfaculty = response;
    });
    this.http.getcombo(`ComboDep/All`).then((response: any) => {
      this.lstdepartment = response;
    });
    this.http.getcombo(`ComboPre/All`).then((response: any) => {
      this.lstprefixname = response;
    });
    this.http.getcombo(`ComboScho/All`).then((response: any) => {
      this.schoclist = response;
    });
  }

  getStudentinfo() {
    if (!this.studentcode) {
      this.alert.MsgBoxCritical('กรุณาระบุรหัสนักศึกษา');
      // this.openformstudentsearch();
    } else {
      this.http.get("Prgstudentcapture/Getviewstudentinfobystucode/" + this.studentcode)
        .then((response: any) => {
          this.studentinfo = response
          // console.log(this.studentinfo)
          this.tmpstudentid = response[0]?.studentid
          this.stuimg = response[0]?.stuimg
          this.formname = 'บันทึกการทำบัตรนักศึกษา'
          // this.admitdate = response[0].admitdate;
          this.admitdate = this.util.ntb(response[0].admitgroup) == 'null' ? new Date(response[0].admitdate) : new Date(response[0].admitgroup)
          // this.expiredate = this.util.ntb(response[0].admitstudyyear) == 'null' ? new Date(this.year + 4, this.month, this.date, 12, 0) : new Date(this.year + response[0].admitstudyyear, this.month, this.date, 12, 0)
          this.expiredate = this.util.ntb(response[0].admitstudyyear) == 'null' ? new Date(this.admitdate.getFullYear() + 4, this.admitdate.getMonth(), this.admitdate.getDate(), 12, 0) : new Date(this.admitdate.getFullYear() + response[0].admitstudyyear, this.admitdate.getMonth(), this.admitdate.getDate(), 12, 0)
          this.studentreclist = []
          this.tmpstudentname =
            response[0].studentcode +
            " : " +
            response[0].prefixname +
            response[0].studentname +
            "  " +
            response[0].studentsurname;
            this.getHistoryCard(this.tmpstudentid)
            this.actiontype = '1'
        }
      );
    }
  }

  clearstudentinfo() {
    this.tmpstudentid = null
    this.studentinfo = []
    this.actiontype = '0'
  }

  getHistoryCard(studentid: number) {
    this.http.get(`Prgstudentcapture/GetHistoryCard/${studentid}`).then((response: any) => {
      this.cardhistory = response;
    });
  }

  onCheckboxChanged(event: any): void {
    // console.log(event.value)
    this.longname = event.value
  }
  onRadioLanguageChanged(e: any) {
    this.cardlanguage = e.value;
    if(e.value == "ไทย"){
      this.studentname = this.studentinfo[0].prefixname + this.studentinfo[0].studentname + " " + this.studentinfo[0].studentsurname;
      this.facultyid = this.studentinfo[0].facultyname;
      this.departmentid = this.studentinfo[0].programname;
    }else{
      this.studentname = this.studentinfo[0].prefixnameeng + this.studentinfo[0].studentnameeng + " " + this.studentinfo[0].studentsurnameeng;
      this.facultyid = this.studentinfo[0].facultynameeng;
      this.departmentid = this.studentinfo[0].programnameeng;
    }
    // console.log('Selected radio value:', e.value);
    // locale('en')
  }
  onRadioExpireChanged(e: any) {
    this.displaycardexpire = e.value;
    // console.log('Selected radio value:', e.value);
  }
  save(data: any){
    let parameter: any;
    let studentname: any;
    let facultyid: any;
    let departmentid: any;
    if (data.changes.length !== 0 && this.expiredate) {
      data.cancel = true;
      parameter = data.changes[0]["data"];
      studentname =parameter.studentname;
      facultyid = parameter.facultyid;
      departmentid = parameter.departmentid;
      delete parameter?.stuimg
      delete parameter?.prefixname
      delete parameter?.studentname
      delete parameter?.studentsurname
      delete parameter?.studentcode
      delete parameter?.facultyid
      delete parameter?.departmentid
      switch (data.changes[0]["type"]) {
        // case "update":
        //   parameter.studentid = data.changes[0]["key"].studentid;
        //   parameter.keysequence = data.changes[0]["key"].sequence;
        //   this.http.put("Prgstudentcapture/Put", parameter).then((resp: any) => {
        //     if(resp.result != 0){
        //       this.alert.Showsuccess();
        //       data.component.cancelEditData();
        //       this.getHistoryCard(parameter.studentid);
        //     } else {
        //       this.alert.MsgBoxCritical(resp.message);
        //     }
        //   })
        //   break;
        case "insert":
          parameter.studentid = this.tmpstudentid;
          this.http.post("Prgstudentcapture/Post", parameter).then((resp: any) => {
            if(resp.result != 0){
              this.alert.Showsuccess();
              data.component.cancelEditData();
              this.getHistoryCard(parameter.studentid);
              // this.repprint(parameter.studentid, parameter.sequence, studentname,facultyid,departmentid);
              this.repprint(parameter.studentid, parameter.sequence);
            } else {
              this.alert.MsgBoxCritical(resp.message);
            }
          });
          break;
      }
    } 
  }

  // async repprint(studentid: number, sequence: number, studentname: string,facultyid : string,departmentid : string) {
  async repprint(studentid: number, sequence: number) {
    let tmpcardlanguage = this.cardlanguage != 'ไทย' ? 'en' : 'th'
    let tmpdisplaycardexpire = this.displaycardexpire == 'แสดง' ? 'true' : 'false'
    // console.log(this.longname)
    // return
    this.http.repprint(
      'pdf', 
      'repstudentcard', 
      [
        { 
          "sc.studentid": studentid, 
          "sc.sequence": sequence 
        }
      ], 
      // `;studentname:${studentname};facultyid:${facultyid};departmentid:${departmentid}` , 
      `;longname:${this.longname};language:${tmpcardlanguage};showexpire:${tmpdisplaycardexpire}`,
      []
    )
  }

  // openformstudentsearch() {
  //   sessionStorage.setItem("prgform", sessionStorage.getItem("sysmenuid"));
  //   this.routes.navigate(["/15289"]);
  // }
  getDefault(e: any) {
    // e.data.facultytype = "F"
    if (sessionStorage.getItem("editmodeopen") == "false") {
      // sessionStorage.setItem("editmodeopen", "true");
      let maxsequence = 0;
      maxsequence = Math.max(...this.cardhistory.map(x => x.sequence)) >= 1 ? Math.max(...this.cardhistory.map(x => x.sequence)) : maxsequence;
      // e.data.sequence = this.sequence;
      // console.log(maxsequence)
  //console.log(this.studentinfo)
      e.data.sequence = maxsequence + 1
      e.data.acadyear = this.getdata.getacadyear()
      e.data.semester = this.getdata.getsemester()
      // e.data.startdate = this.issueDate
      e.data.startdate = this.admitdate
      // e.data.startdate = new Date()
      e.data.expiredate = this.expiredate
      e.data.studentcode = this.studentinfo[0].studentcode
      //e.data.prefixname = this.studentinfo[0].prefixnameeng
      this.studentname = this.studentinfo[0].prefixname + this.studentinfo[0].studentname + " " + this.studentinfo[0].studentsurname
      //e.data.studentsurname = this.studentinfo[0].studentsurname
      this.facultyid = this.studentinfo[0].facultyname
      this.departmentid = this.studentinfo[0].programname
      e.data.stuimg = this.studentinfo[0].stuimg
    } else {
      e.cancel = true
    }
  }
  onToolbarPreparing(e: any) {
    var toolbarItems = e.toolbarOptions.items
    // e.toolbarOptions.items[0].showText = 'always'
    // e.toolbarOptions.items.unshift({
    //   location: 'before',
    //   template: 'tableName'
    // })
    // if (this.studentcode == null || this.issueDate == undefined || this.expiredate == undefined || this.sequence == undefined) {
    // if (!this.tmpstudentid) {
    if (!this.formname) {
      $.each(toolbarItems, function (_, item) {
        if (item.name === "addRowButton") {
          item.options.onClick = function (args: any) {
            // alert("กรุณากรอกรหัสนักศึกษาและทำการค้นหาก่อนดำเนินการพิมพ์บัตรนักศึกษา");
            this.alert.Warning('กรุณากรอกรหัสนักศึกษาและทำการค้นหาก่อนดำเนินการพิมพ์บัตรนักศึกษา');
          };
        }
      });
    }
  }
  onExporting(e) {
    if(e.format === 'xlsx') {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('ประวัติการพิมพ์บัตรนักศึกษา');
      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: false,
        customizeCell: (option) => {
          const {excelCell, gridCell} = option
          if(gridCell.column.dataType === 'date' && gridCell.rowType === 'data') {
            // excelCell.value = formatDate(gridCell.value, 'dd/MM/yyyy')
            let date = new Date(gridCell.value);
            // date.setFullYear(date.getFullYear() + 543);
            excelCell.value = date.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
          }
        }
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          this.repname = 'ประวัติการพิมพ์บัตรนักศึกษา ' + this.studentinfo[0]?.studentcode + '_' + this.studentinfo[0]?.studentname + '_' + this.studentinfo[0]?.studentsurname;
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), this.repname +'.xlsx');
        });
      });
    }  
  }
  selectFolder(e: any, imgElement: HTMLImageElement, rowData: any) {
    // console.log(e.target.files);
    // e.target.files.forEach((e) => {
    //   e.name = this.studentcode + '.' + 'jpg'
    // })
    // console.log(e.target.files);
    // console.log(this.test)
    // this.prepareFilesList(e.target.files);
    const render = new FileReader();
    render.onload = (e: any) => {
      const base64 = e.target.result
      imgElement.src = base64
      rowData.stuimg = base64
    }
    render.readAsDataURL(e.target.files[0])
    //let a = this.alert.MsgBoxQuestion("ท่านต้องการนำเข้ารูปภาพใช่หรือไม่ (การนำเข้าเป็นการแทนที่ภาพนักศึกษาเดิม)");
    //a.show().then((rep: any) => {
      //if (rep.value === "Y") {
        // this.uploadFilesSimulator(0,data)
        this.prepareFilesList(e.target.files);
      //}else{
      //  this.files = []
     // }
   // });
    // imgElement.src = e.target.result
  }
  async prepareFilesList(files: Array<any>) {
    var i = 0;
    for (const item of files) {
      // console.log(item['name'])

      // let tmpname = item['name'].split('.');
      // item['name'] = this.studentcode + '.' + tmpname[1];
      item.progress = 0;
      this.files.push(item);
      var reader = new FileReader();
      reader.onload = (e) => this.imagesrc.push(e.target.result);
      await reader.readAsDataURL(this.files[this.imgindex]);
      this.imgindex = this.imgindex + 1;
      this.uploadFilesSimulator(0)
    }
  }
    uploadFilesSimulator(index: number) {
    //console.log(index , this.files.length)

    if (index === this.files.length) {
      //this.alert.MsgBoxInformation("นำเข้าข้อมูลรูปนักศึกษาสำเร็จ กรุณาตรวจไฟล์นำเข้า");
      return;
    } else {
      let formData = new FormData();
      this.files[index] = new File([this.files[index]], this.studentcode + '.' + 'jpg', { type: this.files[index]['type'] });
      formData.append("studentcode", this.studentcode);
      formData.append("file", this.files[index]);
      // console.log(this.files[index].size / 1024 / 1024);
      if (this.files[index].size / 1024 / 1024 <= 2) {
        this.http.upload("Prgstudentcapture/upload", formData).then((resp: any) => {
          if (resp.result == "Saved") {
            this.uploadFilesSimulator(index + 1);
          }
        });
      } else {
        this.uploadFilesSimulator(index + 1);
      }
    }
  }
}