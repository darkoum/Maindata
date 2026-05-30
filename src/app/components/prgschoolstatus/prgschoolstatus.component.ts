import { filter } from 'rxjs/operators';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { AccountService } from './../../services/account.service';
import { Encrypt } from './../../shareds/encrypt';
import notify from 'devextreme/ui/notify';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import { confirm } from 'devextreme/ui/dialog';
import { UtilService } from 'src/app/services/util.service';

@Component({
    standalone: false,
  selector: 'app-prgschoolstatus',
  templateUrl: './prgschoolstatus.component.html',
  styleUrls: ['./prgschoolstatus.component.css']
})


export class PrgschoolstatusComponent implements OnInit {

  schstalist: any = [];
  stulist: any = [];
  schocombo : any = [];
  schstatypcombo: any[] = [];
  docstacombo: any[] = [];
  docstashow: any[] = [];
  schstatyp:String = 'S';
  docsta: String = 'Y';
  seq : number = 1;
  coucodecombo: any[] = [];
  coucode: String;
  provcombo: any[] = [];
  provid : number 
  discombo: any[] = [];
  disid: string;
  scho2id : number;
  schocombo2: any[] = [];
  //schocombo3: any[] = [];
  tmpschstaid : number;
  tmpschid : number;
  tmpschstatyp : string;
  tmpschname: string;
  tmpseq : number;
  admitacadyear: number = +sessionStorage.getItem('maacadyear');
  schstaitelist : any[] = [];
  schstaitetyprlist : any[] = [];

  faccombo: any[] = [];
  facid : any;
  // levellist: any[] = [];
  levelcode: any = '10';

  load = false;
  folderpath : any = 'D:\\studentimg';

  constructor(private data: HttpService, private encrypt: Encrypt, private alert: AlertService,private util: UtilService) {
    locale('th');
    // this.data.get('ComboSysbyt/getSysbytedes/LEVELCODE/LEVELCODEGROUP').then((response:any) => {this.levellist = response;});
    // this.data.getcombo('ComboLevCod/All').then((response:any) => {this.levellist = response;this.levelcode = response.store[0]?.comboid});
    this.data.getcombo('ComboFac/All').then((resp: any) => {this.faccombo = resp;});
   }

