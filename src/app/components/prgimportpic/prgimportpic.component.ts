import { HttpService } from "../../services/http.service";
import { AccountService } from "../../services/account.service";
import { Component, OnInit } from "@angular/core";
import { Encrypt } from "../../shareds/encrypt";
import notify from "devextreme/ui/notify";
import { AlertService } from "../../services/alert.service";
import { FormGroup } from "@angular/forms";
import { UtilService } from "src/app/services/util.service";

@Component({
    standalone: false,
  selector: "app-prgimportpic",
  templateUrl: "./prgimportpic.component.html",
  styleUrls: ["./prgimportpic.component.css"],
})
export class PrgimportpicComponent implements OnInit {
  levelidlist: any[] = [];
  divisioncodelist: any;
  levelcodelist: any;
  tmpLevelid: any;
  popupVisible = false;
  notification: any;
  levelstatus: any[] = [];
  editmodeopen: boolean = false;
  levelgrouplist;

  campusid: number = +sessionStorage.getItem("macampusid");
  facultyid: number = +sessionStorage.getItem("mafacultyid");
  levelid: number = +sessionStorage.getItem("malevelid");

   acadyear: number = +sessionStorage.getItem("maacadyear");
   semester: number = +sessionStorage.getItem("masemester");

  menugroupname: string;
  documentid: string;
  repname: any;
  repfilename: any;
  systemname: any;
  systemnameeng: any;
  reportserver: any;
  rules: any;

  lstFac: any[] = [];
  lstCampus: any[] = [];
  lstLev: any[] = [];
  lstStatus: any[] = [];

  lstProgram: any[] = [];
  lstDept: any[] = [];

  lstReptype: any[] = [];
  reptype: any = "pdf";

  opendatefrom: any;
  opendateto: any;
  closedatefrom: any;
  closedateto: any;
  programcode: any;

  programid: number;
  departmentid: number;
  programstatus: any;

  criteria: any;

  status: any;
  statusfrom: any;
  statusto: any;
  vselect: number = 1;
  itemlists = [
    { id: 1, name: "นำเข้า" },
    { id: 2, name: "ดึง" },
  ];

  test: any;

  progress: number = 0;
  files: any[] = [];
  imagesrc: any[] = [];
  imgindex: any = 0;
  errorcount: any = 0;
  pathdownload: any = "C://AVSREG";
  tabcurrent: number = 0;
  load: boolean = false

  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.data.getcombo("ComboFac/All").then((response: any) => {
      this.lstFac = response;
    });
    this.data.getcombo("ComboLev/All").then((response: any) => {
      this.lstLev = response;
    });
    this.data.getcombo("ComboCam/All").then((response: any) => {
      this.lstCampus = response;
    });
    this.data
      .getcombo(
        "ComboPro/ProfaclevAll/" +
          this.util.ntz(this.facultyid) +
          "/" +
          this.util.ntz(this.levelid)
      )
      .then((response: any) => {
        this.lstProgram = response;
      });
    this.data
      .getcombo(
        "ComboSysbyt/getSysbytedesnum" +
          "/" +
          "STUDENTSTATUS" +
          "/" +
          "STUDENTSTATUS"
      )
      .then((resp: any) => {
        this.status = resp;
      });

