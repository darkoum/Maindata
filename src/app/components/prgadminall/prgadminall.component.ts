
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {AlertService} from '../../services/alert.service';

@Component({
    standalone: false,
  selector: 'app-prgadminall',
  templateUrl: './prgadminall.component.html',
  styleUrls: ['./prgadminall.component.css']
})
export class PrgadminallComponent implements OnInit {
  
  tabs : any;
  tabname : any;
  tabslist : any;
  tabtablename : any;
  tabcolumnname : any;
  constructor(private data : HttpService ,private alert:AlertService) { }

  ngOnInit(): void {
    this.tabs = this.getTabs();
    this.tabslist = [];
  }
  /*  config manual */
    getTabs(){
      return  [
        { tabsname: "คำนำหน้า",index : 0,type : 1},        
        { tabsname: "เชื้อชาติ",index : 1,type : 0 , tablename: "STUDENTBIO", columnname: "ORIGINID"},
        { tabsname: "สัญชาติ",index : 2,type : 1},
        { tabsname: "ศาสนา",index : 3,type : 1},
        { tabsname: "สถาบันเดิม",index : 4,type : 1},
        { tabsname: "ประเภทนักศึกษา",index : 5,type : 1},
        { tabsname: "ระดับที่จบ",index : 6,type : 1},
        { tabsname: "คุณวุฒิ",index : 7,type : 1},
        { tabsname: "ประเภทสาขา",index : 8,type : 1},
        { tabsname: "กลุ่มวิชา",index : 9,type : 0 ,tablename: "COURSE", columnname: "COURSEGROUP"},
        { tabsname: "ความพิการ",index : 10,type : 0 ,tablename: "STUDENTBIO", columnname: "DEFORMCODE"},
        { tabsname: "ประเภท Visa",index : 11,type : 0 ,tablename: "STUDENTBIO", columnname: "VISATYPE"},
        // { tabsname: "ประเทศ",index : 12,type : 0 ,tablename: "SCHOOL", columnname: "COUNTY"},
        { tabsname: "ประเทศ",index : 12,type : 1},
        { tabsname: "แพ้อาหารและยา",index : 13,type : 0 ,tablename: "STUDENTBIO", columnname: "FOODALLERGIES"},
      ];
    }

    onToolbarPreparing(e:any){
      e.toolbarOptions.items[0].showText = 'always';
      e.toolbarOptions.items.unshift({
        location: 'before',
        template: 'tableName'
      });
    }

    onSelectionChanged(data:any){
      //console.log(data);
      this.tabtablename = data.addedItems[0].tablename;
      this.tabcolumnname = data.addedItems[0].columnname;
      this.getTablist(this.tabtablename,this.tabcolumnname)
    }

    onInsertingstart(e:any){
    
      if (sessionStorage.getItem('editmodeopen') == 'false') {
          sessionStorage.setItem('editmodeopen', 'true');
      }else{
          e.cancel = true 
      }
    }

    getTablist(tbname :any,colname:any){
      this.data.get('Prgadminall/Getbytab/' + tbname + '/'+ colname).then(
        (response:any) => {
            this.tabslist = response;
        });
    }

    dataSave(data:any){
      let parameter: any;
      
      if (data.changes.length != 0) {
        data.cancel = true;
        parameter=data.changes[0]["data"];

        switch(data.changes[0]["type"]){
            case 'update':
              parameter.keytablename = this.tabtablename;
              parameter.keycolumnname = this.tabcolumnname;
              parameter.keybytecode = data.changes[0]['key'].bytecode;
              this.data.put('Prgadminall/Put', parameter).then(
                  (resp:any) => {
                      this.getTablist(this.tabtablename,this.tabcolumnname);
                      this.alert.Showsuccess();
                      data.component.cancelEditData();
                  }
              );
              break;

            case 'insert':
              parameter.tablename = this.tabtablename;
              parameter.columnname = this.tabcolumnname;
              this.data.post('Prgadminall/Post', parameter).then(
                    (resp:any) => {
                        this.getTablist(this.tabtablename,this.tabcolumnname);
                        this.alert.Showsuccess();
                        data.component.cancelEditData();
                    }
            );
            break;

            case 'remove':
              this.data.delete('Prgadminall/Delete/' + data.changes[0]['key'].tablename + '/' + data.changes[0]['key'].columnname + '/' + data.changes[0]['key'].bytecode).then(
                  (resp:any) => {
                      this.getTablist(this.tabtablename,this.tabcolumnname);
                      this.alert.Showsuccess();
                  }
            );
            data.component.cancelEditData();
            break;
        }
      }
    }

}
