import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { HttpService } from 'src/app/services/http.service';
import { Encrypt } from 'src/app/shareds/encrypt';
import {UtilService} from '../../services/util.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
  selector: 'app-prgreligion',
  templateUrl: './prgreligion.component.html',
  styleUrls: ['./prgreligion.component.css']
})
export class PrgreligionComponent implements OnInit {

  religionlist : any;
  editmodeopen: boolean = false ;
  constructor(private data : HttpService , private encrypt : Encrypt,private util :UtilService,private alert:AlertService) { }

  ngOnInit(): void {
    this.religionlist=[];
    this.getReligion();
  }
  getReligion(){
    this.data.get("Prgreligion/All").then((resp:any)=>{this.religionlist = resp;});
  }

ReligionidSave(data:any){
    let parameter: any;
    
  if (data.changes.length != 0) {
    data.cancel = true;
    parameter=data.changes[0]["data"]

    switch(data.changes[0]["type"]){
      
        case 'update':
            parameter.keyreligionid = data.changes[0]['key'].religionid;
            this.data.put('Prgreligion/Put', parameter).then(
                (resp:any) => {
                    this.getReligion();
                    this.alert.Showsuccess();
                    data.component.cancelEditData();
                }
          );
        break;

        case 'insert':
          this.data.post('Prgreligion/Post', parameter).then(
                (resp:any) => {
                    this.getReligion();
                    this.alert.Showsuccess();
                    data.component.cancelEditData();
                }
          );
        break;

        case 'remove':
              this.data.delete('Prgreligion/Delete/' + data.changes[0]['key'].religionid).then(
                  (resp:any) => {
                      this.getReligion();
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