    this.data
      .getcombo("ComboSysbyt/getSysbytedesnum/LEVELID/LEVELGROUP")
      .then((resp: any) => (this.levelgrouplist = resp));
  }

  selectFolder(e) {
   // console.log(e.target.files);
    // console.log(this.test)
    this.prepareFilesList(e.target.files);
  }

  async prepareFilesList(files: Array<any>) {
    this.files = []
    var i = 0;
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      var reader = new FileReader();
      reader.onload = (e) => this.imagesrc.push(e.target.result);
      await reader.readAsDataURL(this.files[this.imgindex]);

      //i++;
      //console.log(item)
      this.imgindex = this.imgindex + 1;
    }
    // console.log(this.files);
    //this.uploadFilesSimulator(0);
  }

  getVal() {
    if (this.vselect == 1) {
      return true;
    } else {
      return false;
    }
  }

  getProgram() {
    this.data
      .getcombo(
        "ComboPro/ProfaclevAll/" +
          this.util.ntz(this.facultyid) +
          "/" +
          this.util.ntz(this.levelid)
      )
      .then((response: any) => {
        this.lstProgram = response;
      });
  }
  getDepartment() {
    this.data
      .getcombo(
        "ComboDep/Getbyfacid/" +
          this.util.ntz(this.facultyid)
      )
      .then((response: any) => {
        this.lstDept = response;
      });
  }

  getDefault(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      e.data.ftesbase = 18;
      sessionStorage.setItem("editmodeopen", "true");
    } else {
      //this.alert.Warning(1);
      e.cancel = true;
    }
  }

  process() {
    //console.log(this.test)
    if (this.vselect == 1) {
      //console.log(this.files.length)
      this.uploadFilesSimulator(0);
    } else {
      this.downloadfile();
    }
  }

  uploadFilesSimulator(index: number) {
    //console.log(index , this.files.length)
    this.load = true
    if (index === this.files.length) {
      this.load = false
      if(this.tabcurrent == 0){
        this.alert.MsgBoxInformation("นำเข้าข้อมูลรูปนักศึกษาสำเร็จ กรุณาตรวจไฟล์นำเข้า");
      } else {
        this.alert.MsgBoxInformation("นำเข้าข้อมูลรูปอาจารย์สำเร็จ กรุณาตรวจไฟล์นำเข้า");
      }
      return;
    } else {
      let formData = new FormData();
      formData.append("admitacadyear", this.acadyear.toString())
      formData.append("uploadusertype", this.tabcurrent.toString())
      // formData.append("id", "1150");
      formData.append("file", this.files[index]);

      // console.log(this.files[index].size / 1024 / 1024);
      if (this.files[index].size / 1024 / 1024 <= 2) {
        // for (const [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }
        this.data.upload("Prgimportpic/upload", formData).then((resp: any) => {
          // if (resp.result == "Saved") {
          if (resp.result == 1) {
            //document.getElementById("icon" + index).setAttribute('src','assets/images/check.svg')
            //  console.log('OK')
            this.uploadFilesSimulator(index + 1);
          }
        });
      } else {
        //document.getElementById("icon" + index).setAttribute('src','assets/images/cross.svg')
        // this.files[index].error = "ไฟล์เกินขนาด 1 MB ไม่สามารถ upload ได้"
        // this.errorcount +=  1;
        this.uploadFilesSimulator(index + 1);
      }
      // const progressInterval = setInterval(() => {

      //   if (this.files[index].progress === 100) {
      //     clearInterval(progressInterval);
      //     this.uploadFilesSimulator(index + 1);
      //   } else {
      //     this.files[index].progress += 5;
      //   }

      // }, 200);
    }
  }

    selectTab(e: any) {
        if (e.name === 'selectedIndex') {
            switch (e.value) {
                case 0:
                    this.tabcurrent = 0;
                    break;
                case 1:
                    this.tabcurrent = 1;
                    break;
            }
        }
    }
  downloadfile() {
    let parameter: any = {};
    parameter.path = this.pathdownload;
    parameter.downloadusertype = this.tabcurrent;
    parameter.campusid = this.util.ntz(this.campusid);
    parameter.facultyid = this.util.ntz(this.facultyid);
    parameter.levelid = this.util.ntz(this.levelid);
    parameter.programid = this.util.ntz(this.programid);
    parameter.departmentid = this.util.ntz(this.departmentid);
    parameter.statusfrom = this.util.ntz(this.statusfrom);
    parameter.statusto = this.util.ntz(this.statusto);
    parameter.admitacadyear = this.util.ntz(this.acadyear);
    parameter.admitsemester = this.util.ntz(this.semester);
    this.load = true
    this.data
      .post("Prgimportpic/DownloadZipFileAll", parameter)
      .then((resp: any) => {
        // if (resp.result == "Saved") {
        this.load = false
        //if (resp.result == 1) {

          var link = document.createElement('a');
          link.setAttribute('href', 'https://' + window.location.hostname + '/FileDownload/' + resp.result); 
          link.setAttribute('download', resp.result);
          link.click();
          //document.getElementById("icon" + index).setAttribute('src','assets/images/check.svg')
          // this.alert.MsgBoxInformation(
          //   // "Download File สำเร็จที่ Folder " + this.pathdownload
          //   "Download File สำเร็จที่ Folder " + resp.message
          // );
        //} else {
        //  this.alert.Showerror("Download File ไม่สำเร็จ");
        //}
      });
  }

  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
