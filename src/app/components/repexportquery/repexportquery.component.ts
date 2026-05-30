import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { Encrypt } from "src/app/shareds/encrypt";
import { UtilService } from "../../services/util.service";
import { AlertService } from "src/app/services/alert.service";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";

@Component({
    standalone: false,
  selector: "app-repexportquery",
  templateUrl: "./repexportquery.component.html",
  styleUrls: ["./repexportquery.component.css"],
})
export class RepexportqueryComponent implements OnInit {
  rootyplist: any[] = [];
  quecodcombo: any[] = [];
  quecodid: string = "H";
  sysexpcombo: any[] = [];
  sysexpid: string;
  querylist: any[] = [];
  // querylist1 : any[]=[];
  // camcomboid : number;
  levcomboid: number;
  faccomboid: number;
  procomboid: number;
  admitacadyear: number;
  admitsemester: number;
  dadmitacadyear: number = +sessionStorage.getItem("maacadyear");
  dadmitsemester: number = +sessionStorage.getItem("masemester");
  dacadyear: number = +sessionStorage.getItem("maacadyear");
  dsemester: number = +sessionStorage.getItem("masemester");
  acadyear: number;
  semester: number;
  // camcombo: any[] = [];
  levcombo: any[] = [];
  faccombo: any[] = [];
  procombo: any[] = [];
  stustacombo: any[] = [];
  popupVisible = false;
  stustafrom: any;
  stustato: any;
  barcodedate: any;
  documentdownloaddate: any;
  // depcombo : any;
  // depcomboid : number;
  // depsubcombo : any;
  // depsubcomboid : number;

  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService
  ) {
    //locale('th');
  }

  ngOnInit(): void {
    // this.getRootyp();
    this.getQuecod();
    // this.getCamcombo();
    this.getLevcombo();
    this.getFaccombo();
    this.getprocombo();
    this.getStustacombo();
  }
  // getRootyp() {
  //   this.data.select('Rootyp').subscribe((resp:any) => {
  //       this.rootyplist = resp;
  //   });
  //   }
  getStustacombo() {
    /*  this.data.get('ComboSysbyt/getSysbytedes/SYSEXPORTQUERY/QUERYGROUP') */

    // this.data.get('ComboSysbyt/getSysbytedesbyval/SYSEXPORTQUERY/QUERYGROUP/not in/C/null').then(
    this.data
      .get("ComboSysbyt/getSysbytedes/STUDENTSTATUS/STUDENTSTATUS")
      .then((resp: any) => {
        this.stustacombo = resp;
      });
  }

  getQuecod() {
    /*  this.data.get('ComboSysbyt/getSysbytedes/SYSEXPORTQUERY/QUERYGROUP') */

    // this.data.get('ComboSysbyt/getSysbytedesbyval/SYSEXPORTQUERY/QUERYGROUP/not in/C/null').then(
    this.data
      .get("ComboSysbyt/getSysbytedes/SYSEXPORTQUERY/QUERYGROUP")
      .then((resp: any) => {
        this.quecodcombo = resp.filter((item: any) => item.comboid == "S");
      });
  }
  getExpcombo() {
    this.sysexpid = null;
    this.data
      .get("Repexportquery/Getbygroup/" + this.quecodid)
      .then((resp: any) => {
        this.sysexpcombo = resp;
        this.sysexpid = resp[0]?.querycode;
      });
  }
  // getExpcombo() {
  //   let strwhere = '';
  //    this.data.select("repexportquery/" + this.quecodid).subscribe((resp:any) => {
  //     this.sysexpcombo = resp;
  //     })
  // }

  getFaccombo() {
    this.data.get("ComboFac/All").then((resp: any) => {
      this.faccombo = resp;
    });
  }

  // getdepartmentlist(): void {
  //   this.data.getcombo('ComboDep/Getbyfacid/' + this.util.ntz(this.faccomboid)).then(
  //       (rep:any) => {
  //           this.depcombo = rep;
  //       }
  //   );
  // }

  // getdepartmentsublist(): void {
  //   this.data.getcombo('ComboDepsub/Getbyfacid/' + this.util.ntz(this.faccomboid) + '/' + this.util.ntz(this.depcomboid)).then(
  //       (rep:any) => {
  //           this.depsubcombo = rep;
  //       }
  //   );
  // }
  // getFaccombo() {
  //   this.data.select('Fac').subscribe(
  //     (response:any) => {
  //       //   console.log(response);
  //       this.faccombo = response;
  //     },
  //     (error:any) => { }
  //   );
  // }

  // getCamcombo() {
  //     this.data.get('ComboCam/All').then((resp: any) => {this.camcombo = resp;});
  // }
  //getCamcombo() {
  //   this.data.select('Cam').subscribe(
  //     (response:any) => {
  //        this.camcombo = response;
  //     },
  //     (error:any) => { }
  //   );
  // }
  getLevcombo() {
    this.data.get("ComboLev/All").then((resp: any) => {
      this.levcombo = resp;
    });
  }
  // getLevcombo() {
  //   this.data.select('Lev').subscribe(
  //     (response:any) => {
  //       //   console.log(response);
  //       this.levcombo = response;
  //     },
  //     (error:any) => { }
  //   );
  // }

  // getprocombo() {
  //   let strwhere = '';
  //   //this.svalue = this.levcomboid;
  //   if (this.faccomboid > 0) {
  //     if (strwhere.length > 0) {
  //       strwhere = strwhere + ' and ';
  //     }
  //     strwhere = strwhere + 'facultyid=' + this.faccomboid;
  //   }

  //   if (this.levcomboid > 0) {
  //     if (strwhere.length > 0) {
  //       strwhere = strwhere + ' and ';
  //     }
  //     strwhere = strwhere + 'levelid=' + this.levcomboid;
  //   }

  //   if (this.faccomboid > 0 || this.levcomboid > 0){
  //   this.data.get('ComboPro/Profaclev/' + this.util.ntz(this.faccomboid) +'/'+ this.util.ntz(this.levcomboid)).then((resp: any) => {this.procombo = resp;});
  //   //this.data.get('ComboPro/Profaclev/' + this.util.ntz(this.faccomboid) +'/'+ this.util.ntz(this.levcomboid)).subscribe((resp:any) => {
  //   //   this.procombo = resp;
  //   // })
  // }
  // }

  getprocombo() {
   
    if (this.util.ntz(this.faccomboid)!=-9) {
      this.data
        .getcombo("ComboPro/Getbyfacid/" + this.faccomboid)
        .then((resp: any) => {
          this.procombo = resp;
        });
    }
  }

  onSearch() {
    this.data
      .get(
        "Repexportquery/Getbyquerybymain/" +
          this.quecodid +
          "/" +
          this.sysexpid +
          "/" +
          this.util.ntz(null) +
          "/" +
          this.util.ntz(this.faccomboid) +
          "/" +
          this.util.ntz(null) +
          "/" +
          this.util.ntz(null) +
          "/" +
          this.util.ntz(this.levcomboid) +
          "/" +
          this.util.ntz(this.procomboid) +
          "/" +
          this.util.ntz(this.admitacadyear) +
          "/" +
          this.util.ntz(this.admitsemester) +
          "/" +
          this.util.ntz(null) +
          "/" +
          this.util.ntz(null) +
          "/" +
          this.util.ntz(this.stustafrom) +
          "/" +
          this.util.ntz(this.stustato)
      )
      .then((resp: any) => {
        this.querylist = resp;
        if (this.querylist[0].json.length > 2) {
          //console.dir(this.querylist[0].json.length);
          let obj = JSON.parse(this.querylist[0].json);
          this.querylist = obj;
          this.popupVisible = false;
          // this.camcomboid = null;
          // this.faccomboid= null;
          // this.levcomboid= null;
          // this.procomboid= null;
          // this.admitacadyear= null;
          // this.admitsemester= null;
          // this.acadyear= null;
          // this.semester= null;
        } else {
          this.popupVisible = false;
          this.alert.Showwarning("ไม่พบข้อมูล");
          this.querylist = [];
        }

        // this.querylist = resp;
        // let obj = JSON.parse(this.querylist[0].json);
        // this.querylist = obj;
        // this.popupVisible = false;
      });
  }

  getFiltershow() {
    // this.camcomboid = null;
    this.levcomboid = null;
    this.faccomboid = null;
    this.procomboid = null;
    this.admitacadyear = +sessionStorage.getItem("maacadyear");
    this.admitsemester = +sessionStorage.getItem("masemester");
    this.acadyear = null;
    this.semester = null;
    this.stustafrom = "10";
    this.stustato = "10";
    // this.depcomboid = null;
    // this.depsubcomboid = null;

    // console.log(e);
    // this.querylist1.forEach(val => {
    //   if (val.FILTERNAME == e ){
    //   return true;
    //  }else{
    //   return false;

    //  }

    //   getQuecod() {
    //     this.data.get('ComboSysbyt' + '/getSysbytedes/' + 'SYSEXPORTQUERY' + '/' + 'QUERYGROUP').then(
    //         (resp: any) => {
    //             this.quecodcombo = resp;
    //         }
    //     );

    // }
    // this.data.get('Sysexpquefilfor/Getbycode/' + this.sysexpid ).then((resp:any) => {

    //   this.querylist1 = resp;

    //   let obj = JSON.parse(this.querylist1[0].json);
    //   //console.dir(obj);
    //   this.querylist1 = obj;

    //   for (let i = 0; i < this.querylist1.length; i += 1) {
    //     if ("acadyear" == this.querylist1[i].FILTERNAME) {

    //       this.acadyear = +sessionStorage.getItem('maacadyear');
    //     }
    //     if ("semester" == this.querylist1[i].FILTERNAME) {

    //       this.semester = +sessionStorage.getItem('masemester');
    //     }
    //     if ("admitacadyear" == this.querylist1[i].FILTERNAME) {

    //       this.admitacadyear = +sessionStorage.getItem('maacadyear');
    //     }
    //     if ("admitsemester" == this.querylist1[i].FILTERNAME) {

    //       this.admitsemester = +sessionStorage.getItem('masemester');
    //     }

    //     }

    this.popupVisible = true;

    // });
  }

  // checkPageSize(e:any) {
  //   if (e.fullName === "paging.pageSize") {
  //     if (isNaN(e.value)) {
  //       e.component.pageSize(0)
  //     }
  //   }
  //   setTimeout(() => {
  //     if (e.component.pageSize() == 0) {
  //       var el = e.component._$element.find('.dx-page-size').last();
  //       el.addClass("dx-selection")
  //     }
  //        }, 100);
  // }

  // exportTXT(e){
  //   this.download(this.querylist, 'textfile.txt', 'text/plain');
  // }

  download(content, fileName, contentType) {
    //console.log(JSON.stringify(content));
    let data = "";
    content.forEach((e) => {
      data +=
        e.ปีการศึกษา +
        "," +
        e.รหัสโครงการ +
        "," +
        e.ชื่อโครงการ +
        "," +
        e["รอบการ Clearing"] +
        "," +
        e.คณะ +
        "," +
        e.ชื่อคณะ +
        "," +
        e.รหัสสาขาที่สมัคร +
        "," +
        e.ชื่อสาขาที่สมัคร +
        "," +
        e.จำนวนที่นำเข้า +
        "," +
        e.จำนวนที่ชำระเงิน +
        "\n";
    });
    var a = document.createElement("a");
    var file = new Blob([data], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  gridonToolbarPreparing(e: any) {
    //console.log(e.toolbarOptions.items)
    e.toolbarOptions.items.find((i) => (i.name = "exportButton")).showText =
      "always";

    e.toolbarOptions.items.unshift({
      location: "after",
      template: "heddershow",
    });
  }

  onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Employees");

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "DataGrid.xlsx"
        );
      });
    });
  }

  stustachange() {
    this.stustato = this.stustafrom;
  }
}
