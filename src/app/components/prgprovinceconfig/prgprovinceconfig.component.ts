import { Component, OnInit ,ViewChild} from '@angular/core';
import { HttpService } from './../../services/http.service';
import { DxDataGridComponent } from 'devextreme-angular';

import {UtilService} from '../../services/util.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
  selector: 'app-prgprovinceconfig',
  templateUrl: './prgprovinceconfig.component.html',
  styleUrls: ['./prgprovinceconfig.component.css']
})
export class PrgprovinceconfigComponent implements OnInit {

  provlist: any = [];
  tmpprovid: any;
  dislist: any = [];
  tmpdisid: any;
  subdislist: any = [];
  tmpsubdisid: any;
  showre: any;
  
  editmodeopen: boolean = false;
  editmodeopen2: boolean = false;
  editmodeopen3: boolean = false;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  constructor(private data: HttpService,  private util :UtilService,private alert:AlertService) {}

  ngOnInit(): void {
      this.getProv();     
      this.data.getcombo('ComboSysbyt/getSysbytedes/PROVINCE/REGION').then((resp: any)=>{ this.showre = resp; }); 
   
  }
  
  
getDefault(e :any) {
       
  if (sessionStorage.getItem('editmodeopen') == 'false') {
    sessionStorage.setItem('editmodeopen', 'true');
  }else{
    e.cancel = true;
  }   
}

getDefaultsubdis(e :any) {
       
  if (sessionStorage.getItem('editmodeopen') == 'false') {
    sessionStorage.setItem('editmodeopen', 'true');
  }else{
    e.cancel = true;
  }     
}

getDefaultsubsubdis(e :any) {
       
  if (sessionStorage.getItem('editmodeopen') == 'false') {
    sessionStorage.setItem('editmodeopen', 'true');
  }else{
    e.cancel = true;
  }       
}
   getProv() {
    this.data.get('Prgprovinceconfig/ProvAll').then((resp:any) => {
        this.provlist = resp;
    }
    );
}
 

getDis(provinceid: number) {
  this.data.get('Prgprovinceconfig/Getdisbyid/' + provinceid).then((resp:any) => {
      
      this.dislist = resp;
  }
  );
}

getSubdis(districtid: string) {
  this.data.get('Prgprovinceconfig/Getsubdisbydisid/' + districtid).then((resp:any) => {
    
      this.subdislist = resp;
  }
  );
}


provSave(data: any) {
    //this.editmodeopen = false;
    let parameter: any;
    
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]['data'];
      // console.log(data);
      switch (data.changes[0]['type']) {
        case 'update':
          parameter.keyprovinceid = data.changes[0]['key'].provinceid;
       
          this.data.put('Prgprovinceconfig/ProvPut', parameter).then(
            (resp:any) => {
              this.getProv();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }
          );

          break;

        case "insert":
          this.data.post('Prgprovinceconfig/ProvPost', parameter).then((resp:any) => {
              this.getProv();
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }
            );
          break;

        case "remove":
            this.data.delete('Prgprovinceconfig/ProvDelete/' +  data.changes[0]['key'].provinceid).then(
                (resp:any) => {
                    this.getProv();
                    this.alert.Showsuccess();                   
                }
            );
            data.component.cancelEditData();
            break;
      }
    }
  }

  disSave(data: any) {
    //this.editmodeopen2 = false;
    let parameter: any;
   
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]['data'];
      // console.log(data);
      switch (data.changes[0]['type']) {
        case 'update':
          parameter.keydistrictid = data.changes[0]['key'].districtid;
         
          this.data.put('Prgprovinceconfig/DisPut', parameter).then(
            (resp:any) => {
              this.getDis(this.tmpprovid);
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }              
            
          );

          break;

        case "insert":
         parameter.provinceid = this.tmpprovid;  
          this.data.post('Prgprovinceconfig/DisPost', parameter)
            .then((resp:any) => {
              this.getDis(this.tmpprovid);
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }
            );
          break;

        case "remove":
            this.data.delete('Prgprovinceconfig/DisDelete/' +  data.changes[0]['key'].districtid).then(
                (resp:any) => {
                    this.getDis(this.tmpprovid);
                    this.alert.Showsuccess();                    
                }

            );
            data.component.cancelEditData();
            break;
      }
    }
  }


