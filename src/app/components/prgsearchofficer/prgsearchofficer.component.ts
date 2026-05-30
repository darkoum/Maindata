import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { AccountService } from './../../services/account.service';
import { Encrypt } from './../../shareds/encrypt';
import notify from 'devextreme/ui/notify';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import { AlertService } from './../../services/alert.service';
import {UtilService} from '../../services/util.service';

@Component({
    standalone: false,
    selector: 'app-prgsearchofficer',
    templateUrl: './prgsearchofficer.component.html',
    styleUrls: ['./prgsearchofficer.component.css'],
})
export class PrgsearchofficerComponent implements OnInit {
    offlist: any;
    facid: number;
    camid: number = +sessionStorage.getItem('macampusid');
    proid: number;
    offcode: any;
    offname: any;
    offsurname: any;
    offtypecode: any;
    camshow: any;
    facshow: any = [];
    officertypeshow: any = [];
    preshow: any;
    depshow: any;
    officerstatusshow: any;
    svalue: string;
    camwhere: string;
    facwhere: string;
    offtypewhere: string;

    constructor(private data: HttpService, private encrypt: Encrypt,private alert: AlertService,private util: UtilService) {
        locale('th');
    }

    ngOnInit(): void {
        //this.getOff();
        this.getCam();
        this.getFac();
        this.getOfficertype();
        this.getPre();
        this.getDep();
        this.getOfficerstatus();
        // this.getFilteredDep = this.getFilteredDep.bind(this);
    }

    // getFilteredDep(options:any) {
    //     return {
    //         store: this.depshow,
    //         filter: options.data ? ['facultyid', '=', options.data.facultyid] : null,
    //     };
    // }

    getDep() {
        this.data.get('ComboDep/All').then(
            (response:any) => {
                //    console.log(response);
                this.depshow = response;
            }
        );
    }

    getOff() {
        this.data.get('Prgsearchofficer/All').then((resp:any) => {
            this.offlist = resp;
        });
    }

    getCam() {
        this.data.get('ComboCam/All').then((resp:any) => {
            this.camshow = resp;
        });
    }

    getFac() {
        this.data.get('ComboFac/All').then(
            (response:any) => {
                //   console.log(response);
                this.facshow = response;
            }
        );
    }

    getOfficertype() {
        this.data.get('ComboSysbyt/getSysbytedes' + '/' + 'OFFICER' + '/' + 'OFFICERTYPE').then((resp:any) => {
            this.officertypeshow = resp;
        });
    }

    getOfficerstatus() {
        this.data.get('ComboSysbyt/getSysbytedes' + '/' + 'OFFICER' + '/' + 'OFFICERSTATUS').then((resp:any) => {
            this.officerstatusshow = resp;
        });
    }

    getPre() {
        this.data.get('ComboPre/All').then(
            (response:any) => {
                this.preshow = response;
            }
        );
    }

    setdepid(rowData: any, value: any): void {
        rowData.departmentid = null;
        (<any>this).defaultSetCellValue(rowData, value);
    }

    onSearch() {
        let strwhere = '';
        let showstrwhere = '';
        let camidx = -9;
        let offcodex = 'null';
        let offnamex = 'null';
        let offsurnamex = 'null';
        let offtypecodex = -9;
        let facidx = -9;

        // if (this.camid > 0 && this.camid != null) {
        //     if (showstrwhere.length > 0) {

        //         showstrwhere = showstrwhere + ', ';
        //     }

        //     camidx = this.camid;
        //     showstrwhere = showstrwhere + this.camwhere;
        // }

        if (this.offcode !== '' && this.offcode != null) {
            if (this.offcode !== undefined) {
                if (showstrwhere.length > 0) {

                    showstrwhere = showstrwhere + ', ';
                }

                offcodex =  this.offcode;
                showstrwhere = showstrwhere + 'รหัส ' + this.offcode;
            }
        }

        if (this.offname !== '' && this.offname != null) {
            if (this.offname !== undefined) {
                if (showstrwhere.length > 0) {

                    showstrwhere = showstrwhere + ', ';
                }

                offnamex = this.offname;
                showstrwhere = showstrwhere + 'ชื่อ ' + this.offname;
            }
        }

        if (this.offsurname !== '' && this.offsurname != null) {
            if (this.offsurname !== undefined) {
                if (showstrwhere.length > 0) {

                    showstrwhere = showstrwhere + ', ';
                }

                offsurnamex = this.offsurname;
                showstrwhere = showstrwhere + 'สกุล ' + this.offsurname;
            }
        }

        if (this.offtypecode > 0 && this.offtypecode != null) {
            if (showstrwhere.length > 0) {

                showstrwhere = showstrwhere + ', ';
            }

            offtypecodex = this.offtypecode;
            showstrwhere = showstrwhere + this.offtypewhere;
        }

        if (this.facid > 0 && this.facid != null) {
            if (showstrwhere.length > 0) {

                showstrwhere = showstrwhere + ', ';
            }

            facidx = this.facid;
            showstrwhere = showstrwhere + this.facwhere;
        }

        //if (strwhere !== '') {
            // this.data.get('Prgsearchofficer/Getoffbysearch/' + this.util.ntz(this.camid) + '/' + this.util.ntb(this.offcode) + '/'+ this.util.ntb(this.offname) + '/'+ this.util.ntb(this.offsurname) + '/'+ this.util.ntz(this.offtypecode) + '/'+ this.util.ntz(this.facid)).then((resp) => {
            this.data.get('Prgsearchofficer/Getoffbysearch' + '/' + this.util.ntb(this.offcode) + '/'+ this.util.ntb(this.offname) + '/'+ this.util.ntb(this.offsurname) + '/'+ this.util.ntz(this.offtypecode) + '/'+ this.util.ntz(this.facid)).then((resp) => {
                if (resp.length !== 0) {
                    this.offlist = resp;
                } else {
                    this.Showerror('ไม่พบข้อมูล', 'warning');
                    this.offlist = [];
                }
            });

            this.svalue = showstrwhere;
        //} else {
         //   this.Showerror('กรุณากรอกข้อมูล', 'warning');
        //}
    }

    Showerror(message:any, type:any) {
        let option = {
            message: message,
        };
        notify(option, type, 5000);
    }

    selectionChanged(data:any) {
        //console.log(data.selectedRowKeys[0].campusid);
        //   if (!this.editmodeopen) {
        //       this.tmpcampusid = data.selectedRowKeys[0].campusid;
        //   } else {
        //       alert('คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข');
        //   }
    }

    getShowstrwhere(e:any) {
        if (typeof e.itemData.campusshow != 'undefined') {
            // alert(e.itemData.campusshow || e.itemData);
            this.camwhere = 'วิทยาเขต=' + e.itemData.campusshow || e.itemData;
        }

        if (typeof e.itemData.bytedesshow != 'undefined') {
            this.offtypewhere = 'ประเภท=' + e.itemData.bytedesshow || e.itemData;
        }

        if (typeof e.itemData.facultyshow != 'undefined') {
            this.facwhere = 'สังกัด=' + e.itemData.facultyshow || e.itemData;
        }
    }
}
