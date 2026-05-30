import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { locale} from 'devextreme/localization';
import { UtilService } from 'src/app/services/util.service';
import { AlertService } from './../../services/alert.service';

@Component({
    standalone: false,
    selector: 'app-prgprogram',
    templateUrl: './prgprogram.component.html',
    styleUrls: ['./prgprogram.component.css'],
})
export class PrgprogramComponent implements OnInit {
    prolist: any[] = [];
    protyp: any;
    prosta: any;
    propre: any;
    prover: any;
    proedi: any;
    levshow: any;
    facshow: any = [];
    combouocisec: any = [];
    degshow: any;
    depshow: any;
    showyn: any;
    procodshow: any;
    progroshow: any;
    loadingVisible: boolean = false;
    editmodeopen: boolean = false;
    facid: number = +sessionStorage.getItem('mafacultyid');
    depcombo :any;
    depid : number;
    programyear: number;
    programtype: any;
    programstatus: any;
    degchangeval: any = ""
    prochangeval: any = ""
    programtypelist = [
        { id: 'M', name: 'M : MAJOR' },
        { id: 'N', name: 'N : MINOR' },
        { id: 'X', name: 'N : ไม่ระบุ' },
    ];
    programstatuslist = [
        { id: 0, name: '0 : จัดเตรียม' },
        { id: 40, name: '40 : ใช้งาน' },
        { id: 50, name: '50 : เลิกใช้' },
    ];
    studyperiod:any;
    levid:any  = +sessionStorage.getItem('malevelid');
    yn = [
        { id: 'Y', name: 'Y : Yes' },
        { id: 'N', name: 'N : No' },
    ];
    popupVisible: boolean = false;
    old_program: Number = 0
    new_program: string = ''
    programlist: any[] = [];
    constructor(private data: HttpService,private util: UtilService,private alert: AlertService) {
        locale('th');
    }

    ngOnInit(): void {
        this.getProtyp();
        this.getProsta();
        this.getProver();
        this.getLev();
        this.getFac();
        this.getDeg();
        this.getDep();
        this.getProcod();
        this.getProgro();
        this.getShowyn();
        this.getUocisec();
        this.getProgram()
        this.getStudyperiod();''
        this.getFilteredDep = this.getFilteredDep.bind(this);
        this.degchange = this.degchange.bind(this);
        this.prochange = this.prochange.bind(this);
    }
    getFilteredDep(options:any) {
        return {
            store: this.depshow,
            filter: options.data ? ['key1id', '=', options.data.facultyid] : null,
            
        };
    }

    setdepid(rowData: any, value: any): void {
        rowData.departmentid = null;
        (<any>this).defaultSetCellValue(rowData, value);
    }
   
    getProtyp() {
        this.data.get('ComboSysbyt/getSysbytedes' + '/' + 'PROGRAM' + '/' + 'PROGRAMTYPE').then((resp:any) => {
            this.protyp = resp;
        });
    }
    getProsta() {
        this.data.get('ComboSysbyt/getSysbytedesnum' + '/' + 'PROGRAM' + '/' + 'PROGRAMSTATUS').then((resp:any) => {
            this.prosta = resp;
        });
    }
    
    getProver() {
        this.data.get('ComboSysbyt/getSysbytedes' + '/' + 'PROGRAM' + '/' + 'PROGRAMVERSION').then((resp:any) => {
            this.prover = resp;
        });
    }
  
    getShowyn() {
        this.data.get('ComboSysbyt/getSysbytedes' + '/' + 'PROGRAM' + '/' + 'SHOWTRANSCRIPT').then((resp:any) => {
            this.showyn = resp;
        });
    }
    getStudyperiod() {
        this.data.get('ComboSysbyt/getSysbytedes' + '/' + 'STUDENTSET' + '/' + 'STUDYPERIOD').then((resp:any) => {
            this.studyperiod = resp;
        });
    }

    getLev() {
        this.data.get('ComboLev/All').then(
            (response:any) => {
                this.levshow = response;
            }
        );
    }
    getFac() {
        this.data.getcombo('ComboFac/All').then(
  
          (resp: any) => {
              this.facshow = resp;
          }
      );
      
    }

    getDeg() {
        this.data.get('ComboDeg/All').then(
            (response:any) => {
                this.degshow = response;
            }
        );
    }

    getDepcombo(){
        this.depid = null
        if (this.facid){
            this.data.getcombo('ComboDep/GetbyFacAuth/'   + this.facid).then(
                (rep:any) => {
                    this.depcombo = rep;
                }
            );
          }else{
            this.depcombo=[];
          }
      }

