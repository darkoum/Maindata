import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Encrypt } from 'src/app/shareds/encrypt';
import {UtilService} from '../../services/util.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
  selector: 'app-prgdivisioncode',
  templateUrl: './prgdivisioncode.component.html',
  styleUrls: ['./prgdivisioncode.component.css']
})
export class PrgdivisioncodeComponent implements OnInit {
  editmodeopen: boolean = false ;
  divisioncodelist :any;  
  flagweb = [
    { key: 'Y', value: 'Y: แสดง' },
    { key: 'N', value: 'N: ไม่แสดง' },
];
  constructor(private data : HttpService , private encrypt : Encrypt,private util :UtilService,private alert:AlertService) { }

  ngOnInit(): void {
    this.divisioncodelist=[];
    this.getDivision();
  }
  
 getDivision(){
  this.data.get("Prgdivisioncode/All").then((resp :any)=>{this.divisioncodelist = resp;});
}

DivisioncodeSave(data :any){
    let parameter: any;
    
  if (data.changes.length != 0) {
    data.cancel = true;
    parameter=data.changes[0]["data"]

    switch(data.changes[0]["type"]){
      
      case 'update':
            parameter.keydivisioncode = data.changes[0]['key'].divisioncode;
            this.data.put('Prgdivisioncode/Put', parameter).then(
                (resp :any) => {
                    this.getDivision();
                    this.alert.Showsuccess();
                    data.component.cancelEditData();
                }
            );
            break;

      case 'insert':
              
              this.data.post('Prgdivisioncode/Post', parameter).then(
                    (resp :any) => {
                        this.getDivision();
                        this.alert.Showsuccess();
                        data.component.cancelEditData();
                    }
            );
            break;

      case 'remove':
              this.data.delete('Prgdivisioncode/Delete/' + data.changes[0]['key'].divisioncode).then(
                  (resp :any) => {
                      this.getDivision();
                      this.alert.Showsuccess();
                  }
              );
              data.component.cancelEditData();
              break;
      
     }
  }
}
onToolbarPreparing(e :any){
  e.toolbarOptions.items[0].showText = 'always';
  e.toolbarOptions.items.unshift({
    location: 'before',
    template: 'tableName'
  });
}
onInsertingstart(e :any){

  if (sessionStorage.getItem('editmodeopen') == 'false') {
    sessionStorage.setItem('editmodeopen', 'true');
  }else{
       e.cancel = true 
  }
 }
}
