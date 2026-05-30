import { AlertService } from "./../../services/alert.service";
import { Component, OnInit } from "@angular/core";
import { HttpService } from "./../../services/http.service";
import { AccountService } from "./../../services/account.service";
import { Encrypt } from "./../../shareds/encrypt";
import notify from "devextreme/ui/notify";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import { UtilService } from "./../../services/util.service";

@Component({
    standalone: false,
  selector: "app-prgwebmsg",
  templateUrl: "./prgwebmsg.component.html",
  styleUrls: ["./prgwebmsg.component.css"],
})
export class PrgwebmsgComponent implements OnInit {
  load = false;
  tmpimg: string = "assets/images/null.jpg";
  filelist: any[] = [];
  webmlist: any[] = [];
  tgtypecombo: any[] = [];
  stulist: any[] = [];
  editmodeopen: boolean = false;
  tmpwebmid: number;
  tgtypeid: string = "A";
  tmpFile: string;
  tgtypexid: string = "A";
  vdfrom: any = new Date();
  vdto: any = new Date();
  stycode: any[] = [];
  offlist: any[] = [];
  //picture: any ="https://js.devexpress.com/Content/images/doc/20_2/PhoneJS/person2.png"
  priority = [
    { id: 0, name: "0 (ต่ำสุด)" },
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
    { id: 6, name: "6" },
    { id: 7, name: "7" },
    { id: 8, name: "8" },
    { id: 9, name: "9 (สูงสุด)" },
    // ...
  ];

  constructor(
    private data: HttpService,
    private alert: AlertService,
    private encrypt: Encrypt,
    private util: UtilService
  ) {
    locale("th");
  }

  ngOnInit(): void {
    //this. getWebm();
    this.getTGType();
    this.getstycode();
    this.getStu();
    this.getfilelist();
  }

  getImgftp(eventData: any, cellInfo: any) {
    this.load = true;
    this.tmpFile = cellInfo.data.imagefilename;
    cellInfo.setValue(eventData.value);
    if (eventData.value != "" && eventData.value != null) {
      this.data.get("Prgwebmsg/GetFtpimg/" + eventData.value).then((resp: any) => {
        this.tmpimg = resp[0].filename;
        this.load = false;
      });
    } else {
      this.tmpimg = "assets/images/null.jpg";
      this.load = false;
    }
  }

  //  getImg( cellInfo : any){
  //    //console.log(cellInfo.data.webimg)
  //    this.tmpimg = cellInfo.data.webimg//eventData.value

  //    return this.tmpimg
  //  }

  getfilelist() {
    this.data.get("Ftp/getftpfilelist").then((resp: any) => {
      this.filelist = resp;
      //console.log(resp)
    });
  }

  getStu() {
    this.data.get("Prgwebmsg/getStuAll").then((resp: any) => {
      this.stulist = resp;
    });

    this.data.get("ComboOff/All").then((resp: any) => {
      this.offlist = resp;
    });
  }
  getWebm() {
    this.data
      .get(
        "Webm/Get/" +
          this.tgtypeid +
          "/" +
          this.util.getdateformat(this.vdfrom) +
          "/" +
          this.util.getdateformat(this.vdto)
      )
      .then((resp: any) => {
        this.webmlist = resp;
      });
  }
  getTGType() {
    this.data.get("ComboWebmsg/All").then((resp: any) => {
      this.tgtypecombo = resp;
    });
  }
  getstycode() {
    this.data
      .get("ComboSysbyt/getSysbytedesnum/WEBMSG/STYLECODE")
      .then((resp) => {
        this.stycode = resp;
      });
    // this.data.get('Sysbytnum' + '/' + 'WEBMSG' + '/' + 'STYLECODE').then((resp:any) => {
    //     this.stycode = resp;
    // });
  }

  Showerror(message: any, type: any) {
    let option = {
      message: message,
    };
    notify(option, type, 5000);
  }
  gettarget() {
    this.tgtypexid = this.tgtypeid;
  }

