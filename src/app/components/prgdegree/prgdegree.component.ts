import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../services/alert.service';

@Component({
    standalone: false,
  selector: 'app-prgdegree',
  templateUrl: './prgdegree.component.html',
  styleUrls: ['./prgdegree.component.css']
})
export class PrgdegreeComponent implements OnInit {

  degreelist : any[] = []; 
  degreelevel : any[] = [];
  editmodeopen: boolean = false;

  statusflaglist = [{comboid: "Y", comboshow: "Y : ใช้งาน"},{comboid: "N", comboshow: "N : ไม่ใช้งาน"}];

  constructor(private data : HttpService ,private alert: AlertService) { }

  ngOnInit(): void {
    this.getDeg();
    this.getdegreelevel(); 

    //this.data.getcombo('ComboSysbyt/getSysbytedes/DEGREE/STATUSFLAG').then((resp: any) => this.statusflaglist = resp);
  }

  getDeg(){
    this.data.get('Prgdegree/All').then(
      (resp: any) => {
        this.degreelist = resp;
    });
  }

  getdegreelevel() {
    this.data.getcombo('ComboSysbyt/getSysbytedesnum/DEGREE/DEGREELEVEL').then(
      (resp: any) => {
        this.degreelevel = resp;
    });
   
  }

  getDefault(e:any) {
    e.data.statusflag = 'Y';
    if (sessionStorage.getItem('editmodeopen') == 'false') {
      sessionStorage.setItem('editmodeopen', 'true');
    } else {
        //this.alert.Warning(1);
        e.cancel = true;
    }
  }
  
  dataSave(data: any) {
    //this.editmodeopen = false;
    let parameter: any;
    
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]['data'];
    
      switch (data.changes[0]['type']) {
        case 'update':
          parameter.keydegreeid = data.changes[0]['key'].degreeid;
          this.data.put('Prgdegree/Put', parameter).then(
            (resp :any) => {
              this.getDeg();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }
          );

          break;

        case "insert":
          this.data.post('Prgdegree/Post', parameter)
            .then((resp :any) => {
              this.getDeg();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }
        );
          break;

        case "remove":
            this.data.delete('Prgdegree/Delete/' +  data.changes[0]['key'].degreeid).then(
                (resp :any) => {
                   this.getDeg();
                   this.alert.Showsuccess();
                }
            );
            data.component.cancelEditData();
            break;       
      }
    }
  }

  getdegreeid(data: any): string {
    return data?.degreeid?.toString();
  }

}
