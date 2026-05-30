import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
  selector: 'app-prglevelcode',
  templateUrl: './prglevelcode.component.html',
  styleUrls: ['./prglevelcode.component.css']
})
export class PrglevelcodeComponent implements OnInit {
  editmodeopen: boolean = false ;
  levelcodelist :any;
  
  constructor(private data : HttpService , private alert:AlertService) { }

  ngOnInit(): void {
    this.levelcodelist=[];
      this.getLevelcode();      
  }
  getLevelcode(){
    this.data.get("Prglevelcode/All").then((resp:any)=>{this.levelcodelist = resp;});
  }
  dataSave(data:any){
      let parameter: any;
     
    if (data.changes.length != 0) {
      data.cancel = true;
      parameter=data.changes[0]["data"]
  
      switch(data.changes[0]["type"]){
        
        case 'update':
              parameter.keylevelcode = data.changes[0]['key'].levelcode;
              this.data.put('Prglevelcode/Put', parameter).then(
                  (resp:any) => {
                      this.getLevelcode();
                      this.alert.Showsuccess();
                      data.component.cancelEditData();
                  }
              );
              break;
  
        case 'insert':
                this.data.post('Prglevelcode/Post', parameter).then(
                      (resp:any) => {
                          this.getLevelcode();
                          this.alert.Showsuccess();
                          data.component.cancelEditData();
                      }
              );
              break;
  
        case 'remove':
                this.data.delete('Prglevelcode/Delete/' + data.changes[0]['key'].levelcode).then(
                    (resp:any) => {
                        this.getLevelcode();
                        this.alert.Showsuccess();
                    }
                );
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
      }else{
          e.cancel = true 
      }
   }
}