subdisSave(data: any) {
   // this.editmodeopen3 = false;
    let parameter: any;
    
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]['data'];
      // console.log(data);
      switch (data.changes[0]['type']) {
        case 'update':

          parameter.keysub_districtid = data.changes[0]['key'].sub_districtid;
        
          this.data.put('Prgprovinceconfig/SubdisPut', parameter).then(
            (resp:any) => {
              this.getSubdis(this.tmpdisid);
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }
          );

          break;

        case "insert":
          parameter.provinceid = this.tmpprovid;
          parameter.districtid = this.tmpdisid;
          this.data.post('Prgprovinceconfig/SubdisPost', parameter)
            .then((resp:any) => {
              this.getSubdis(this.tmpdisid);
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }
            );
          break;

        case "remove":
            this.data.delete('Prgprovinceconfig/SubdisDelete/' + data.changes[0]['key'].sub_districtid).then(
                (resp:any) => {
                    this.getSubdis(this.tmpdisid);
                    this.alert.Showsuccess();                    
                }
            );
            data.component.cancelEditData();
            break;
      }
    }
  }


  selectionChanged(data:any) {
      //console.log(data.selectedRowKeys[0].roomusetypecode);
      if (sessionStorage.getItem('editmodeopen') == 'false') {
          this.tmpprovid = data.selectedRowKeys[0].provinceid;
          this.getDis(data.selectedRowKeys[0].provinceid);
          this.subdislist=[];
          this.refreshDataGrid();

         
      } //else {
        //this.alert.Warning(1);
      //}
  }
  disselectionChanged(data:any) {
    //console.log(data.selectedRowKeys[0].roomusetypecode);
    if (sessionStorage.getItem('editmodeopen') == 'false') {
        this.tmpdisid = data.selectedRowKeys[0].districtid;
        //this.dislist = this.getDis(data.selectedRowKeys[0].provinceid);
         this.getSubdis(data.selectedRowKeys[0].districtid);
       
    }// else {
      //this.alert.Warning(1);
    //}
}
subdisselectionChanged(data:any) {
  //console.log(data.selectedRowKeys[0].roomusetypecode);
  if (sessionStorage.getItem('editmodeopen') == 'false') {
      this.tmpsubdisid = data.selectedRowKeys[0].sub_districtid;
     // this.subdislist = this.getSubdis(data.changes[0]['key'].districtid);
     
  } //else {
   // this.alert.Warning(1);
  //}
}

refreshDataGrid() {
  this.dataGrid.instance.refresh();
}
onToolbarPreparingpro(e: any){
  e.toolbarOptions.items[0].showText = 'always';
  e.toolbarOptions.items.unshift({
    location: 'before',
    template: 'tableName'
  });
}
onToolbarPreparingdis(e: any){
  e.toolbarOptions.items[0].showText = 'always';
  var toolbarItems = e.toolbarOptions.items;  
  if (this.tmpprovid  == null && this.tmpprovid == undefined){

  $.each(toolbarItems, function (_, item) {  
      if (item.name === "addRowButton") {  
          item.options.onClick = function (args:any) {  
              
                alert('คุณยังไมได้ระบุข้อมูลจังหวัด');

                 
          };  
      }  
  });  }

  e.toolbarOptions.items.unshift({
    location: 'before',
    template: 'tableName'
  });
}
onToolbarPreparingsubdis(e: any){
  e.toolbarOptions.items[0].showText = 'always';
  var toolbarItems = e.toolbarOptions.items;  
  if (this.tmpdisid  == null && this.tmpdisid == undefined){
   $.each(toolbarItems, function (_, item) {  
      if (item.name === "addRowButton") {  
          item.options.onClick = function (args:any) {  
              
                alert('คุณยังไมได้ระบุข้อมูลอำเภอ');

                 
          };  
      }  
  });  }

  e.toolbarOptions.items.unshift({
    location: 'before',
    template: 'tableName'
  });
}
onContentReadyHandler (e:any) {
  // Selects the first visible row
 // e.component.selectRowsByIndexes([0]);

}
disonContentReadyHandler (e:any) {
  // Selects the first visible row
 // e.component.selectRowsByIndexes([0]);

}

}