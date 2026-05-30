import { filter } from 'rxjs/operators';
import { locale } from 'devextreme/localization';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Encrypt } from 'src/app/shareds/encrypt';
import notify from 'devextreme/ui/notify';
import { AlertService } from 'src/app/services/alert.service';
import { UtilService } from 'src/app/services/util.service';
@Component({
    standalone: false,
  selector: 'app-prgquestion',
  templateUrl: './prgquestion.component.html',
  styleUrls: ['./prgquestion.component.css'],
})
export class PrgquestionComponent implements OnInit {
  param = {} as any;
  
  rules: any;

  numfrom: any = 0;
  numto: any = 9999;
  datalist1: any =[];
  datalist2: any = [];
  questionid: any ;


  constructor(
    private http: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService
  ) {
    locale('th');
    this.rules = { X: /[02-9]/ };
  }

  ngOnInit(): void {
   
  }

  getdata1(){
    // console.log(this.numfrom);
    // console.log(this.numto);
this.http.get('Prgquestion/getdata/'+ this.util.ntz(this.numfrom)+ '/'+ this.util.ntz(this.numto)).then((rep:any) => {
  this.datalist1 = rep;
  // console.log(this.datalist1);
});

  }
  getdata2(){
    //console.log(this.questionid);
this.http.get('Prgquestion/getdata2/'+ this.util.ntz(this.questionid)).then((rep:any) => {
  this.datalist2 = rep;
  // console.log(this.datalist2);
});

  }
  selection(data){
    this.questionid = data.selectedRowKeys[0].questionid
    // console.log(this.questionid);
    this.getdata2();
  }




  dataSave2(data: any) {
    let parameter1: any;
    //console.log(data)    ;
  if (data.changes.length !== 0) {
   data.cancel = true;
       parameter1 = data.changes[0]['data'];
       
       //console.log(parameter1);
       // console.log(data.changes[0]['type'])
       switch (data.changes[0]['type']) {
         case 'update':
              parameter1.keyquestionid = this.util.ntz(this.questionid);
              parameter1.keychoiceid = data.changes[0]['key'].choiceid;
              this.http.put('Prgquestion/Putchoice', parameter1).then(
                (resp:any) => {
                  this.getdata2();
                  this.alert.Showsuccess();
                  data.component.cancelEditData();
                }
              );
              break;
              
              case 'insert':
             parameter1.questionid = this.util.ntz(this.questionid);
             
              this.http.post('Prgquestion/Postchoice', parameter1).then(
                 (resp:any) => {
                   this.getdata2();
                   this.alert.Showsuccess();
                   data.component.cancelEditData();
                 }
               );
               break;

           case 'remove':
              //  this.http.delete('Prgquestion/Deletechoice' + '/' + data.changes[0]['key'].choiceid +'/'+ data.changes[0]['key'].questionid ).then(
               this.http.delete('Prgquestion/Deletechoice' + '/' + data.changes[0]['key'].choiceid +'/'+ this.questionid ).then(

               (resp:any) => {
                 this.getdata2();
                 this.alert.Showsuccess();
               }
           );
            data.component.cancelEditData();
           break;
       }
   } 
  } 

  dataSave(data: any) {
    let parameter1: any;
   
  if (data.changes.length !== 0) {
   data.cancel = true;
       parameter1 = data.changes[0]['data'];
      // console.log(data.changes[0]['type'])
       switch (data.changes[0]['type']) {
           case 'update':
             parameter1.keyquestionid = data.changes[0]['key'].questionid;
             this.http.put('Prgquestion/Putquestion', parameter1).then(
             (resp:any) => {
               this.getdata1();
               this.alert.Showsuccess();
               data.component.cancelEditData();
             }
             );
             break;
  
           case 'insert':
              this.http.post('Prgquestion/Postquestion', parameter1).then(
                 (resp:any) => {
                   this.getdata1();
                   this.alert.Showsuccess();
                   data.component.cancelEditData();
                 }
               );
               break;
  
           case 'remove':
               this.http.delete('Prgquestion/Deletequestion' + '/' + data.changes[0]['key'].questionid).then(
               (resp:any) => {
                 this.getdata1();
                 this.alert.Showsuccess();
               }
           );
            data.component.cancelEditData();
           break;
       }
   } 
  } 

}