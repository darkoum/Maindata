import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { locale} from 'devextreme/localization';
import { UtilService } from 'src/app/services/util.service';
import { AlertService } from './../../services/alert.service';

@Component({
    standalone: false,
    selector: 'app-prgprogramstructure',
    templateUrl: './prgprogramstructure.component.html',
    styleUrls: ['./prgprogramstructure.component.css'],
})
export class PrgprogramstructureComponent implements OnInit {
    vprolist: any[] = [];
    prostrlist = {paginate: true, pageSize: 10, store: [] };
    graexalist: any[] = [];
    prostrexalist: any[] = [];
    procombolist: any[] = [];
    procombocopylist: any[] = [];
    prostrcopylist: any[] = [];
    couinprolist: any[] = [];
    couequlist: any[] = [];
    tmpproid: any;
    tmpconid: any;
    tmpcouid: any;
    condes: any[] = [];
    destran: any[] = [];
    movtyp: any[] = [];
    passtyp: any[] = [];
    coulist: any[] = [];
    gm: any[] = [];
    contyp: any[] = [];
    facid: number = +sessionStorage.getItem('mafacultyid');
    proid: number;
    faccopyid: number ;
    procopyid: number;
    proconcopyid: string;
    proconcopyidto: string;
    popupVisible2 = false;
    subwidth: any = 6;
    conditiontype:any;
    credittotal:number=0;
    curconcopyid  : string;
    curcombocopylist: any[] = [];
    curstrcopylist : any[] = [];
    depcombo :any;
    depid : number;
    checkBoxValue:boolean = false;
    conditiondestranvalue :any;
    facshow: any[] = [];
    faccopyshow: any[] = [];
    depcopyshow:any;
    depcopyid:any;
    levcopyid:any;
    levshow: any;
    
    levid:any  = +sessionStorage.getItem('malevelid');
    editmodeopen: boolean = false;
    editmodeopen2: boolean = false;
    editmodeopen3: boolean = false;
    editmodeopen4: boolean = false;
    editmodeopen5: boolean = false;
    pronameheader :any = null;
    prerequisitetypelist: any;
    curid:any;
    curcombolist:any;
    condeshead:any;
    prostructcurrent:any;
    couinprocurrent:any;
    fflag:any;
    forceflagvalue:any
    comboyesno : any = [
        { comboid: 'Y', comboshow: 'Y : แสดง' },
        { comboid: 'N', comboshow: 'N : ไม่แสดง' },
    ];
    combogpaflag: any = [
        {
            comboid: 'Y',
            comboshow: 'Y : คำนวณเกรด',
        },
        {
            comboid: 'N',
            comboshow: 'N : ไม่คำนวณเกรด',
        },
    ]
    finishdatetypelist : any = [{comboid : '-',comboshow :'- : ไม่กำหนด'},{comboid :'P',comboshow :'P : วันที่ผ่าน'},{comboid :'S',comboshow :'S : วันที่ส่งผลงาน'}]

    credittotalall = 0;

    constructor(private data: HttpService,private alert: AlertService,private util: UtilService) {
        locale('th');
    }

    ngOnInit(): void {
        this.getDepcombo();
        this.getLev();
        this.getCou();
        this.getCondes();
        this.getMovtyp();
        this.getGm();
        this.getGraexa();
        this.getContyp();
        this.getPasstyp();
        this.getFac();
        this.getFaccopy();
        this.getFilteredCondes= this.getFilteredCondes.bind(this);
        this.groupchange = this.groupchange.bind(this);
        this.getseq = this.getseq.bind(this);
    }

getLev() {
    this.data.get('ComboLev/All').then(
        (response:any) => {
            this.levshow = response;
        }
    );
}
   
 getCou() {
    this.data.get('ComboCou/Combocouopen').then(
        (resp: any) => {
            this.coulist = resp;
        }
    );

}

    getGraexa() {
        this.data.get('Prgprogramstructure/Getgraexagro').then((resp:any) => {
            this.graexalist = resp;
        });
    }

    getProstr(programid: number) {
        this.credittotalall = 0;
        this.data.getcombo('Prgprogramstructure/Getprostrbyproid' + '/' + programid).then((resp:any) => {
            this.prostrlist = resp;
            this.credittotalall = resp.store[0].credittotalall;
        });
    }

