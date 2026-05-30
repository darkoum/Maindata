import { AlertService } from 'src/app/services/alert.service';
import { UtilService } from './../../services/util.service';
import { Encrypt } from './../../shareds/encrypt';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import notify from 'devextreme/ui/notify';
import { filter } from 'rxjs/operators';


@Component({
    standalone: false,
    selector: 'app-prgstudentset',
    templateUrl: './prgstudentset.component.html',
    styleUrls: ['./prgstudentset.component.css'],
})
export class PrgstudentsetComponent implements OnInit {
    lvldata: any[] = [];
    facdata: any[] = [];
    degdata : any[] = [];
    camdata: any[] = [];

    studentsetlist: any[] = [];
    levelist: any;
    feegrouplist: any;
    acadlist: any;
    schedulegrouplist: any;
    feegroupid:any;
    acadid:any
    schedulegroupid:any
    studentsetstatus:any
    campuslist: any;
    officerlist: any;
    officerlist2: any;
    officerlist3: any;
    offNlist: any;
    statuslist: any;
    studentlist: any;
    studyperiodlist: any;
    programlist: any;
    programselectlist: any;
    programliststatus: any;

    programgralist: any;
    grouproomlist: any;
    focusedRowKey: any = 0;
    tmpStudentgroup: any;
    lvlid: number = +sessionStorage.getItem('malevelid');
    facid: number = +sessionStorage.getItem('mafacultyid');
    camid: number = +sessionStorage.getItem('macampusid');
    degid: number ;
    admitacadyear: number = +sessionStorage.getItem('maacadyear');
    admitsemester: number = +sessionStorage.getItem('masemester');
    autoNavigateToFocusedRow: any = true;
    rules: any;
    editmodeopen: boolean = false;
    tmpgroupyear: any;
    groupcode: any;

    popupVisible = false;
    popupVisible2 = false;
    campusidcopy: any;
    levelidcopy: any;
    facultyidcopy: any;
    admitaccopy: any;
    admitsemcopy: any;
    showstudyplanweblist: any;
    studentgroupabb: any;

    loadingVisible: boolean = false;
    disabled: boolean = false;
    disabledall: boolean = false;

    constructor(private data: HttpService, private encrypt: Encrypt, private util: UtilService, private alert: AlertService) {
        locale('th');
        this.rules = { 'X': /[02-9]/ };
    }

    ngOnInit(): void {

        this.data.getcombo("ComboLev/All").then(resp => { this.lvldata = resp; });
        this.data.getcombo("ComboCam/All").then(resp => { this.camdata = resp; });
        this.data.getcombo("ComboFac/All").then(resp => { this.facdata = resp; });
        this.data.getcombo("ComboDeg/All").then(resp => { this.degdata = resp; });
        this.data.getcombo("ComboFeegro/All").then(resp => { this.feegrouplist = resp; });
        this.data.getcombo("ComboAca/All").then(resp => { this.acadlist = resp; });
        this.data.getcombo("ComboSchgro/All").then(resp => { this.schedulegrouplist = resp; });
        this.data.getcombo("ComboOff/All").then(resp => { this.officerlist = resp; });
        this.data.getcombo("ComboOff/All").then(resp => { this.officerlist2 = resp; });
        //this.data.getcombo("ComboOff/Name").then(resp=>{this.officerlist3 = resp;});

        this.data.getcombo("ComboSysbyt/getSysbytedes/STUDENTSET/STUDENTSETSTATUS").then(resp => { this.statuslist = resp; });
        this.data.getcombo("ComboSysbyt/getSysbytedes/STUDENTSET/SHOWSTUDYPLANWEB").then(resp => { this.showstudyplanweblist = resp; });
        this.data.getcombo("ComboSysbyt/getSysbytedes/STUDENTSET/STUDYPERIOD").then(resp => { this.studyperiodlist = resp; });
        this.data.getcombo("ComboDiv/All").then(resp => { this.grouproomlist = resp; });

        this.getProgram();
        // this.getEditstatus();
        this.getFilteredGra = this.getFilteredGra.bind(this);

    }
    getFilteredGra(options: any) {

        return {
            store: this.programgralist,
            filter: options.data ? ['key1id', '=', options.data.programid] : null,
            paginate: true, pageSize: 10
        };
    }

    getProgram() {

        this.data.get("ComboPro/ProlvlCondition/M/" + this.util.ntz(this.facid) + "/" + this.util.ntz(this.lvlid)).then(
            (resp: any) => {
                this.programlist = resp;
                this.programselectlist = resp;
                //
                this.programliststatus = resp;
                this.programgralist = resp
                //
            });
        // this.data.get("ComboPro/ProlvlConditionstatus/C/" + this.util.ntz(this.facid) + "/" + this.util.ntz(this.lvlid)).then(resp => this.programliststatus = resp);
        // this.data.get("ComboPro/ProlvlCondition/M/" + this.util.ntz(this.facid) + "/" + this.util.ntz(this.lvlid)).then(resp => this.programgralist = resp);
        // this.data.get('Pro/Getprobylevel/M/' + this.util.ntz(this.facid) + '/' 
        //                                  + this.util.ntz(this.lvlid) 
        //                                 ).then(
        //     (response:any) => {
        //         this.programlist = response;
        //     }
        // );
    }
    onCellPrepared(e: any) {
        if (e.rowType === 'data' && e.column.command === 'edit') {
            const rowData = e.row.data;
            if (rowData.studentsetstatus !== '10' && !this.checkcanprocess()) {
                const deleteButton = e.cellElement.querySelector('.dx-link-delete');
                if (deleteButton) {
                    deleteButton.style.display = 'none';
                }
            }
        }
    }