  onEditstart(e: any){
//console.log(e);
    if(e.data.webimg != "" && e.data.webimg != null) {
      this.tmpimg = e.data.webimg;
    } else {
      this.tmpimg = "assets/images/null.jpg";
    }
  }

  getDefault(e: any) {
    //e.data.facultytype = 'F';
    // e.data.webimg = "assets/images/null.jpg"
    e.data.targettype = this.tgtypexid;
    e.data.datefrom = new Date(); //this.util.getdatethformat(new Date());
    e.data.dateto = new Date(); //this.util.getdatethformat(new Date());
    e.data.priority = 0;
  }
  selectionChanged(data: any) {

    

    if (sessionStorage.getItem("editmodeopen") == "false") {
      //this.tmpwebmid = data.selectedRowKeys[0].webmsgid;
    } else {
      alert("คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข");
    }
  }
  // onCancelEditmode() {
  //     this.editmodeopen = false;
  // }
  // onEditstart(e:any) {
  //     //this.editmodeopen = true;
  //     this.tmpFile = ""
  //     if (!this.editmodeopen) {
  //         this.editmodeopen = true;
  //     } else {
  //         alert('คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข');
  //         e.cancel = true;
  //     }
  // }
  dataSave(data: any) {
    this.editmodeopen = false;
    let parameter: any;
    data.cancel = true;
    if (data.changes.length !== 0) {
      parameter = data.changes[0]["data"];
      // console.log(data);
      switch (data.changes[0]["type"]) {
        case "update":
          parameter.keywebmsgid = data.changes[0]["key"].webmsgid;
          // console.log(data.changes[0]['key'].webmsgid);
          //console.dir(parameter);
          //parameter.imagefilename = this.tmpFile
          this.data.put("Prgwebmsg/Put", parameter).then((resp: any) => {
            this.data
              .get(
                "Prgwebmsg/Get/" +
                  this.tgtypeid +
                  "/" +
                  this.util.getdateformat(this.vdfrom) +
                  "/" +
                  this.util.getdateformat(this.vdto)
              )
              .then((resp) => {
                this.webmlist = resp;
              });
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });

          break;

        case "insert":
          delete parameter.webimg;
          this.data.post("Prgwebmsg/Post", parameter).then((resp: any) => {
            this.data
              .get(
                "Prgwebmsg/Get/" +
                  this.tgtypeid +
                  "/" +
                  this.util.getdateformat(this.vdfrom) +
                  "/" +
                  this.util.getdateformat(this.vdto)
              )
              .then((resp) => {
                this.webmlist = resp;
              });
            this.alert.Showsuccess();
            data.component.cancelEditData();
          });
          break;

        case "remove":
          this.data
            .delete("Prgwebmsg/Delete" + "/" + data.changes[0]["key"].webmsgid)
            .then((resp: any) => {
              this.data
                .get(
                  "Webm/" +
                    this.tgtypeid +
                    "/" +
                    this.util.getdateformat(this.vdfrom) +
                    "/" +
                    this.util.getdateformat(this.vdto)
                )
                .then((resp) => {
                  this.webmlist = resp;
                });
              this.alert.Showsuccess();
              this.onSearch();
              data.component.cancelEditData();
            });
          break;
      }
    }
  }
  onSearch() {
    this.data
      .get(
        "Prgwebmsg/Get/" +
          this.tgtypeid +
          "/" +
          this.util.getdateformat(this.vdfrom) +
          "/" +
          this.util.getdateformat(this.vdto)
      )
      .then((resp: any) => {
       // console.dir(resp);
        this.webmlist = resp;
      });
  }
  updateStudent(eventData: any, cellInfo: any) {
    // console.log(eventData.value + ' '+cellInfo.data)
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
  }
  updatetargettype(eventData: any, cellInfo: any) {
    // console.log(eventData.value + ' '+cellInfo.data)
    if (cellInfo.setValue) {
      cellInfo.setValue(eventData.value);
    }
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
}
