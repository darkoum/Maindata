import { Encrypt } from './../../shareds/encrypt';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import {UtilService} from '../../services/util.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
  selector: 'app-prgprogramcode',
  templateUrl: './prgprogramcode.component.html',
  styleUrls: ['./prgprogramcode.component.css']
})
export class PrgprogramcodeComponent implements OnInit {
  
  programcodelits :any[] = []; 
  programstatuslist : any;
  focusedRowKey : any = 0;
  editmodeopen: boolean = false;
 
  constructor(private data : HttpService ,private alert:AlertService) { }
 
  ngOnInit(): void {
    this.getProgramcode();
    this.data.getcombo('ComboSysbyt/getSysbytedes/PROGRAMCODE/PROGRAMCODESTATUS').then((resp: any)=>{ this.programstatuslist = resp; }); 
    
  }

  getProgramcode(){
    this.data.get("Prgprogramcode/All").then((resp:any)=>{
      this.programcodelits = resp;
    })
  }

  getDefault(e:any){
   // e.data.facultytype = "F"
    if (sessionStorage.getItem('editmodeopen') == 'false') {
      sessionStorage.setItem('editmodeopen', 'true');
    }else{
      e.cancel = true;
    }
  
  }

  dataSave(data: any) {
    //this.editmodeopen = false;
    let parameter: any;
    data.cancel = true;
    if (data.changes.length !== 0) {
      parameter = data.changes[0]['data'];
      // console.log(data);
      switch (data.changes[0]['type']) {
        case 'update':
          parameter.keyprogramcode = data.changes[0]['key'].programcode;
         
          this.data.put('Prgprogramcode/Put', parameter).then(
            (resp:any) => {
              this.getProgramcode();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }
          );

          break;

        case "insert":
          this.data.post('Prgprogramcode/Post', parameter).then((resp:any) => {
              this.getProgramcode();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            });
          break;

        case "remove":
            this.data.delete('Prgprogramcode/Delete/' +  data.changes[0]['key'].programcode).then(
                (resp:any) => {
                    this.getProgramcode();
                    this.alert.Showsuccess();
                    
                }
            );
            data.component.cancelEditData();
            break;
      }
    }
  }
 
}
