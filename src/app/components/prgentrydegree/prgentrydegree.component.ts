import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Encrypt } from 'src/app/shareds/encrypt';
import {UtilService} from '../../services/util.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
  selector: 'app-prgentrydegree',
  templateUrl: './prgentrydegree.component.html',
  styleUrls: ['./prgentrydegree.component.css']
})
export class PrgentrydegreeComponent implements OnInit {
  editmodeopen: boolean = false ;
  entDegreelist :any;
  constructor(private data : HttpService , private encrypt : Encrypt,private util :UtilService,private alert:AlertService) { }

  ngOnInit(): void {
    this.entDegreelist=[];
    this.getEntrydegree();
}
getEntrydegree(){
  this.data.get("Prgentrydegree/All").then((resp:any)=>{this.entDegreelist = resp;});
}
dataSave(data :any){
    let parameter: any;
    
  if (data.changes.length != 0) {
    data.cancel = true;
    parameter=data.changes[0]["data"]
    switch(data.changes[0]["type"]){
      case 'update':
            parameter.keyentrydegreecode = data.changes[0]['key'].entrydegreecode;
            this.data.put('Prgentrydegree/Put', parameter).then(
                (resp:any) => {
                    this.getEntrydegree();
                    this.alert.Showsuccess();
                    data.component.cancelEditData();
                }
            );
            break;

      case 'insert':
              this.data.post('Prgentrydegree/Post', parameter).then(
                    (resp:any) => {
                        this.getEntrydegree();
                        this.alert.Showsuccess();
                        data.component.cancelEditData();
                    }
            );
            break;

      case 'remove':
              this.data.delete('Prgentrydegree/Delete/' + data.changes[0]['key'].entrydegreecode).then(
                  (resp:any) => {
                      this.getEntrydegree();
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

 sortString (rowData) {
        return parseInt(rowData.entrydegreecode);
    }
}