    getDep() {
        this.data.get('ComboDep/All').then(
            (response:any) => {
                this.depshow = response;
            }
        );
    }

    getProcod() {
        this.data.get('ComboProcod/Getbyprocodstatus/Y').then(
            (response:any) => {
                this.procodshow = response;
            }
        );
    }
    getProgro() {
        this.data.get('ComboProgro/All').then(
            (response:any) => {
                this.progroshow = response;
            }
        );
    }
    getUocisec() {
        // this.data.get('ComboUoc/All').then(
        //     (response:any) => {
        //         this.combouocisec = response;
        //     }
        // );
    }
    getProgram() {
        this.loadingVisible = true
        this.data.getcombo(`ComboPro/All`).then((resp: any) => {
            this.programlist = resp
            this.loadingVisible = false
        })
    }

    getDefault(e:any) {
        if(this.util.ntz(this.facid) > 0){
            e.data.facultyid = this.facid
        }
        if(this.util.ntz(this.depid) >= 0){
            e.data.departmentid = this.depid
        }
        e.data.levelid = this.levid
        this.degchangeval = ""
        this.prochangeval = ""
    }
    dataSave(data: any) {
        let parameter: any;
         data.cancel = true;
        if (data.changes.length !== 0) {
            parameter = data.changes[0]['data'];
            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyprogramid = data.changes[0]['key'].programid;
                    this.data.put('Prgprogram/Put', parameter).then(
                        (resp:any) => {
                            this.onSearch();
                            data.component.cancelEditData();
                            this.alert.Showsuccess();
                            
                        }
                    );

                    break;

                case 'insert':
                    this.data.post('Prgprogram/Post', parameter).then((resp:any) => {
                            this.onSearch();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                    });
                    break;

                case 'remove':
                    this.data.delete('Prgprogram/Delete' + '/' + data.changes[0]['key'].programid).then(
                        (resp:any) => {
                            this.onSearch();
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
  
    onCancelEditmode() {
        this.editmodeopen = false;
    }
    onEditstart(e:any) {
        if (!this.editmodeopen) {
            this.editmodeopen = true;
        } else {
            this.alert.Warning(1);
            e.cancel = true;
        }
    }
    selectionChanged(data:any) {
    
    }
    onSearch() {

            this.loadingVisible = true;
            this.data.get('Prgprogram/Getbyfacdeplev/' + this.util.ntz(this.facid) + '/' + this.util.ntz(this.depid) + '/' + this.util.ntz(this.levid) + '/' + this.util.ntz(this.programyear) + '/' + this.util.ntb(this.programtype) + '/' + this.util.ntz(this.programstatus)).then((resp:any) => {

                this.prolist = resp;
                this.loadingVisible = false;
            })

    }

    updatedataform(eventData:any, cellInfo: any) {  
            if (cellInfo.setValue) {  
              cellInfo.setValue(eventData.value);  
            }  
        }

   degchange(rowData: any, value: any): void {

        let key = this.degshow?.filter((coursecode: any) => {
        return coursecode.comboid == value;
        })[0].keystr1id;

        rowData.degreeid = value;
        rowData.programnamecertify = key + " " + this.prochangeval;
        this.degchangeval = key;
    }
    prochange(rowData: any, value: any): void {
        rowData.programname = value;
        this.prochangeval = value;
        rowData.programnamecertify = this.degchangeval + " " + value;

    }
//   showCopy() {
//     // this.loadingVisible = true;
//     // this.data.getcombo("ComboPro/All").then((resp: any) => {
//     //     this.programlist = resp
//         this.popupVisible = true
//         if(!this.programlist){
//             this.loadingVisible = true
//         } else {
//             this.loadingVisible = false
//         }
//         // this.loadingVisible = false
//         //   this.coulist1 = resp;
//     // //   this.couoldid = this.tmpcouidcopy;
//     //   this.counewid = null;
//     //   this.versionnew = null;
//     // });
//   }
  onCopy() {

    if (!this.old_program || !this.new_program){
        // this.alert.MsgBoxInformation("กรุณาระบุข้อมูลการคัดลอกให้ครบทั้ง 3 ช่อง"); 
        this.alert.MsgBoxInformation("กรุณาระบุข้อมูลการคัดลอกให้ครบทั้ง 2 ช่อง"); 
    }else{
      let strwhere = "programid = '" + this.new_program + "'";
      let parameter: any;
      this.data.put('Prgprogram/Putcopy/' + this.old_program + '/' + this.new_program, parameter).then((resp:any) => {
              this.popupVisible = false;
            //   this.tmpcouidcopy = '';
              this.onSearch();
      });
    }
      
  }
}
