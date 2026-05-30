import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import notify from 'devextreme/ui/notify';
import { AlertService } from 'src/app/services/alert.service';
import { UtilService } from "src/app/services/util.service";

@Component({
    standalone: false,
    selector: 'app-prgacad',
    templateUrl: './prgacad.component.html',
    styleUrls: ['./prgacad.component.css'],
})
export class PrgacadComponent implements OnInit {
    acadlist: any;
    grademodelist: any;
    acadconlist: any;

    tmpacadid: any;
    popupVisible = false;
    load = false;
    notification: any;
    gradepro: any;
    grademode: any;
    grademodeforce:any;
    acadprolist: any;
    studentyeartype: any;
    editmodeopen: boolean = false;
    tabcurrent: number = 0;
    acadlistcombo;
    acadidfrom;


    flag = [
        { key: 'Y', value: 'ได้รับ' },
        { key: 'N', value: 'ไม่ได้รับ' },
    ];
    flagyn = [
        { key: 'Y', value: 'YES' },
        { key: 'N', value: 'NO' },
    ];
    constructor(private data: HttpService, private alert: AlertService,private util: UtilService) {}

    ngOnInit(): void {
        this.getAcad();
       // this.getStudentyeartypebyte();
       // this.getGrademodebyte();
     //   this.getGradeprobyte();
        this.data.getcombo('ComboSysbyt/getSysbytedes/ACAD/STUDENTYEARTYPE').then((resp: any)=>{ this.studentyeartype = resp; }); 
        this.data.getcombo('ComboSysbyt/getSysbytedes/GRADECONFIG/GRADEMODE').then((resp: any)=>{ this.grademode = resp; }); 
        this.data.getcombo('Prgacad/GetSysbytedesUnion/GRADECONFIG/GRADEMODE').then((resp: any)=>{ 
            this.grademodeforce = resp; 
        }); 
        this.data.getcombo('ComboSysbyt/getSysbytedes/STUDENTSTATUS/GRADEPRO').then((resp: any)=>{ this.gradepro = resp; }); 
        this.data.getcombo('ComboAca/All').then((resp: any)=>{ this.acadlistcombo = resp; }); 
    }


