import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Encrypt } from 'src/app/shareds/encrypt';
import {AlertService} from 'src/app/services/alert.service';
@Component({
    standalone: false,
  selector: 'app-prgprefix',
  templateUrl: './prgprefix.component.html',
  styleUrls: ['./prgprefix.component.css']
})
export class PrgprefixComponent implements OnInit {
  prefixlist : any ;
  prefixtypelist : any ;
  editmodeopen: boolean = false ;
  sexlist =[
    {comboid: "M",comboshow:"M : ชาย"},
    {comboid: "F",comboshow:"F : หญิง"}
  ];
  constructor(private data : HttpService , private encrypt : Encrypt,private alert:AlertService) { 
    this.data.getcombo('ComboSysbyt/getSysbytedes/PREFIX/PREFIXTYPE').then((resp:any) => {this.prefixtypelist = resp;});
  }

  ngOnInit(): void {
    this.prefixlist=[];
    this.getPrefix();
  }
 getPrefix(){
  this.data.get("Prgprefix/All").then((resp:any)=>{
    this.prefixlist = resp;
  });
}
PrefixSave(data:any){
    let parameter: any;
    
  if (data.changes.length != 0) {
    data.cancel = true;
    parameter=data.changes[0]["data"]

    switch(data.changes[0]["type"]){
      case 'update':

            parameter.keyprefixid = data.changes[0]['key'].prefixid;
            this.data.put('Prgprefix/Put', parameter).then(
                (resp:any) => {
                    this.getPrefix();
                    this.alert.Showsuccess();
                    data.component.cancelEditData();
                }
            );
            break;

      case 'insert':
             
              this.data.post('Prgprefix/Post', parameter).then(
                    (resp:any) => {
                        this.getPrefix();
                        this.alert.Showsuccess();
                        data.component.cancelEditData();
                    }
            );
            break;

      case 'remove':
              this.data.delete('Prgprefix/Delete/' + data.changes[0]['key'].prefixid).then(
                  (resp:any) => {
                      this.getPrefix();
                      this.alert.Showsuccess();
                  });
                  data.component.cancelEditData();
              break;
      
     }
  }
}

onToolbarPreparing(e:any){
  e.toolbarOptions.items[0].showText = 'always';
  e.toolbarOptions.items.unshift({
    location: 'before',
    template: 'tableName'
  });
}
onInsertingstart(e:any){

  if (sessionStorage.getItem('editmodeopen') == 'false') {
    sessionStorage.setItem('editmodeopen', 'true');
     }
   else{
     //this.alert.Warning(1);
      //  alert("คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข")
        e.cancel = true 
    }
 }
}
