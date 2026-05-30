import { Component, OnInit } from '@angular/core';
import { locale } from 'devextreme/localization';
import { HttpService } from 'src/app/services/http.service';
import { Encrypt } from 'src/app/shareds/encrypt';
import {UtilService} from './../../services/util.service'
import {AlertService} from './../../services/alert.service'
import CollectionWidget from 'devextreme/ui/collection/ui.collection_widget.base';
@Component({
    standalone: false,
    selector: 'app-prgstudentbyschool',
    templateUrl: './prgstudentbyschool.component.html',
    styleUrls: ['./prgstudentbyschool.component.css'],
})
export class PrgstudentbyschoolComponent implements OnInit {
    schoolstatustitem: any[] = [];
    svalue: any;
    schoolstatustype: any;
    documentstatus: any;
    sequence: number = 1;
    schoolprovinceid: any;
    schooldistrict: any;
    schoolid: any;
    schoolidto: any;
    studentcode: any;
    divisioncode: any;
    groupyear: any;
    studentgroup: any;
    editmodeopen: boolean = false;
    documenttatuslist: any;
    passstatus: any;
    docreturn: any;
    datereturn: any;
    schoolstatustypelist: any;
    schoolprovincelist: any;
    schooldistrictlist: any;
    schoollist: any;
    divisioncodelist: any;
    studentgrouplist: any;
    docstatuswhere: any;
    divisionwhere: any;
    schooltypewhere: any;
    schoolprovwhere: any;
    schooldistwhere: any;
    schoolwhere: any;
    stdgroupwhere: any;
    stustatuslist: any;
    arraystoredata: any[] = [];
    strwhere: any;
    admitacadyear: number = +sessionStorage.getItem('maacadyear');
    levellist: any[] = [];
    //levelid: any;
    faclist: any;
    faccombo: any;
    facid : any;

    tabname = 0;
    tablist = [{ id: 0, text: "เอกสารขึ้นทะเบียนนักศึกษาใหม่" }];
    documentlist;
    studentname: any;
    studentsurname: any;

    levelcode: any = '10';

    receivenumber: any;
    receivedate: any;

    load = false;
    // sequencecopy : any ;
    // documentstatuscopy:any = '05'
    // popupVisible = false;

    folderpath : any = 'D:\\studentimg';

    constructor(private data: HttpService, private encrypt: Encrypt,private util :UtilService,private alert :AlertService) {
        locale('th');
        this.schoolstatustype = 'S';
        this.data.get('ComboSysbyt/getSysbytedes/SCHOOLSTATUS/SCHOOLSTATUSTYPE').then((response:any) => {
            this.schoolstatustypelist = response;
        });
        this.data.getcombo('ComboProv/All').then((response:any) => {this.schoolprovincelist = response;});
       // this.data.getcombo('ComboLev/All').then((response:any) => {this.levellist = response;});
        // this.data.get('ComboSysbyt/getSysbytedes/LEVELCODE/LEVELCODEGROUP').then((response:any) => {this.levellist = response;});

        this.data.getcombo('ComboSysbyt/getSysbytedes/STUDENTSTATUS/STUDENTSTATUS').then((response:any) => {this.stustatuslist = response;});
        // this.data.get('ComboSysbyt/getSysbytedesbyval/STUDENTBIO/PASSSTATUS/<>/N/null').then((response:any) => {
        //     this.documenttatuslist = response;
        //     this.documenttatuslist.forEach((element) => {
        //         this.arraystoredata.push({ comboid: element.comboid, comboshow: element.comboshow });
        //     });
        // });

          this.data.getcombo('ComboSysbyt/getSysbytedes/SCHOOLSTATUSITEM/DOCUMENTSTATUS').then((resp:any) => {
                this.documenttatuslist = resp;
                this.arraystoredata = resp;
            });

        
         this.data.getcombo('ComboFac/All').then((resp: any) => {
                this.faclist = resp;
                this.faccombo = resp;
            });
        
        
    }
    ngOnInit(): void {
        this.refSchool();
    }
    getDistrict() {
        this.getSchooldistrict();
    }
    // refstudentgroup() {

    //     this.data.getcombo('ComboStuset/Acadfaclev/'+this.util.ntz(this.admitacadyear) +'/'+ this.util.ntz(this.levelid) + '/-9/-9').then(
    //         (response: any) => {
    //           this.studentgrouplist=response;
    //         }
    //       );