  ngOnInit(): void {

    //this.getSchsta();
    this.getScho();
    this.getStu();
    this.getSchstatypcombo();
    // this.getDocstacombo();
    this.getDocstashow();
    this.getCoucodecombo();
    //this.getSchocombo();
    //this.getSchocombo3();
    this.getProvcombo();

  }

//   Showerror(message:any, type:any) {
//     let option = {
//         message: message,
//     };
//     notify(option, type, 5000);
// }
// onCancelEditmode() {
//     this.editmodeopen = false;
// }
// onCancelEditmode2() {
//   this.editmodeopen2 = false;
// }
// onCancelEditmode3() {
//   this.editmodeopen3 = false;
// }
// onEditstart(e:any) {
    
//     if (!this.editmodeopen) {
//         this.editmodeopen = true;
//     } else {
//         alert('คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข');
//         e.cancel = true;
//     }
// }
// onEditstart2(e:any) {
  
//   if (!this.editmodeopen2) {
//       this.editmodeopen2 = true;
//   } else {
//       alert('คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข');
//       e.cancel = true;
//   }
// }
// onEditstart3(e:any) {
  
//   if (!this.editmodeopen3) {
//       this.editmodeopen3 = true;
//   } else {
//       alert('คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข');
//       e.cancel = true;
//   }
// }


getDefault(e:any) {

    // console.log(e.data.senddate);
     e.data.sequence = this.seq;
     e.data.acadyear = this.admitacadyear;
     e.data.semester = 1;
     e.data.schoolstatustype = this.schstatyp;
     e.data.levelcodegroup = this.levelcode;
}
getDefault2(e:any) {
     e.data.sequence = this.tmpseq;
     e.data.schoolstatusid = this.tmpschstaid;
     e.data.documentstatus = "05";
     e.data.schoolstatustype = this.schstatyp;
}


// getSchsta() {
//   this.data.getcombo('Prgschoolstatus/All').then((resp:any) => {
//       this.schstalist = resp;
//   });
// }
getStu() {
  this.data.getcombo('ComboStumas/All').then((resp:any) => {
      this.stulist = resp;
  });
}
getScho() {
  this.data.getcombo('ComboScho/All').then((resp:any) => {
      this.schocombo = resp;
  });
}

getSchstatypcombo() {
  this.data.getcombo('ComboSysbyt/getSysbytedes/SCHOOLSTATUS/SCHOOLSTATUSTYPE').then((resp:any) => {
    this.schstatypcombo = resp;
  });
}
// getDocstacombo() {
//   this.data.getcombo('ComboSysbyt/getSysbytedes/STUDENTBIO/DOCUMENTSTATUS').then((resp:any) => {
//     this.docstacombo = resp;
//   });
// }
getDocstashow() {
  this.data.getcombo('ComboSysbyt/getSysbytedes/SCHOOLSTATUSITEM/DOCUMENTSTATUS').then((resp:any) => {
    this.docstashow = resp;
  });
}
getCoucodecombo() {
  this.data.getcombo('ComboSysbyt/getSysbytedes/PROVINCE/COUNTRYCODE').then((resp:any) => {
    this.coucodecombo = resp;
  });
}
getProvcombo() {
  this.data.getcombo('ComboProv/All').then((resp:any) => {
  //  console.log(resp);
      this.provcombo = resp;
  });
}
getDiscombo() {
  this.data.getcombo('ComboDis/Getbyprov/' + this.provid).then((resp:any) => {
   // console.log(resp);
    this.discombo = resp;
});

}
getSchocombo() {
  this.scho2id = null
  this.data.getcombo('Prgschoolstatus/Getschbytype/' + this.admitacadyear + '/' + this.schstatyp + '/' + this.levelcode+ '/' + this.util.ntz(this.provid)).then((resp:any) => {
      this.schocombo2 = resp;
  });
}
// getSchocombo3() {
//   this.data.get('ComboScho/All').then((resp:any) => {
//       this.schocombo3 = resp;
//   });
// }
customizeText (e:any) {
  return e.value < 0 ? "รวม:" : "รวม: " + e.value;
};
updateSchool(eventData:any, cellInfo: any) {
  // console.log(eventData.value + ' '+cellInfo.data)
  if (cellInfo.setValue) {
    cellInfo.setValue(eventData.value);
  }
}
updateStudent(eventData:any, cellInfo: any) {
  // console.log(eventData.value + ' '+cellInfo.data)
  if (cellInfo.setValue) {
    cellInfo.setValue(eventData.value);
  }
}

selectionChanged(data:any) {
  //console.log(data.selectedRowKeys[0].roomusetypecode);
  //if (!sessionStorage.getItem('editmodeopen')) {

    this.tmpschstaid = data.selectedRowKeys[0]?.schoolstatusid;
    this.tmpschid = data.selectedRowKeys[0]?.schoolid;
    this.tmpschstatyp = data.selectedRowKeys[0]?.schoolstatustype;
    this.tmpseq = data.selectedRowKeys[0]?.sequence;
    this.tmpschname = this.schocombo?.store?.filter(r=> r.comboid == data.selectedRowKeys[0]?.schoolid)[0]?.comboshow;
    //this.getSchstaite( data.selectedRowKeys[0]?.schoolstatusid, data.selectedRowKeys[0]?.sequence,data.selectedRowKeys[0]?.schoolstatustype);
    //this.getSchstaitetypr(data.selectedRowKeys[0]?.schoolstatusid, data.selectedRowKeys[0]?.sequence,data.selectedRowKeys[0]?.schoolstatustype);
   
    if (this.tmpschstaid !== null && this.tmpschstatyp !== undefined && this.tmpseq !== null) {
        this.getSchstaite(this.tmpschstaid, this.tmpseq,this.tmpschstatyp);
        this.getSchstaitetypr(this.tmpschstaid, this.tmpseq,this.tmpschstatyp);
    }
    
    // this.couinprolist = this.getcouinpro( data.selectedRowKeys[0].programid, data.selectedRowKeys[0].conditionid);
    //this.subdislist =""
//} 
}

getSchstaite(schoolstatusid: number, sequence: number,  schoolstatustype:string) {
  
  this.data.get('Prgschoolstatus/Getschstaitebyid/' + this.util.ntz(schoolstatusid) + '/' + this.util.ntz(sequence)  + '/' + this.util.ntb(schoolstatustype)).then((resp:any) => {
      //console.log(resp);
      this.schstaitelist = resp;
  });
}

getSchstaitetypr(schoolstatusid: number, sequence: number,  schoolstatustype:string) {
  
  this.schstaitetyprlist = null;
  this.data.get('Prgschoolstatus/Getschstaitebyschid/' + this.util.ntz(schoolstatusid) + '/' + this.util.ntz(sequence)  + '/' + this.util.ntb(schoolstatustype)).then((resp:any) => {
      //console.log(resp);
      this.schstaitetyprlist = resp;
  });
}

onSearch() {
  // this.getSchocombo();
  this.Clr();
    this.schstaitelist = [];
    this.tmpschstaid = null
    this.schstalist = null;
    this.data.get("Prgschoolstatus/Getschstabytype/" + this.util.ntb(this.schstatyp) + '/' + this.util.ntz(this.admitacadyear) + '/' + this.util.ntb(this.seq) + '/' + this.util.ntz(this.scho2id) + '/' + this.util.ntb(this.coucode) + '/' + this.util.ntz(this.provid) + '/' + this.util.ntz(this.disid)+ '/'+ this.util.ntb(this.levelcode)+'/'+this.util.ntz(this.facid)).then((resp:any) => {
     
      if (resp.length !== 0) {
        this.schstalist = resp;
        this.getSchstaitetypr(this.tmpschstaid, this.tmpseq,this.tmpschstatyp);
        //this.schstaitelist = [];
        //this.data.get('Vieschstaite/0/0/0').then((resp:any) => {
          //console.log(resp);
        //  this.schstaitelist = resp;
        //  this.data.get('Vieschstaitetypr/0/0/0').then((resp:any) => {
            //console.log(resp);
        //    this.schstaitetyprlist = resp;
       // });
      //});
       

    } else {
        this.alert.Showwarning('ไม่พบข้อมูล');
        this.schstalist = [];
    }
    })
    

}
  dataSave(data: any) {

    let parameter: any;
    
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]['data'];