    setgraproid(rowData: any, value: any): void {
        rowData.graduateprogramid = null;
        rowData.programid = value;
        (<any>this).defaultSetCellValue(rowData, value);
    }
    // getStudentset() {
    //     this.data.get('Prgstudentset').subscribe((resp: any) => {
    //         this.studentsetlist = resp;
    //     });
    // }

    getStudent(groupyear: any, studentgroup: any) {
        this.data.get('Prgstudentset/Getstudentlist/' + groupyear + '/' + studentgroup).then(
            (response: any) => {
                this.studentlist = response;
            }
        );
    }
    // setgraproid(rowData: any, value: any): void {
    //     // rowData.defaultgraduateprogramid = null;
    //     rowData.programid = value;
    //     (<any>this).defaultSetCellValue(rowData, value);
    // }

    onSearch() {
        let strwhere = '';
        this.loadingVisible = true;
        this.data.get('Prgstudentset/GetStudentset/' + this.util.ntz(this.camid) + '/'
            + this.util.ntz(this.facid) + '/'
            + this.util.ntz(this.lvlid) + '/'
            + this.util.ntz(this.degid) + '/'
            + this.util.ntb(this.studentgroupabb) + '/'
            + this.util.ntz(this.admitacadyear) + '/'
            + this.util.ntz(this.admitsemester)
        ).then((resp: any) => {
            this.studentsetlist = resp;
            //console.log(this.studentsetlist)
            this.studentlist = '';
            this.getProgram();
            this.loadingVisible = false;
        });
    }


    onInsertingstart(e: any) {
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            e.data.campusid = this.camid;
            e.data.admitacadyear = this.admitacadyear;
            e.data.admitsemester = this.admitsemester;
            e.data.groupyear =  this.admitacadyear.toString().substring(4,2) + this.admitsemester.toString();
            e.data.studentsetstatus = '10';

            e.data.feegroupid = this.feegrouplist.store[0].comboid;
            e.data.acadid = this.acadlist.store[0].comboid;
            e.data.schedulegroupid = this.schedulegrouplist.store[0].comboid;

            sessionStorage.setItem('editmodeopen', 'true');
        } else {
            e.cancel = true;
        }
    }
    onSave(data: any) {
        //this.editmodeopen = false;
        var tmpdate: any;
        let parameter: any;

        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];

            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keygroupyear = data.changes[0]['key'].groupyear;
                    parameter.keystudentgroup = data.changes[0]['key'].studentgroup;
                    this.data.put('Prgstudentset/Put', parameter).then(
                        (resp: any) => {
                            this.onSearch();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    // console.log(parameter);
                    this.data.post('Prgstudentset/Post', parameter).then(
                        (resp: any) => {
                            this.onSearch();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data.delete('Prgstudentset/Delete' + '/' + data.changes[0]['key'].groupyear + '/' + data.changes[0]['key'].studentgroup).then(
                        (resp: any) => {
                            this.alert.Showsuccess();
                            this.onSearch();
                            data.component.cancelEditData();
                        }
                    );
                    break;
            }
        }
    }



    selectionChanged(data: any) {
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            this.tmpStudentgroup = data.selectedRowKeys[0]?.studentgroup;
            this.tmpgroupyear = data.selectedRowKeys[0]?.groupyear;
            this.getStudent(this.tmpgroupyear, this.tmpStudentgroup);
        }
    }
    updateOfficer1(eventData: any, cellInfo: any) {
        // console.log(eventData.value + ' '+cellInfo.data)
        if (cellInfo.setValue) {
            cellInfo.setValue(eventData.value);
        }
    }
    onContentReadyHandler(e: any) {
        // Selects the first visible row
        // e.component.selectRowsByIndexes([0]);

    }
    updateprogram(eventData: any, cellInfo: any) {

        if (cellInfo.setValue) {
            cellInfo.setValue(eventData.value);
        }
    }
    showCopy() {
        this.campusidcopy = this.camid;
        this.levelidcopy = this.lvlid;
        this.facultyidcopy = this.facid;
        this.admitaccopy = this.admitacadyear - 1;
        this.admitsemcopy = this.admitsemester;
        this.popupVisible = true;
    }
    onCopy() {
        let param = {} as any;
        param = { 'campusid': this.camid, 'admitacadyear': this.admitacadyear, 'admitsemester': this.admitsemester };
        this.data.put('Prgstudentset/Putcopy/' + this.campusidcopy + '/' + this.levelidcopy + '/' + this.facultyidcopy + '/' + this.admitaccopy + '/' + this.admitsemcopy, param).then(
            (resp: any) => {
                this.popupVisible = false;

                this.onSearch();
                this.alert.Showsuccess();
            }
        );
    }

    updatedatafrom(eventData: any, cellInfo: any) {
        if (cellInfo.setValue) {
            cellInfo.setValue(eventData.value);
        }
    }

    onToolbarPreparing(e:any) {
        e.toolbarOptions.items[0].showText = "always";
                e.toolbarOptions.items.unshift({
            location: 'before',
            template: 'tableName'
        });
        e.toolbarOptions.items.unshift(
            {
                location: 'after',
                template: 'btnPasss',
            },
        );
    }

    checkcanprocess(){
        return  this.studentsetlist.some(function(item) {
            return item.canedit !== 0;
        });
    }
