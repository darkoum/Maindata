import { AlertService } from './../../services/alert.service';
import { HttpService } from './../../services/http.service';
import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Encrypt } from './../../shareds/encrypt';
import notify from 'devextreme/ui/notify';
import { ViewChild } from "@angular/core";
import { DxDataGridModule, DxDataGridComponent } from "devextreme-angular";
@Component({
    standalone: false,
    selector: 'app-prgfaculty',
    templateUrl: './prgfaculty.component.html',
    styleUrls: ['./prgfaculty.component.css'],
})
export class PrgfacultyComponent implements OnInit {
    facultylist: any = [];
    departmentlist: any = [];
    departmentsubofflist: any =[];
    departmentsublist:any = [];
    tmpfacultyid: number = null;
    tmpdepartmentid: number = null;
    tmpsequence: number = null;
    popupVisible = false;
    notification: any;
    facultytype: any;
    positionid: any;
    officerid: any;
    editmodeopen: boolean = false;
    editmodeopen2: boolean = false;
    editmodeopen3: boolean = false;
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

    statusflaglist = [{comboid: "Y", comboshow: "Y : ใช้งาน"},{comboid: "N", comboshow: "N : ไม่ใช้งาน"}];

    constructor(private data: HttpService, private encrypt: Encrypt, private alert: AlertService) {}

    ngOnInit(): void {
        this.getFac();
        //this.getFacType();
        this.data.get('ComboSysbyt/getSysbytedes/FACULTY/FACULTYTYPE').then((resp: any)=>{ this.facultytype = resp; }); 
        this.data.get('ComboSysbyt/getSysbytedes/DEGREEOFFICER/POSITIONID').then((resp: any)=>{ this.positionid = resp; }); 
        this.data.get('Combooff/All/').then((resp: any)=>{ this.officerid = resp; }); 
        // .toPromise()
    }

    getDep(facultyid: number) {
        this.data.get('Prgfaculty/Getdepbyfac' + '/' + facultyid).then((resp: any) => {this.departmentlist = resp;});
    }

    // getDepsub(facultyid: number ,departmentid: number) {
    //     this.data.get('Depsub/Getdepbyfac' + '/' + facultyid+'/'+ departmentid).then(
    //         (resp: any) => {
    //             this.departmentsublist = resp;
    //         }
    //     );
    // }

    getoffbyDep(facultyid: number ,departmentid: number) {
        this.data.get('Prgfaculty/Getoffbydep' + '/' + facultyid+'/'+ departmentid).then(
            (resp: any) => {
                this.departmentsubofflist = resp;
            }
        );
    }

    getFac() {
        this.data.get('Prgfaculty/All').then((resp: any) => {this.facultylist = resp;});
    }


