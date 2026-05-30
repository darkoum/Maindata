import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { locale } from 'devextreme/localization';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { Encrypt } from 'src/app/shareds/encrypt';

@Component({
    standalone: false,
  selector: 'app-prgstudentdocument',
  templateUrl: './prgstudentdocument.component.html',
  styleUrl: './prgstudentdocument.component.css'
})
export class PrgstudentdocumentComponent {

  studentcode: any;
  remark;
  studentinfo;
  documentlist;
  tmpdata;
  popupVisiblereprint;
  // showSelector: boolean = false;

  emailButtonOptionsreprint: any;
  closeButtonOptionsreprint: any;

  constructor(private data: HttpService, private encrypt: Encrypt, private alert: AlertService, private util: UtilService, private routes: Router) {
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
        //console.log('xxxxxx',e);
        that.popupVisiblereprint = false;
      }
    };
  }

  ngOnInit(): void {

  }

  getStudentinfo() {
    if (this.studentcode) {
      // this.showSelector = false
      this.data.get("Prgstudentstatus/Getviewstudentinfobystucode/" + this.studentcode).then((response: any) => {
          this.studentinfo = response;
          this.getDocLst(response[0].studentid);
      });
    } else {
      // this.showSelector = true
      this.alert.MsgBoxCritical("กรุณาระบุรหัสนักศึกษา")
    }
  }

  getDocLst(studentid: number){
    this.data.get(`Prgaddnewstudent/Getdocbystuid/${studentid}`).then((rep:any) => {this.documentlist = rep;});
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
        this.getDocLst(data.studentid);
        this.alert.Showsuccess();
      }
    );
  }

  Download(data : any){
    let parameter= {'filename' : this.encrypt.encryptData('/STUDENTDOC/'+ data.acadyear +'/'+ data.doccode +'/'+ data.filename)};
    this.data.post('Prgaddnewstudent/Getbynamepost',parameter).then((rep: any) => {
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
  // onStudentSelected(code: string) {
  //   this.studentcode = code;
  // }
}
