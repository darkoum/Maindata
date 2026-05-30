import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
  selector: 'app-prgprogramgroup',
  templateUrl: './prgprogramgroup.component.html',
  styleUrls: ['./prgprogramgroup.component.css']
})
export class PrgprogramgroupComponent implements OnInit {
  editmodeopen: boolean = false ;
  programgrouplist :any;  
  
  constructor(private data : HttpService ,private alert:AlertService) { }

  ngOnInit(): void {
    this.programgrouplist=[];
    this.getProgramgroup();
  }
  
 getProgramgroup(){
  this.data.get("Prgprogramgroup/All").then((resp :any)=>{this.programgrouplist = resp;});
}

ProgramgroupSave(data :any){
    let parameter: any;
    
  if (data.changes.length != 0) {
    data.cancel = true;
    parameter=data.changes[0]["data"]

    switch(data.changes[0]["type"]){
      
      case 'update':
            parameter.keyprogramgroupcode = data.changes[0]['key'].programgroupcode;
            this.data.put('Prgprogramgroup/Put', parameter).then(
                (resp :any) => {
                    this.getProgramgroup();
                    this.alert.Showsuccess();
                    data.component.cancelEditData();
                }
            );
            break;

      case 'insert':
              
              this.data.post('Prgprogramgroup/Post', parameter).then(
                    (resp :any) => {
                        this.getProgramgroup();
                        this.alert.Showsuccess();
                        data.component.cancelEditData();
                    }
            );
            break;

      case 'remove':
              this.data.delete('Prgprogramgroup/Delete/' + data.changes[0]['key'].programgroupcode).then(
                  (resp :any) => {
                      this.getProgramgroup();
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