    getDepcombo(){
        this.depid = null
        if (this.facid) {
          this.data .getcombo("ComboDep/GetbyFac/" + this.facid) .then((rep: any) => {
              this.depcombo = rep;
            });
        } else {
          this.depcombo = null;
        }
       
      }
      getDepcopycombo(){
        this.depcopyid = null
        if (this.faccopyid){
            this.data.getcombo('ComboDep/GetbyFac/' + this.faccopyid).then(
                (rep:any) => {
                    this.depcopyshow = rep;
                }
            );
        }else{
            this.depcopyshow=null;
        }
      }

      getprocopycombo(){
          this.procopyid = null
        if (this.levcopyid) {
            this.data .getcombo("ComboPro/Getbyfacdeplev/" + this.util.ntz(this.faccopyid) + '/' + this.util.ntz(this.depcopyid) + '/' + this.util.ntz(this.levcopyid)) .then((resp: any) => { this.procombocopylist = resp; });
        } else {
            this.procombocopylist = null;
        }
      }
    
       getprocombo() {
           this.proid = null
            if (this.levid) {
                this.data .getcombo("ComboPro/Getbyfacdeplev/" + this.util.ntz(this.facid) + '/' + this.util.ntz(this.depid) + '/' + this.util.ntz(this.levid)) .then((resp: any) => { this.procombolist = resp; });
            } else {
                this.procombolist = null;
            }
       }

    getProstrexa(programid: number) {
        this.data.get('Prgprogramstructure/Getprostrexabyproid' + '/' + programid).then((resp:any) => {
           
            this.prostrexalist = resp;
           
        });
    }

    getcouinpro(programid: number, conditionid: string) {
        this.couinprolist = [];
        this.data.get('Prgprogramstructure/Getcouinprobyconid' + '/' + programid + '/' + conditionid).then((resp:any) => {
           
            this.couinprolist = resp;
            // console.log("couinprolist",this.couinprolist)
        });
    }

    
    getcouequ(programid: number, courseid: number) {
        this.couequlist = [];
        this.data.get('Prgprogramstructure/Getcouequbycouid' + '/' + programid + '/' + courseid).then((resp:any) => {
           
            this.couequlist = resp;
        });
    }

    getContyp() {
        this.data.get('ComboSysbyt/getSysbytedescintype' + '/' + 'PROGRAMSTRUCTURE' + '/' + 'CONDITIONTYPE').then((resp:any) => {
            this.contyp = resp;
        });
    }
   

    getFilteredCondes(options:any) {
    
        return {
            store: this.condes,
            filter: options.data ? ['keystr2id', '=', options.data.conditiondestran] : null,
        };
    }
    getCondes() {

        this.data.get('ComboSysbyt/getSysbytedes' + '/' + 'COURSE' + '/' + 'COURSEGROUP').then((resp:any) => {
            this.condes = resp;
        });

     
    }

    getforceflagx() {

        this.data.getcombo('ComboSysbyt/getSysbytedesname' + '/' + 'PROGRAMSTRUCTURE' + '/' + 'FORCEFLAG').then((response:any) => {
            this.fflag = response;
        });  
    }
    getforceflag() {

        return new Promise(resolve => {
            this.data.get('ComboSysbyt/getSysbytedesname' + '/' + 'PROGRAMSTRUCTURE' + '/' + 'FORCEFLAG').then((response:any) => {
           
                if (response.length > 0) {
                    // console.dir(response);
                    for (let i = 0; i < response.length; i += 1) {
                
                      this.fflag.push({ comboid: response[i].comboid, comboshow:  response[i].comboshow , keystr1id: response[i].keystr1id  });
        
                      if (i == 0) {
                                resolve(response[i].comboid);
                              }
        
                    }
                }       
            });
        })

    }
    getMovtyp() {
        this.data.getcombo('ComboSysbyt/getSysbytedes' + '/' + 'PROGRAMSTRUCTURE' + '/' + 'MOVETOTYPE').then((resp:any) => {
            this.movtyp = resp;
        });
    }
    getPasstyp() {
        this.data.getcombo('ComboSysbyt/getSysbytedes' + '/' + 'PROGRAMSTRUCTURE' + '/' + 'PASSTYPE').then((resp:any) => {
            this.passtyp = resp;
            // console.log("passtyp",this.passtyp)
        });
    }
    getGm() {
        this.data.getcombo('ComboSysbyt/getSysbytedes' + '/' + 'GRADECONFIG' + '/' + 'GRADEMODE').then((resp:any) => {
            this.gm = resp;
        });
    }
  
    getFac() {
        this.data.getcombo('ComboFac/All').then(
            (response:any) => {
              
                this.facshow = response;
          
            },
            (error:any) => {}
        );
    }
    getFaccopy() {
        this.data.getcombo('ComboFac/All').then(
            (response:any) => {
              
                this.faccopyshow = response;
            },
            (error:any) => {}
        );
    }
   