onEditorPreparing(e: any) {

    // ถ้าไม่ใช่งานทะเบียน ไม่ให้แก้ไข
    if (e.parentType === "dataRow" && e.dataField === "studentsetstatus") {
        if(e.row.data?.canedit == 0 ){
              e.editorOptions.disabled =  true ;
        }
    }
    
    if (e.parentType === "dataRow" && e.dataField === "acadid") {
        if(e.row.data?.canedit == 0 ){
              e.editorOptions.disabled =  true ;
        }
    }
    if (e.parentType === "dataRow" && e.dataField === "schedulegroupid") {
        if(e.row.data?.canedit == 0 ){
              e.editorOptions.disabled =  true ;
        }
    }
    if (e.parentType === "dataRow" && e.dataField === "feegroupid") {
        if(e.row.data?.canedit == 0 ){
              e.editorOptions.disabled =  true ;
        }
    }
    if (e.parentType === "dataRow" && e.dataField === "admitdate") {
        if(e.row.data?.canedit == 0 ){
              e.editorOptions.disabled =  true ;
        }
    }
    if (e.parentType === "dataRow" && e.dataField === "admitacadyear") {
        if(e.row.data?.canedit == 0 ){
            //   e.editorOptions.disabled =  true ;
                 this.disabled = true;
        }else{
                 this.disabled = false;
        }
    }

    // ถ้าไม่ใช่งานทะเบียน และ สถานะไม่ใช่จัดเตรียม ไม่ให้แก้ไข
    if(e.row?.data?.canedit == 0  && e.row?.data?.studentsetstatus !== '10'){
        if (e.row.rowType === "data") {
            e.editorOptions.disabled = true;
            this.disabledall = true;
        }
    }else{
        this.disabledall = false;
    }




    // if(e.data.canedit == 1){
    //             var grid = e.component;  
    //             var columns = grid.option("columns");  
    //             grid.beginUpdate();  
    //             columns.forEach(function(column) {  
    //                 grid.columnOption(column.dataField, "allowEditing", true);  
    //             });  
    //             grid.endUpdate();  
    // }else{
    //             var grid = e.component;  
    //             var columns = grid.option("columns");  
    //             grid.beginUpdate();  
    //             columns.forEach(function(column) {  
    //                 grid.columnOption(column.dataField, "allowEditing", false);  
    //             });  
    //             grid.endUpdate();  
    //             // this.isReadOnly = true
    // }

    

  }

  showProcess(){
    if(this.studentsetlist.length !== 0){
        // this.acadid = null
        // this.feegroupid = null
        // this.schedulegroupid = null
        this.popupVisible2 = true
    }else{
         this.alert.Showwarning( `ค้นหากลุ่มนักศึกษาก่อนทำการปรับข้อมูลเป็นชุด` );
    }
  }

  onProcess(){
    if(this.acadid || this.feegroupid || this.schedulegroupid || this.studentsetstatus){
         this.loadingVisible = true;
         let param = {} as any;
        param = { 'acadid': this.util.ntz(this.acadid), 'feegroupid': this.util.ntz(this.feegroupid), 'schedulegroupid': this.util.ntz(this.schedulegroupid) , studentsetstatus: this.util.ntb(this.studentsetstatus)};
        this.data.put('Prgstudentset/PutProcess/' + this.util.ntz(this.camid) + '/'
            + this.util.ntz(this.facid) + '/'
            + this.util.ntz(this.lvlid) + '/'
            + this.util.ntz(this.degid) + '/'
            + this.util.ntb(this.studentgroupabb) + '/'
            + this.util.ntz(this.admitacadyear) + '/'
            + this.util.ntz(this.admitsemester) ,param
        ).then((resp: any) => {
            this.alert.Showsuccess();
            this.onSearch()
            this.loadingVisible = false;
            this.popupVisible2 = false

        });
    }else{
         this.alert.Showwarning( `กรุณากรอกข้อมูล` );
    }

  }


  
}