    //     // if (this.groupyear != null && this.groupyear != 'null' && this.groupyear != '') {
    //     //     this.data.select('Viewstudentgroupname/' + this.util.ntb(this.groupyear)).subscribe((response:any) => {
    //     //         this.studentgrouplist = response;
    //     //     });
    //     // } else {
    //     //     this.studentgrouplist = [];
    //     // }
    // }
    onSearch() {
        
        if(this.schoolstatustype){
            //this.svalue = showstrwhere;
            this.load = true;
            this.data.get('Prgstudentbyschool/Getbyschostatustype/' + this.util.ntb(this.schoolstatustype) +'/'
                                                                   + this.util.ntz(this.documentstatus) +'/'
                                                                   + this.util.ntz(this.sequence) +'/'
                                                                   + this.util.ntz(this.admitacadyear) +'/'
                                                                   + this.util.ntz(this.schoolprovinceid) +'/'
                                                                   + this.util.ntb(this.schooldistrict) +'/'
                                                                   + this.util.ntz(this.schoolid) +'/'
                                                                   + this.util.ntz(this.schoolidto) +'/'
                                                                   + this.util.ntz(null) +'/'
                                                                   + 'null/'
                                                                   + this.util.ntb(this.studentgroup) +'/'
                                                                   + this.util.ntb(this.studentcode) +'/'
                                                                   + this.util.ntb(this.studentname) +'/'
                                                                   + this.util.ntb(this.studentsurname)+'/'
                                                                   + this.util.ntz(this.facid)+'/'
                                                                   + this.util.ntb(this.levelcode)
            ).then((response:any) => {
                if (response.length !== 0) {
                    this.schoolstatustitem = response;
                } else {
                    this.alert.Showwarning('ไม่พบข้อมูล');
                    this.schoolstatustitem = [];
                }
                this.load = false;
            });
        } else {
            this.alert.Showwarning('กรุณากรอกข้อมูล');
            this.schoolstatustitem = [];
        }


     
    }
    dataSave(data:any) {
        
        var parameter: any;
        if (data.changes.length != 0) {
            data.cancel=true
            parameter = data.changes[0]['data'];

            if(parameter?.senddate){
                parameter.senddate = parameter.senddate.toDateString();
            }
            if(parameter?.receivedate){
                parameter.receivedate = parameter.receivedate.toDateString();
            }


            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyschoolstatusid = data.changes[0]['key'].schoolstatusid;
                    parameter.keystudentid = data.changes[0]['key'].studentid;
                    parameter.keysequence = data.changes[0]['key'].sequence;

                    this.data.put('Prgstudentbyschool/Put', parameter).then(
                        (resp:any) => {
                            this.alert.Showsuccess();
                            this.onSearch();
                            data.component.cancelEditData();
                        }
                    );
                    break;
            }
        }else{
            this.editmodeopen = false;
        }
    }
    
    // onEditstart(e:any) {
    //     if (!this.editmodeopen) {
    //         this.editmodeopen = true;
    //     } else {
    //         this.alert.Warning(1);
    //         e.cancel = true;
    //     }
    // }
    // onCancelEditmode() {
    //     this.editmodeopen = false;
    // }
    // onInsertingstart(e:any) {
    //     if (!this.editmodeopen) {
    //         this.editmodeopen = true;
    //     } else {
    //         this.alert.Warning(1);
    //         e.cancel = true;
    //     }
    // }
   
    getSchooldistrict() {
        this.schooldistrictlist = [];
        if (this.schoolprovinceid != null && this.schoolprovinceid != 'null' && this.schoolprovinceid != '') {
            this.data.get('ComboDis/Getbyprov/' + this.schoolprovinceid).then((response:any) => {
                this.schooldistrictlist = response;
            });
        }
    }
    refSchool() {
        if (
            this.admitacadyear != null &&
            this.schoolstatustype != null &&
            this.schoolstatustype != 'null' &&
            this.schoolstatustype != ''
        ) {
            this.data
                .getcombo('Prgstudentbyschool/Getbyacayear/' + this.admitacadyear + '/' + this.schoolstatustype+'/'+this.util.ntz(this.schoolprovinceid) + '/' + this.sequence + '/' + this.levelcode)
                .then((response:any) => {
                    this.schoollist = response;
                });
        } else {
            this.schoollist = [];
        }
    }
    onToolbarPreparing(e:any) {
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                template: 'labelDatereturn',
            },
            {
                location: 'after',
                template: 'labelDocreturn',
            },
            // {
            //     location: 'after',
            //     widget: 'dxTextBox',
            //     options: {
            //         onValueChanged: this.selectdocreturn.bind(this),
            //     },
            // },

            // {
            //     location: 'after',
            //     widget: 'dxDateBox',
            //     options: {
            //         onValueChanged: this.selectdate.bind(this),
            //     },
            // },
            {
                location: 'after',
                template: 'labelPassstatus',
            },
            {
                location: 'after',
                template: 'btnPasss',
            },
            // {
            //     location: 'after',
            //     template: 'btntransfer',
            // },
            // {
            //     location: 'after',
            //     widget: 'dxSelectBox',
            //     options: {
            //         width: 290,
            //         items: this.arraystoredata,
            //         displayExpr: 'comboshow',
            //         valueExpr: 'comboid',
            //         onValueChanged: this.selectdocstatus.bind(this),
            //     },
            // },
            // {
            //     location: 'after',
            //     widget: 'dxButton',
            //     options: {
            //         width: 170,
            //         text: 'ปรับข้อมูลเป็นชุด',
            //         stylingMode: 'contained',
            //         type: 'default',
            //         icon: 'selectall',                   
            //         onClick: this.updateDatagroup.bind(this),
                    
            //     },
            // },
            // {
            //     location: 'after',
            //     widget: 'dxButton',
            //     options: {
            //         width: 130,
            //         text: 'ดึงทั้งหมด',
            //         stylingMode: 'contained',
            //         type: 'default',
            //         icon: 'download',
            //         onClick: this.DownloadAll.bind(this),
            //         //disabled : true,
                    
            //     },
            // }
        );
    }
    // selectdocreturn(e:any) {
    //     this.docreturn = e.value;
    // }
    // selectdate(e:any) {
    //     this.datereturn = e.value;
    // }
    // selectdocstatus(e:any) {
    //     this.passstatus = e.value;
    // }
    updateDatagroup() {
        if (this.passstatus == null || this.schoolid == null || this.schoolidto == null) {
            //if (typeof this.docreturn === 'undefined') this.alert.Showwarning('กรุณาระบุข้อมูล เลขที่ส่งหนังสือคืน');

            //if (typeof this.datereturn === 'undefined') this.alert.Showwarning('กรุณาระบุข้อมูล วันที่ส่งคืน');

            if (this.passstatus == null) this.alert.Showwarning('กรุณาระบุข้อมูล ปรับสถานะเป็น');

            if (this.schoolid == null) this.alert.Showwarning('กรุณาระบุข้อมูล จาก โรงเรียน/สถาบัน');
            if (this.schoolidto == null) this.alert.Showwarning('กรุณาระบุข้อมูล ถึง โรงเรียน/สถาบัน');
        } else {
            var result = this.alert.MsgBoxQuestion("ยืนยันปรับข้อมูลเป็นชุด ใช่หรือไม่");
            result.show().then((repa: any) => {
            //console.log(rep);
            if (repa.value === "Y") {
                    this.load = true;
                    let parameter: any;
                    let tmpdate: any;
                    parameter = { 'receivedate': this.util.getdateformat(this.receivedate), 'receivenumber': this.util.ntb(this.receivenumber),'docreturn': this.docreturn,'datereturn':this.util.getdateformat(this.datereturn)+'','docstatus':this.passstatus};
                    //tmpdate =this.datereturn.getDate() +'/' +Number(this.datereturn.getMonth() + 1) +'/' +this.datereturn.getFullYear();
                    this.data.put('Prgstudentbyschool/Putbyreturn/'  + this.util.ntb(this.schoolstatustype) +'/'
                                                                    + this.util.ntz(this.documentstatus) +'/'
                                                                    + this.util.ntz(this.sequence) +'/'
                                                                    + this.util.ntz(this.admitacadyear) +'/'
                                                                    + this.util.ntz(this.schoolprovinceid) +'/'
                                                                    + this.util.ntb(this.schooldistrict) +'/'
                                                                    + this.util.ntz(this.schoolid) +'/'
                                                                    + this.util.ntz(this.schoolidto) +'/'
                                                                    + this.util.ntz(null) +'/'
                                                                    + 'null/'
                                                                    + this.util.ntb(this.studentgroup) +'/'
                                                                    + this.util.ntb(this.studentcode) +'/'
                                                                    + this.util.ntb(this.studentname) +'/'
                                                                    + this.util.ntb(this.studentsurname)+'/'
                                                                    + this.util.ntz(this.facid)+'/'
                                                                    + this.util.ntb(this.levelcode)
                    ,parameter).then((resp:any) => {
                                this.alert.Showsuccess();
                                this.onSearch();
                                //this.load = false;
                    });
            }
            });
        }
        //console.log("เลขที่ส่งหนังสือคืน : " + this.docreturn +"\nวันที่ส่งคืน : " + this.datereturn + "\nปรับสถานะเป็น : " + this.passstatus + "\nชื่อสถาบัน : " + this.schoolid);
    }
    getShowstrwhere(e:any) {
        // if (typeof e.itemData.stdgroupname != 'undefined')
        //     this.stdgroupwhere = 'กลุ่ม=' + e.itemData.stdgroupname || e.itemData;

        // if (typeof e.itemData.comboshow != 'undefined')
        //     this.divisionwhere = 'ระดับ=' + e.itemData.comboshow || e.itemData;

        // if (typeof e.itemData.comboshow != 'undefined')
        //     this.schoolprovwhere = 'จังหวัด=' + e.itemData.comboshow || e.itemData;

        // if (typeof e.itemData.comboshow != 'undefined')
        //     this.schooldistwhere = 'อำเภอ=' + e.itemData.comboshow || e.itemData;

        if (typeof e.itemData.schoolnamesshow != 'undefined')
            this.schoolwhere = 'ชื่อสถาบัน=' + e.itemData.schoolnamesshow || e.itemData;

        // if (typeof e.itemData.comboshow != 'undefined') {
        //     if (e.itemData.columnname == 'PASSSTATUS')
        //         this.docstatuswhere = 'สถานะตรวจสอบ=' + e.itemData.comboshow || e.itemData;
        //     if (e.itemData.columnname == '"SCHOOLSTATUSTYPE"')
        //         this.schooltypewhere = 'ประเภท=' + e.itemData.comboshow || e.itemData;
        // }
    }
    selectionChanged(data:any){
    
        let studentid;
        if (sessionStorage.getItem('editmodeopen') == 'false') {
        
            if(data.selectedRowKeys[0]?.studentid){
                studentid = data.selectedRowKeys[0]?.studentid;
                // this.data.get('Prgstudentbyschool/Getstudocbyid/'+ studentid).then((rep:any) => {this.documentlist = rep;});
            }
        }
    }
    Download(data : any){
        //let dataenc = this.encrypt.encryptData('APPLICANTDOC/'+ data.acadyear +'/'+ data.studentid +'/'+ data.doccode +'_'+ data.studentid +data.realfilename).split('/').join('@@');
        let parameter= {'filename' : this.encrypt.encryptData('STUDENTDOC/'+ data.acadyear +'/'+ data.doccode +'/'+ data.filename)};
        this.data.post('Prgdowfil/Getbynamepost',parameter)
        .then((rep: any) => {
            if (rep.result == "" || !rep.result) {
                this.alert.Warningfilenotfound();
              } else {
                //console.log(rep);
                let type = "";
                let repx = "";
                if(rep.result.indexOf("application/pdf") > 0){
                  type = "application/pdf";
                  repx = rep.result.replace('data:application/pdf;base64,','');
                }else{
                  type = "image/jpg";
                  repx = rep.result.replace('data:image/jpg;base64,','');
                }
                
        //console.log(repx,type)
                //var enc = window.atob(repx);
                // var pdf = new File([enc], "random.pdf", {
                //   type: "data:application/pdf"
                // });
                var file = this.b64toBlob(repx, type,'');
                // var fileb = new File(["akkaka"], "ranom", {
                //   type: "data:application/pdf"
                // });
                //console.log(file);
                //console.log(fileb.size);
                var imgURL = URL.createObjectURL(file);
                //console.log(imgURL);
                //let pdfWindow = window.open(imgURL)
                //var res = "Encoded String: " + pdf;
                //document.getElementById("app").innerHTML = "<img src='" + pdf + "' />";
        
                let pdfWindow = window.open("")
                pdfWindow.document.write("<iframe width='100%' height='100%' src='" + imgURL + "'></iframe>")
                //var link = document.createElement('a');
                //link.setAttribute('href', rep.result); encodeURI
                //link.setAttribute('download', data.filename);
                //link.click();
                //this.getBase64(rep.result);
              }

          //console.log(data);
            if (rep.result == "" || !rep.result) {
              this.alert.Warningfilenotfound();
            } else {
              //console.log(rep);
              let pdfWindow = window.open("")
              pdfWindow.document.write("<iframe width='100%' height='100%' src='" + (rep.result) + "'></iframe>")
              //var link = document.createElement('a');
              //link.setAttribute('href', rep.result); encodeURI
              //link.setAttribute('download', data.filename);
              //link.click();
              //this.getBase64(rep.result);
            }
        });
      }

      DownloadAll(){
        //console.log("")
        this.load = true;
        var tmpfolder = this.folderpath.replaceAll('\\' , '@-');

        this.data.post('Prgdowfil/DownloadZipFileAll/' + + this.util.ntb(this.schoolstatustype) +'/'
                                                        + this.util.ntz(this.documentstatus) +'/'
                                                        + this.util.ntz(this.sequence) +'/'
                                                        + this.util.ntz(this.admitacadyear) +'/'
                                                        + this.util.ntz(this.schoolprovinceid) +'/'
                                                        + this.util.ntb(this.schooldistrict) +'/'
                                                        + this.util.ntz(this.schoolid) +'/'
                                                        + this.util.ntz(this.schoolidto) +'/'
                                                        + this.util.ntz(null) +'/'
                                                        + 'null/'
                                                        + this.util.ntb(this.studentgroup) +'/'
                                                        + this.util.ntb(this.studentcode) +'/'
                                                        + this.util.ntb(this.studentname) +'/'
                                                        + this.util.ntb(this.studentsurname)+'/'
                                                        + this.util.ntz(this.facid)+'/'
                                                        + this.util.ntb(this.levelcode),{}).then((resp: any) => {
if(resp.result !== ""){
                var link = document.createElement('a');
                link.setAttribute('href', resp.result); 
                link.setAttribute('download', "studentschool.zip");
                link.click();
                
                //this.getBase64(rep.result);
                //console.log(resp);
                this.load = false;
                this.alert.Showsuccess();
}else{
    this.load = false;
    this.alert.Showerror("ไม่พบข้อมูล");
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

      updatedatafrom(eventData:any, cellInfo: any) {
    
        //var d = new Date(cellInfo.data[str]);
        //if(eventData.value > d) {
        //  cellInfo.data[str] = eventData.value;
        //}
        if (cellInfo.setValue) {
          cellInfo.setValue(eventData.value);
        }
      }

    // refcopyvalue(){
    //     this.sequencecopy = this.sequence + 1 
    //     this.documentstatuscopy = this.documentstatus
    // }

    // ontransfer(){
    //     this.popupVisible = true;
    // }

    //   processtransfer(){

    //     if (this.documentstatuscopy == null || this.sequencecopy == null ) {
    //         if (this.documentstatuscopy == null) this.alert.Showwarning('กรุณาระบุข้อมูล ย้ายจากสถานะตรวจสอบวุฒิ');
    //         if (this.sequencecopy == null) this.alert.Showwarning('ย้ายไปรอบที่');
    //     } else {
    //         var result = this.alert.MsgBoxQuestion("ยืนยันย้ายรอบข้อมูลตรวจสอบ ใช่หรือไม่");
    //         result.show().then((repa: any) => {
    //         if (repa.value === "Y") {
    //                 this.load = true;
    //                 let parameter: any;
    //                 let tmpdate: any;
    //                 parameter = {
    //                         'sequencefrom': this.sequence, 
    //                         'documentstatusfrom': this.documentstatuscopy,
    //                         'sequenceto': this.sequencecopy,
    //                 };

    //                 this.data.put('Prgstudentbyschool/Puttransfer/'  + this.util.ntb(this.schoolstatustype) +'/'
    //                                                                 + this.util.ntz(this.documentstatus) +'/'
    //                                                                 + this.util.ntz(this.sequence) +'/'
    //                                                                 + this.util.ntz(this.admitacadyear) +'/'
    //                                                                 + this.util.ntz(this.schoolprovinceid) +'/'
    //                                                                 + this.util.ntb(this.schooldistrict) +'/'
    //                                                                 + this.util.ntz(this.schoolid) +'/'
    //                                                                 + this.util.ntz(this.schoolidto) +'/'
    //                                                                 + this.util.ntz(null) +'/'
    //                                                                 + 'null/'
    //                                                                 + this.util.ntb(this.studentgroup) +'/'
    //                                                                 + this.util.ntb(this.studentcode) +'/'
    //                                                                 + this.util.ntb(this.studentname) +'/'
    //                                                                 + this.util.ntb(this.studentsurname)+'/'
    //                                                                 + this.util.ntz(this.facid)+'/'
    //                                                                 + this.util.ntb(this.levelcode)
    //                 ,parameter).then((resp:any) => {
    //                             this.alert.Showsuccess();
    //                             this.onSearch();
    //                             // this.popupVisible = false;
    //                             // this.documentstatuscopy = null
    //                             // this.sequencecopy = null
    //                             //this.load = false;
    //                 });
    //         }
    //         });
    //     }

    //   }
}