    getDefault(e :any) {
       
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
          }
        else{
          
            e.cancel = true;
        }  
    }
   
    getDefaultsubgrademode(e :any) {

        e.data.grademode= 'GD';
        e.data.creditsatisfyflag= 'Y';
        e.data.restudyallow= 'Y';
        e.data.accumulateflag= 'Y';
        e.data.accumulatesemflag= 'Y';
        e.data.passstatus= 'Y';
       
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
          }
        else{
          
            e.cancel = true;
        }     
    }

    getDefaultsubacadcon(e :any) {
       
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
          }
        else{
          
            e.cancel = true;
        }       
    }

    getDefaultsubAcadpro(e :any) {
       
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
          }
        else{
          
            e.cancel = true;
        }   
    }

    getGrademode(acadid: number) {
        this.data.get('Prgacad/Getgraconbyid/' + acadid).then(
            (resp: any) => {
                this.grademodelist = resp;
            }
        );
    }

    getAcacon(acadid: number) {
        this.data.get('Prgacad/Getacadconfigbyid/' + acadid).then(
            (resp: any) => {
                this.acadconlist = resp;
            }
        );
    }

    getAcapro(acadid: number) {
        this.data.get('Prgacad/Getacadproconfigbyid/' + acadid).then(
            (resp: any) => {
                this.acadprolist = resp;               
            }
        );
    }

    getAcad() {
        this.data.get('Prgacad/All').then(
            (resp: any) => {
                this.acadlist = resp;
            }
        );
    }

    acadSave(data: any) {
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];

            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyacadid = data.changes[0]['key'].acadid;

                    this.data.put('Prgacad/Acadput', parameter).then(
                        (resp: any) => {
                            this.getAcad();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    this.data.post('Prgacad/Acadpost', parameter).then(
                        (resp: any) => {
                            this.getAcad();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data.delete('Prgacad/Acaddelete/' + data.changes[0]['key'].acadid).then(
                        (resp: any) => {
                            this.getAcad();
                            this.alert.Showsuccess();                           
                        }
                    );
                    data.component.cancelEditData();
                    break;
            }
        } else {
            this.editmodeopen = false;
        }
    }

    selectionChanged(data: any) {
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            this.tmpacadid = data.selectedRowKeys[0]?.acadid;

            switch (this.tabcurrent) {
                case 0:
                    if (this.tmpacadid) {
                        this.getGrademode(data.selectedRowKeys[0].acadid);
                    }
                    break;

                case 1:
                    if (this.tmpacadid) {
                        this.getAcacon(data.selectedRowKeys[0].acadid);
                    }
                    break;

                case 2:
                    if (this.tmpacadid) {
                        this.getAcapro(data.selectedRowKeys[0].acadid);
                    }
                    break;
            }
        } else {
        }
    }

    GrademodeSave(data: any) {
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];

            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyacadid = this.tmpacadid;
                    parameter.keygrade = data.changes[0]['key'].grade;

                    this.data.put('Prgacad/Gradeconfigput', parameter).then(
                        (resp: any) => {
                            this.getGrademode(this.tmpacadid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    parameter.acadid = this.tmpacadid;

                    this.data.post('Prgacad/Gradeconfigpost', parameter).then(
                        (resp: any) => {
                            this.getGrademode(this.tmpacadid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data
                        .delete('Prgacad/Gradeconfigdelete/' + this.tmpacadid + '/' + (data.changes[0]['key'].grade.replace("+","PLUS")))
                        .then(
                            (resp: any) => {
                                this.getGrademode(this.tmpacadid);
                                this.alert.Showsuccess();                              
                            }
                        );
                        data.component.cancelEditData();
                    break;
            }
        } 
    }

    AcadconSave(data: any) {
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];

            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyacadid = this.tmpacadid;
                    parameter.keyconfigcode = data.changes[0]['key'].configcode;

                    this.data.put('Prgacad/acadconfigput', parameter).then(
                        (resp: any) => {
                            this.getAcacon(this.tmpacadid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    parameter.acadid = this.tmpacadid;

                    this.data.post('Prgacad/acadconfigpost', parameter).then(
                        (resp: any) => {
                            this.getAcacon(this.tmpacadid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data
                        .delete('Prgacad/acadconfigdelete/' + this.tmpacadid + '/' +  data.changes[0]['key'].configcode)
                        .then(
                            (resp: any) => {
                                this.getAcacon(this.tmpacadid);
                                this.alert.Showsuccess();                               
                            }
                        );
                        data.component.cancelEditData();   
                    break;
            }
        } 
    }

    AcadproSave(data: any) {
        //
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];

            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyacadid = this.tmpacadid;
                    parameter.keygpa = data.changes[0]['key'].gpa;
                    parameter.keygradepro = data.changes[0]['key'].gradepro;
                    parameter.keysemestercount = data.changes[0]['key'].semestercount;

                    this.data.put('Prgacad/Acadproconfigput', parameter).then(
                        (resp: any) => {
                            this.getAcapro(this.tmpacadid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    parameter.acadid = this.tmpacadid;

                    this.data.post('Prgacad/Acadproconfigpost', parameter).then(
                        (resp: any) => {
                            this.getAcapro(this.tmpacadid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data.delete('Prgacad/Acadproconfigdelete/' +  this.tmpacadid + '/' +
                                data.changes[0]['key'].gpa + '/' + data.changes[0]['key'].gradepro + '/' +
                                data.changes[0]['key'].semestercount
                        )
                        .then(
                            (resp: any) => {
                                this.getAcapro(this.tmpacadid);
                                this.alert.Showsuccess();
                               
                            }
                        );
                        data.component.cancelEditData();    
                    break;
            }
        } 
    }

    selectTab(e: any) {
        if (e.name === 'selectedIndex') {
            switch (e.value) {
                case 0:
                    this.tabcurrent = 0;
                    if (this.tmpacadid) {
                        this.getGrademode(this.tmpacadid);
                    }

                    break;

                case 1:
                    this.tabcurrent = 1;
                    if (this.tmpacadid) {
                        this.getAcacon(this.tmpacadid);
                    }
                    break;

                case 2:
                    this.tabcurrent = 2;
                    if (this.tmpacadid) {
                        this.getAcapro(this.tmpacadid);
                    }
                    break;
            }
        }
    }

    onToolbarPreparing2(e: any) {
        var toolbarItems = e.toolbarOptions.items;
        if (this.tmpacadid == null && this.tmpacadid == undefined) {
            $.each(toolbarItems, function (_, item) {
                if (item.name === 'addRowButton') {
                    item.options.onClick = function (args: any) {
                        alert('กรุณาระบุข้อมูลการประเมินผล');
                    };
                }
            });
        }
    }
    onToolbarPreparing3(e: any) {
        var toolbarItems = e.toolbarOptions.items;
        if (this.tmpacadid == null && this.tmpacadid == undefined) {
            $.each(toolbarItems, function (_, item) {
                if (item.name === 'addRowButton') {
                    item.options.onClick = function (args: any) {
                        alert('กรุณาระบุข้อมูลการประเมินผล');
                    };
                }
            });
        }
    }
    onToolbarPreparing4(e: any) {
        var toolbarItems = e.toolbarOptions.items;
        if (this.tmpacadid == null && this.tmpacadid == undefined) {
            $.each(toolbarItems, function (_, item) {
                if (item.name === 'addRowButton') {
                    item.options.onClick = function (args: any) {
                        alert('กรุณาระบุข้อมูลการประเมินผล');
                    };
                }
            });
        }
    }

    oncopy(){
        this.popupVisible = true;
    }

    processcopy(){
        this.load = true;
        this.data.post('Prgacad/PostCopy', {acadidfrom: this.acadidfrom, acadidto: this.tmpacadid}).then(
            (resp: any) => {
                this.getGrademode(this.tmpacadid);
                this.getAcacon(this.tmpacadid);
                this.getAcapro(this.tmpacadid);
                this.alert.Showsuccess();
                this.popupVisible = false;
                this.load = false;
            }
        );
    }
}
