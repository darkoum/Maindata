import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../services/alert.service';

@Component({
    standalone: false,
  selector: 'app-prglevel',
  templateUrl: './prglevel.component.html',
  styleUrls: ['./prglevel.component.css']
})
export class PrglevelComponent implements OnInit {

  levelidlist :any[] = []; 
  divisioncodelist : any ;
  levelcodelist : any ;
  tmpLevelid : any;
  popupVisible = false;
  notification : any;
  levelstatus :any[] = []; 
  editmodeopen: boolean = false;

  statusflaglist = [{comboid: "Y", comboshow: "Y : ใช้งาน"},{comboid: "N", comboshow: "N : ไม่ใช้งาน"}];
  // levelgrouplist;
//   flagweb = [
//     { key: 'Y', value: 'Y: แสดง' },
//     { key: 'N', value: 'N: ไม่แสดง' },
// ];

  constructor(private data : HttpService , private alert: AlertService) { }

  ngOnInit(): void {
    this.getLev();
    this.getLec();
    this.getDiv();
   // this.getlevelstatus();
    // this.data.getcombo('ComboSysbyt/getSysbytedesnum/LEVELID/LEVELGROUP').then((resp: any) => this.levelgrouplist = resp);
  }


  getLev(){
    this.data.get("Prglevelid/All").then(
      
      (resp: any) => {
        this.levelidlist = resp;
    }
  );

  }

  getLec(){
    this.data.getcombo("ComboLevcod/All").then(
      (resp: any) => {
        this.levelcodelist = resp;
    }
  );
  }

  getDiv(){
    this.data.getcombo("ComboDiv/All").then(
      (resp: any) => {
        this.divisioncodelist = resp;
    }
  ); 
  
  }
  getlevelstatus() {
    this.data.getcombo('ComboSysbyt/getSysbytedes/CAMPUS/CAMPUSSTATUS').then(
      (resp: any) => {
        this.levelstatus = resp;
    }
);

}

  getDefault(e :any) {
       e.data.statusflag = 'Y';
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            e.data.ftesbase = 18
            sessionStorage.setItem('editmodeopen', 'true');
          }
        else{
             //this.alert.Warning(1);
             e.cancel = true;
          }

    }

  levSave(data:any){
    //this.editmodeopen = false;
    let parameter: any;
    
    if (data.changes.length != 0) {
      data.cancel = true;
      parameter = data.changes[0]['data'];
  
      switch (data.changes[0]['type']) {
        case 'update':
          parameter.keylevelid = data.changes[0]['key'].levelid;
            this.data.put('Prglevelid/Put', parameter).then(
            (resp :any) => {
              
              this.alert.Showsuccess();
              this.getLev();
              data.component.cancelEditData();
            }
          );
          break;

        case "insert" :

          this.data.post('Prglevelid/Post', parameter)
          .then((resp :any) => {
           
            this.alert.Showsuccess();
            this.getLev();
            data.component.cancelEditData();
          });

            break;

        case "remove" :

         this.data.delete('Prglevelid/Delete/' +  data.changes[0]['key'].levelid).then(
                (resp :any) => {
                   this.getLev();
                   this.alert.Showsuccess();
                }
            );
            data.component.cancelEditData();
            break;       

       }
    }
  }

}