    getDefault(e:any) {
       e.data.statusflag = 'Y';
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            e.data.facultytype = 'F';
          //  e.data.ftesbase= 18;
            sessionStorage.setItem('editmodeopen', 'true');
          }
        else{
        
            e.cancel = true;   
          }   
  }
    
   getDefaultdep(e:any) {
       e.data.statusflag = 'Y';
        if (sessionStorage.getItem('editmodeopen') == 'false') {
         
            sessionStorage.setItem('editmodeopen', 'true');
          
          }
        else{
          
            e.cancel = true; 
          }   
   }
    getDefaultdepsub(e:any) {
       
        if (sessionStorage.getItem('editmodeopen') == 'false') {
         
            sessionStorage.setItem('editmodeopen', 'true');
          
          }
        else{
          
            e.cancel = true;              
          }   
       
    }
  
    facSave(data: any) {
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];

            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyfacultyid = data.changes[0]['key'].facultyid;
                    this.data.put('Prgfaculty/Put', parameter).then(
                        (resp: any) => {
                            this.getFac();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    this.data.post('Prgfaculty/Post', parameter).then(
                        (resp: any) => {
                           
                            this.getFac();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    
                    this.data.delete('Prgfaculty/Delete' + '/' + data.changes[0]['key'].facultyid).then(
                        (resp: any) => {
                            this.getFac();
                            this.alert.Showsuccess();
                           
                        }
                    );
                    data.component.cancelEditData();
                    break;
            }
        }
    }

    selectionChanged(data: any) {

        if (sessionStorage.getItem('editmodeopen') == 'false') {
            if(data.currentSelectedRowKeys.length > 0){
                this.tmpfacultyid = data.selectedRowKeys[0].facultyid;
                this.tmpdepartmentid = null;
                this.getDep(data.selectedRowKeys[0].facultyid);
                this.departmentsublist =[];
            }else{
                this.tmpfacultyid = null;
            }  
        }else{

        }
    }
    deselectRows (keys:any) {
        this.dataGrid.instance.deselectRows(keys);
    }
  
    selectionChanged2(data: any) {

        if (sessionStorage.getItem('editmodeopen') == 'false') {
 
           this.tmpfacultyid = data.selectedRowKeys[0]?.facultyid;
            this.tmpdepartmentid = data.selectedRowKeys[0]?.departmentid;
            this.getoffbyDep(this.tmpfacultyid, this.tmpdepartmentid);
           
        } else {
          
        }
    }
    
    depSave(data: any) {
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];

            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyfacultyid = data.changes[0]['key'].facultyid;
                    parameter.keydepartmentid = data.changes[0]['key'].departmentid;

                    this.data.put('Prgfaculty/Putdep', parameter).then(
                        (resp: any) => {
                            this.getDep(data.changes[0]['key'].facultyid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'insert':
                    parameter.facultyid = this.tmpfacultyid;
                    this.data.post('Prgfaculty/Postdep', parameter).then(
                        (resp: any) => {
                            this.alert.Showsuccess();
                            this.getDep(this.tmpfacultyid);
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data
                        .delete('Prgfaculty/Deletedep' + '/' + data.changes[0]['key'].facultyid +  '/' +  data.changes[0]['key'].departmentid )
                        .then(
                            (resp: any) => {
                                this.getDep(this.tmpfacultyid);
                                this.alert.Showsuccess();                                
                            }
                        );
                    data.component.cancelEditData();    
                    break;
            }
        }
    }

    // depsubSave(data: any) {
    //     let parameter: any;
        
    //     if (data.changes.length !== 0) {
    //         data.cancel = true;
    //         parameter = data.changes[0]['data'];

    //         switch (data.changes[0]['type']) {
    //             case 'update':
    //                 parameter.keyfacultyid = data.changes[0]['key'].facultyid;
    //                 parameter.keydepartmentid = data.changes[0]['key'].departmentid;
    //                 parameter.keydepartmentsubid = data.changes[0]['key'].departmentsubid;

    //                 this.data.put('Depsub/Put', parameter).then(
    //                     (resp: any) => {
    //                         this.getDepsub(this.tmpfacultyid,this.tmpdepartmentid);
    //                         this.alert.Showsuccess();
    //                         data.component.cancelEditData();
    //                     }
    //                 );
    //                 break;

    //             case 'insert':
    //                 parameter.facultyid = this.tmpfacultyid;
    //                 parameter.departmentid = this.tmpdepartmentid;
    //                 this.data.post('Depsub/Post', parameter).then(
    //                     (resp: any) => {
    //                         this.alert.Showsuccess();
    //                         this.getDepsub(this.tmpfacultyid,this.tmpdepartmentid);
    //                         data.component.cancelEditData();
    //                     }
    //                 );
    //                 break;

    //             case 'remove':
    //                 this.data
    //                     .delete('Depsub/Delete' + '/' + data.changes[0]['key'].facultyid +  '/' +  data.changes[0]['key'].departmentid +  '/' +  data.changes[0]['key'].departmentsubid )
    //                     .then(
    //                         (resp: any) => {
    //                             this.getDepsub(this.tmpfacultyid,this.tmpdepartmentid);
    //                             this.alert.Showsuccess();                                
    //                         }
    //                     );
    //                 data.component.cancelEditData();    
    //                 break;
    //         }
    //     }
    // }

    depsuboffSave(data: any) {
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];

            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyfacultyid = data.changes[0]['key'].facultyid;
                    parameter.keydepartmentid = data.changes[0]['key'].departmentid;
                    parameter.keysequence = data.changes[0]['key'].sequence;

                    this.data.put('Prgfaculty/Putoffbydep', parameter).then(
                        (resp: any) => {
                            this.getoffbyDep(this.tmpfacultyid,this.tmpdepartmentid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'insert':
                    parameter.facultyid = this.tmpfacultyid;
                    parameter.departmentid = this.tmpdepartmentid;
                  //  parameter.sequence = this.tmpsequence;
                    this.data.post('Prgfaculty/Postoffbydep', parameter).then(
                        (resp: any) => {
                            this.alert.Showsuccess();
                            this.getoffbyDep(this.tmpfacultyid,this.tmpdepartmentid);
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data
                        .delete('Prgfaculty/Deleteoffbydep'  +  '/' +  data.changes[0]['key'].facultyid +  '/' +  data.changes[0]['key'].departmentid +  '/' +  data.changes[0]['key'].sequence )
                        .then(
                            (resp: any) => {
                                this.getoffbyDep(this.tmpfacultyid,this.tmpdepartmentid);
                                this.alert.Showsuccess();                                
                            }
                        );
                    data.component.cancelEditData();    
                    break;
            }
        }
    }

    onToolbarPreparing2(e: any) {
      
        e.toolbarOptions.items[0].showText = 'always';
        var toolbarItems = e.toolbarOptions.items;
        if (this.tmpfacultyid == null && this.tmpfacultyid == undefined) {
            $.each(toolbarItems, function (_, item) {
                if (item.name === 'addRowButton') {
                    item.options.onClick = function (args: any) {

                        alert('คุณยังไมได้ระบุข้อมูลวิทยาลัย/คณะ/สถาบัน');
                    };
                }
            });
        }

        e.toolbarOptions.items.unshift({
            location: 'before',
            template: 'heddershow',
        });
    }
    onToolbarPreparing3(e: any) {
          e.toolbarOptions.items[0].showText = 'always';
          var toolbarItems = e.toolbarOptions.items;
          if (this.tmpdepartmentid == null && this.tmpdepartmentid == undefined) {
              $.each(toolbarItems, function (_, item) {
                  if (item.name === 'addRowButton') {
                      item.options.onClick = function (args: any) {
  
                          alert('คุณยังไมได้ระบุข้อมูลภาค/สาขา');
                      };
                  }
              });
          }
          e.toolbarOptions.items.unshift({
            location: 'before',
            template: 'heddershow',
        });
  
        
      }
   
}