      // if(parameter?.senddate){
      //   parameter.senddate = this.util.getdateformat(parameter.senddate);
      // }
      // if(parameter?.receivedate){
      //   parameter.receivedate = this.util.getdateformat(parameter.receivedate);
      //   }

      //console.log(typeof(parameter.receivedate),parameter,data.changes[0]['data']);
      
       switch (data.changes[0]['type']) {
        case 'update':
          parameter.keyschoolstatusid = data.changes[0]['key'].schoolstatusid;
           //console.dir(parameter);
          this.data.put('Prgschoolstatus/Put', parameter).then((resp:any) => {
              this.onSearch();
              this.alert.Showsuccess();
            });            
            data.component.cancelEditData();
          break;

        case "insert":
          this.data.post('Prgschoolstatus/Post', parameter).then((resp:any) => {
              this.onSearch();
              //this.getSchocombo();
              data.component.cancelEditData();
              this.alert.Showsuccess();
            });
          break;

        case "remove":
            this.data.delete('Prgschoolstatus/Delete/' +  data.changes[0]['key'].schoolstatusid).then((resp:any) => {
                  this.onSearch();
                   //this.getSchocombo();
                    this.alert.Showsuccess();
                });
                data.component.cancelEditData();
            break;
      }
    }
  }

  dataSave2(data: any) {

    //this.editmodeopen2= false;
    let parameter: any;
    data.cancel = true;
    if (data.changes.length !== 0) {
      parameter = data.changes[0]['data'];
       switch (data.changes[0]['type']) {
        case 'update':
          parameter.keyschoolstatusid = data.changes[0]['key'].schoolstatusid;
          parameter.keystudentid = data.changes[0]['key'].studentid;
          parameter.keysequence = data.changes[0]['key'].sequence;
           //console.dir(parameter);
          this.data.put('Prgschoolstatus/Putschstaite', parameter).then((resp:any) => {
              this.getSchstaite(this.tmpschstaid, this.tmpseq,this.tmpschstatyp);
              this.alert.Showsuccess();
              data.component.cancelEditData();
            });
          break;

        case "insert":

          parameter.schoolstatusid = this.tmpschstaid;
          parameter.sequence = this.tmpseq;
          this.data.post('Prgschoolstatus/Postschstaite', parameter).then((resp:any) => {
              this.getSchstaite(this.tmpschstaid, this.tmpseq,this.tmpschstatyp);
              this.alert.Showsuccess();
              data.component.cancelEditData();
            });
          break;

        case "remove":
          
            this.data.delete('Prgschoolstatus/Deleteschstaite/' +  data.changes[0]['key'].schoolstatusid + '/' + data.changes[0]['key'].studentid + '/' + data.changes[0]['key'].sequence  ).then(
                (resp:any) => {
                    this.getSchstaite(this.tmpschstaid, this.tmpseq,this.tmpschstatyp);
                    this.alert.Showsuccess();
                });
                data.component.cancelEditData();
            break;
      }
    }
  }

  // dataSave3(data: any) {

  //   //this.editmodeopen3= false;
  //   let parameter: any;
  //   data.cancel = true;
  //   if (data.changes.length !== 0) {
  //     parameter = data.changes[0]['data'];
  //      switch (data.changes[0]['type']) {
       
  //       case "remove":
          
  //           this.data.delete('Vieschstaitetypr/' +  data.changes[0]['key'].schoolstatusid + '/' + data.changes[0]['key'].studentid + '/' + data.changes[0]['key'].sequence  ).then(
  //               (resp:any) => {
  //                   this.getSchstaitetypr(this.tmpschstaid, this.tmpseq,this.tmpschstatyp);
  //                   this.alert.Showsuccess();
  //               });
  //           break;
  //     }
  //   }
  // }
  onSetSchool() {

    //var result = confirm("ท่านต้องการดึงข้อมูลโรงเรียนหรือไม่?", "ระบบฐานข้อมูลหลัก");
   // result.done(function (dialogResult) {
    

    var result = this.alert.MsgBoxQuestion("ท่านต้องการดึงข้อมูลโรงเรียนในภาคการศึกษานี้หรือไม่?");
    result.show().then((dialogResult) => {
       
      if (dialogResult.value == 'Y') {
        this.load = true;
        let parameter: any;
        this.data.put('Prgschoolstatus/Putbytype/' + this.util.ntb(this.schstatyp) + '/' + this.util.ntz(this.admitacadyear)  + '/' + this.util.ntz(this.seq) + '/' + this.util.ntz(this.provid) + '/' + this.util.ntz(this.disid) + '/' + this.util.ntb(this.docsta) + '/'+ this.util.ntb(this.levelcode),  parameter)
        .then(
          (resp:any) => {
            this.alert.Showsuccess();
            this.onSearch();
            this.getSchocombo()
            this.load = false;
            //console.log(resp)
          }
          ,(err:any)=>{
            this.load = false;
            //console.log(err)
        }
      );
    }
        //alert(dialogResult ? dialogResult : "Canceled");
    }
    );

  }

  onSetSchoolStudent () {
   // this.Alert.MsgBoxCritical("พบรายการลงทะเบียนแล้วกรุณายกเลิกรายการลงทะเบียนก่อน");
   // this.Alert.MsgBoxInformation("ท่านต้องการดึงข้อมูลโรงเรียนในภาคการศึกษานี้หรือไม่?");


 if (this.tmpschstaid !== null && this.tmpschstaid !== undefined && this.tmpschid !== null) {
  let parameter: any;
  this.data.put('Prgschoolstatus/Putgetstudent/' + this.tmpschstaid ,  parameter).then(
    (resp:any) => {
      this.alert.Showsuccess();
      this.onSearch();
      this.getSchstaite(this.tmpschstaid, this.tmpseq,this.tmpschstatyp);
      //this.getSchstaitetypr(this.tmpschstaid, this.tmpseq,this.tmpschstatyp);
    });
      
      
  }else

  {
    this.alert.Showwarning('กรุณาเลือกโรงเรียน/สถาบัน');
  }

   // alert(this.tmpschstaid);

    
  //    var result = this.Alert.dialogboxYN("ท่านต้องการดึงข้อมูลโรงเรียนหรือไม่?");
  //     result.show().then((dialogResult) => {
  //           if (dialogResult.value = 'Y') {
               
            
  //            }
  //       });
    
  // }

}

// DownloadAll(){
//   //console.log("")
//   this.load = true;
//   var tmpfolder = this.folderpath.replaceAll('\\' , '@-');

//   this.data.postfile('Prgschoolstatus/DownloadZipFileSCH/' + this.util.ntz(this.tmpschstaid),{}).then((resp: any) => {
//     // console.log(resp)
//     if(resp.result !== ""){

//           // if(resp.result.substring(0,20) == "data:application/zip"){
//               var link = document.createElement('a');
//               link.setAttribute('href', 'https://' + window.location.hostname + '/FileDownload/' + resp.result); 
//               link.setAttribute('download', resp.result);
//               link.click();

//               //this.getBase64(rep.result);
//               //console.log(resp);
//               this.load = false;
//               this.alert.Showsuccess();
//     }else{
//       this.load = false;
//       this.alert.Showwarning("ไม่พบข้อมูล");
//     }
//   });
// }

Clr(){
  this.schstalist = null;
  this.schstaitelist = null;
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

}
