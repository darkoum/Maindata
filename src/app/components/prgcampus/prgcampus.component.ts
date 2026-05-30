import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { AlertService } from './../../services/alert.service';

@Component({
    standalone: false,
    selector: 'app-prgcampus',
    templateUrl: './prgcampus.component.html',
    styleUrls: ['./prgcampus.component.css'],
})
export class PrgcampusComponent implements OnInit {
    lvlid: number;
    facid: number;
    admitacadyear: number;
    admitsemester: number;
    editmodeopen: boolean = false;
    rules: any;
    tmpcampus: any;
    campuslist: any[] = [];
    campusid: any;
    tmpcampusid: any;
    flagweb = [
      { key: 'Y', value: 'Y: แสดง' },
      { key: 'N', value: 'N: ไม่แสดง' },
  ];
   

    constructor(private data: HttpService, private alert: AlertService) {
      
    }

    ngOnInit(): void {
        this.getCam();
    }

    getCam() {
        this.data.get('Prgcampus/All').then(
            (resp: any) => {
                this.campuslist = resp;
            }
        );
    }

    getDefault(e :any) {
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
          }
        else{
            e.cancel = true;
          }
    }

    dataSave(data: any) {
         let parameter: any;
        
       if (data.changes.length !== 0) {
        data.cancel = true;
            parameter = data.changes[0]['data'];
          
            switch (data.changes[0]['type']) {
                case 'update':
                  parameter.keycampusid = data.changes[0]['key'].campusid;
                  this.data.put('Prgcampus/Put', parameter).then(
                  (resp:any) => {
                    this.getCam();
                    this.alert.Showsuccess();
                    data.component.cancelEditData();
                  }
                  );
                  break;

                case 'insert':
                   this.data.post('Prgcampus/Post', parameter).then(
                      (resp:any) => {
                        this.getCam();
                        this.alert.Showsuccess();
                        data.component.cancelEditData();
                      }
                    );
                    break;

                case 'remove':
                    this.data.delete('Prgcampus/Delete' + '/' + data.changes[0]['key'].campusid).then(
                    (resp:any) => {
                      this.getCam();
                      this.alert.Showsuccess();
                    }
                );
                 data.component.cancelEditData();
                break;
            }
        } 
    }
}