    getDefault(e:any) {

        e.data.mincourse = 0;
        e.data.passtype = '0';
        e.data.movetotype = 'N';
        e.data.gpamajorflag = 'N'

        if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
        }else{
            e.cancel = true;
        }
    }
    getDefault2(e:any) {
        if (sessionStorage.getItem('editmodeopen') == 'false') {
        
            e.data.programid = this.tmpproid;
            e.data.conditionid = this.tmpconid;
           
            sessionStorage.setItem('editmodeopen', 'true');
        }else{
            e.cancel = true;
        }
    }
    getDefault3(e:any) {
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
        }else{
            e.cancel = true;
        }
    }
    getDefault4(e:any) {
        e.data.showtranscript = 'Y'
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
        }else{
            e.cancel = true;
        }
    }
   

    dataSave(data: any) {
        let parameter: any;
       

        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];
         
            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyprogramid = data.changes[0]['key'].programid;
                    parameter.keyconditionid = data.changes[0]['key'].conditionid;
                  
                    this.data.put('Prgprogramstructure/Put', parameter).then(
                        (resp:any) => {
                            this.getProstr(this.proid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    parameter.programid = this.proid;
                    this.data.post('Prgprogramstructure/Post', parameter).then(
                        (resp:any) => {
                            this.getProstr(this.proid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data
                        .delete(
                            'Prgprogramstructure/Delete' + '/' + data.changes[0]['key'].programid + '/' + data.changes[0]['key'].conditionid
                        )
                        .then(
                            (resp:any) => {
                                this.getProstr(this.proid);
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

    dataSave2(data: any) {
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];
         
            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyprogramid = data.changes[0]['key'].programid;
                    parameter.keyconditionid = data.changes[0]['key'].conditionid;
                    parameter.keycourseid = data.changes[0]['key'].courseid;

                    this.data.put('Prgprogramstructure/Putcouinpro', parameter).then(
                        (resp:any) => {
                            this.getcouinpro(this.proid, this.tmpconid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                   //parameter.programid = this.tmpproid;
                  
                    this.data.post('Prgprogramstructure/Postcouinpro', parameter).then(
                        (resp:any) => {
                            this.getcouinpro(this.proid, this.tmpconid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data .delete( 'Prgprogramstructure/Deletecouinpro' + '/' + data.changes[0]['key'].programid + '/' + data.changes[0]['key'].conditionid + '/' + data.changes[0]['key'].courseid ) .then(
                            (resp:any) => {
                                this.getcouinpro(this.proid,  this.tmpconid);
                                this.alert.Showsuccess();
                                data.component.cancelEditData();
                            }
                        );
                    break;
            }
        } else {
            this.editmodeopen = false;
        }
    }
    dataSave3(data: any) {
        let parameter: any;
       
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];
            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyprogramid = data.changes[0]['key'].programid;
                    parameter.keycourseid = data.changes[0]['key'].courseid;
                    parameter.keycourseequivalentid = data.changes[0]['key'].courseequivalentid;

                    //console.dir(parameter);
                    this.data.put('Prgprogramstructure/Putcouequ', parameter).then(
                        (resp:any) => {
                            this.getcouequ(this.proid,  this.tmpcouid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    parameter.programid = this.tmpproid;
                    parameter.courseid = this.tmpcouid;
                    this.data.post('Prgprogramstructure/Postcouequ', parameter).then(
                        (resp:any) => {
                            this.getcouequ(this.proid,  this.tmpcouid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data .delete( 'Prgprogramstructure/Deletecouequ' + '/' + data.changes[0]['key'].programid + '/' + data.changes[0]['key'].courseid + '/' + data.changes[0]['key'].courseequivalentid ) .then(
                            (resp:any) => {
                                this.getcouequ(this.proid,  this.tmpcouid);
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
    dataSave4(data: any) {
        //this.editmodeopen4 = false;
        let parameter: any;
       
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];
            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyprogramid = data.changes[0]['key'].programid;
                    parameter.keygraduateexamcode = data.changes[0]['key'].graduateexamcode;
                   
                    this.data.put('Prgprogramstructure/Putprostrexa', parameter).then(
                        (resp:any) => {
                            this.getProstrexa(this.proid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    parameter.programid = this.proid;
                    this.data.post('Prgprogramstructure/Postprostrexa', parameter).then(
                        (resp:any) => {
                            this.getProstrexa(this.proid);
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data .delete( 'Prgprogramstructure/Deleteprostrexa' + '/' + data.changes[0]['key'].programid + '/' + data.changes[0]['key'].graduateexamcode ) .then(
                            (resp:any) => {
                                this.getProstrexa(this.proid);
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

  
    selectionChanged(data:any) {
        if (sessionStorage.getItem('editmodeopen') == 'false') {

            if(data.selectedRowKeys[0]?.programid != null && data.selectedRowKeys[0]?.programid !=='undefined'){
                this.tmpproid = data.selectedRowKeys[0].programid;
                this.tmpconid = data.selectedRowKeys[0].conditionid;
                this.conditiontype = data.selectedRowKeys[0].conditiontype;

                this.credittotal= data.selectedRowKeys[0].credittotal;
                this.forceflagvalue =  data.selectedRowKeys[0].forceflag;
                this.conditiondestranvalue =  data.selectedRowKeys[0].conditiondestran;
                this.prostructcurrent =  "รายวิชา "+ this.tmpconid + ' : ' + data.selectedRowKeys[0].description + (this.util.ntz(data.selectedRowKeys[0].credittotal) != -9 ? " หน่วยกิต " + data.selectedRowKeys[0].credittotal : '') ;
                this.getcouinpro(this.tmpproid,  this.tmpconid);
                // this.getProstrc(this.tmpproid);
                this.couequlist =null;
                // this.prelist = null;
             }else{
                this.prostructcurrent = null;
             } //this.subdislist =""
        } else {
            //this.alert.Warning(1);
           
        }
    }
    selectionChanged2(data:any) {
        if (sessionStorage.getItem('editmodeopen') == 'false') {
            this.tmpproid = data.selectedRowKeys[0]?.programid;
            this.tmpcouid = data.selectedRowKeys[0]?.courseid;
            if (this.tmpcouid !== null && this.tmpcouid !== undefined) {
                this.getcouequ(this.tmpproid, this.tmpcouid);
                // this.getpre(this.tmpproid, this.tmpcouid);
                this.couinprocurrent = 'รายวิชาแทน ' + data.selectedRowKeys[0].courseshow
            }else{
                this.couinprocurrent = null
            }
          
        } else {
            //this.alert.Warning(1);
        }
    }
    
    onSearch() {
        this.couinprolist = null;
        this.couequlist = null;
        // this.prelist = null;
        this.prostrlist = null
       if(this.proid){
            this.data.get('Prgprogramstructure/Getprograminfo/' + this.proid).then((resp:any) => {
                if (resp.length > 0) {
                    this.vprolist = resp;

                    this.pronameheader = 'บันทึกข้อมูลหมวดโครงสร้าง '+ resp[0].program  + ' : ' + resp[0].programname; 
                } else {
                    this.alert.Showwarning('ไม่พบข้อมูล');
                }
            });
            
            this.getProstr(this.proid);
            this.getProstrexa(this.proid);
       }else{
            this.alert.Showwarning("คุณยังไมได้ระบุข้อมูลสาขาวิชา")
       }

    }
   

    getcurcombo() {
    
        this.data.getcombo('ComboCur/Combobyfac/' + + this.facid).then((resp:any) => {
            this.curcombolist = resp;
        });
      
    }
   

    getcurcopylist() {
        this.proconcopyid = null;
        this.prostrcopylist = null
        if (this.procopyid !== null && this.procopyid !== undefined) {
            //this.getProstr(this.procopyid);
            this.data.get('Prgprogramstructure/Getshowbyid/' + this.procopyid).then((resp:any) => {
                this.prostrcopylist = resp;
            });
        }
    }

    updateCourse(eventData:any, cellInfo: any) {
        if (cellInfo.setValue) {
            cellInfo.setValue(eventData.value);
        }
    }


    groupchange(rowData: any, value: any): void {

        let key = this.condes?.filter((coursecode: any) => {
        return coursecode.comboid == value;
        })[0].keystr1id;

        rowData.conditiondes = value;
        rowData.description = key;

    }

    showCopy2() {
        if (this.proid > 0) {
         
            this.popupVisible2 = true;
            this.faccopyid =this.facid;
            this.levcopyid =this.levid;     
            this.curconcopyid=null;
            this.depcopyid = this.depid;
        } else {
            this.alert.MsgBoxInformation("กรุณาเลือกสาขาวิชาก่อน");
        }
    }
 

    onCopy2() {
       
        if (this.util.ntz(this.procopyid) > 0) { 
        let parameter: any;

            // console.log(this.proid,this.procopyid,this.proconcopyid);
            this.data.put('Prgprogramstructure/Putcopy/' + this.proid + '/' + this.procopyid + '/' + this.util.ntb(this.proconcopyid), parameter).then(
                (resp:any) => {
                    this.alert.Showsuccess();
                    this.popupVisible2 = false;
                    this.curconcopyid = '';
                    this.procopyid = null;
                    // this.curcopyid = null;
                    this.levcopyid = null
                    this.depcopyid = null;
                    this.faccopyid = null;
                    this.proconcopyid = null;
                    this.data.get('Prgprogramstructure/Getprostrbyproid/' + this.proid).then((resp:any) => {
                        this.prostrlist = resp;
                    });
                }
            );
        }else{
            this.alert.MsgBoxInformation("กรุณาเลือกสาชาวิชาต้นแบบที่ต้องการคัดลอกก่อน");
        }

    }

onToolbarPreparing(e: any){
    e.toolbarOptions.items[0].showText = 'always';
    var toolbarItems = e.toolbarOptions.items;  
    if (this.pronameheader  == null && this.pronameheader== undefined){

    $.each(toolbarItems, function (_, item) {  
        if (item.name === "addRowButton") {  
            item.options.onClick = function (args:any) {  
                
                  alert('คุณยังไมได้ระบุข้อมูลหลักสูตร');

                   
            };  
        }  
    });  }
    
   
  }
  onToolbarPreparing2(e: any){
    e.toolbarOptions.items[0].showText = 'always';
    var toolbarItems = e.toolbarOptions.items;  
    if (this.tmpconid  == null && this.tmpconid == undefined){
        $.each(toolbarItems, function (_, item) {  
            if (item.name === "addRowButton") {  
                item.options.onClick = function (args:any) {  
                    alert('คุณยังไมได้ระบุข้อมูลหมวด');
                };  
            }  
    });  
    }else
    {


  
    if (this.conditiontype  !== 'C'){

        $.each(toolbarItems, function (_, item) {
            if (item.name === "addRowButton") {
                item.options.onClick = function (args:any) {

                    alert('ระบุรายวิชาได้เฉพาะประเภท C เท่านั้น');


                };
            }
        });  }
  }
//     e.toolbarOptions.items.unshift(
//         {
//         location: "after",
//         template: "selectedvalue",
//         },
//         {
//         location: "before",
//         template: "heddershow2",

//         option: {
//             onValueChanged: this.checkBoxChanged.bind(this),
//         },
//         }
//   );
    
   
  }
  checkBoxChanged(e :any) {

    if (this.checkBoxValue){
        this.subwidth = 12;
        
    }else{
        this.subwidth = 6;
        
    }
 
}
  onToolbarPreparing3(e: any){
    e.toolbarOptions.items[0].showText = 'always';
    var toolbarItems = e.toolbarOptions.items;  
    if (this.tmpcouid  == null && this.tmpcouid == undefined){

        $.each(toolbarItems, function (_, item) {  
            if (item.name === "addRowButton") {  
                item.options.onClick = function (args:any) {  
                    
                    alert('คุณยังไมได้ระบุข้อมูลวิชา');

                    
                };  
            }  
        });  
    }

     e.toolbarOptions.items.unshift(
        {
            location: "after",
            template: "selectedvalue",
        },
       
  );
    
   
  }

  onToolbarPreparing4(e: any){

    var toolbarItems = e.toolbarOptions.items;  
    if (this.pronameheader  == null && this.pronameheader== undefined){

    $.each(toolbarItems, function (_, item) {  
        if (item.name === "addRowButton") {  
            item.options.onClick = function (args:any) {  
                
                  alert('คุณยังไมได้ระบุข้อมูลหลักสูตร');

                   
            };  
        }  
    });  }
    
   
  }
 

onRowPrepared(e:any){

    if (e.rowType === "group") {
       
           e.rowElement.style.backgroundColor = "#9DBCBC";
           e.rowElement.style.fontWeight = 'bold';
           e.rowElement.style.color ="black";

        }
      
    }


    async setgrouptr3(newData:any, value:any, currentRowData:any) {
  
        newData.forceflag = value;
        newData.conditiontype = 'C';
        if (value == 'Y'){
            newData.description = 'วิชาบังคับ';
        }else{
            newData.description = 'วิชาเลือก';
        }
      
       
        }



    getseq(){
        if(this.prostrlist){
            return this.prostrlist?.store?.filter(r=>r.conditiontype == "C");
        }
    }
}