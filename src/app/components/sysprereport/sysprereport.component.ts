import { filter } from 'rxjs/operators';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { locale } from 'devextreme/localization';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { Encrypt } from 'src/app/shareds/encrypt';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    standalone: false,
  selector: 'app-sysprereport',
  templateUrl: './sysprereport.component.html',
  styleUrl: './sysprereport.component.css',
  encapsulation: ViewEncapsulation.None,

})
export class SysprereportComponent {

  syspre;
  sysmenuid: number;
  reptype: string = "pdf";
  frm: FormGroup;

  repname: string;
  repfilename: string;

  frmdata: any;

  combolist: any[] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  export: number = 0;

  constructor(
    private http: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService,
    private util: UtilService,
    private route: ActivatedRoute
  ) {
    locale('th');

    
    //this.sysmenuid = Number(sessionStorage.getItem('sysmenuid'));
    

  }

  ngOnInit(): void {

    
    this.reptype = "pdf";
    this.route.params.subscribe((params: Params) => {
      
      this.syspre = this.getRandomCharacter();
      //console.log(this.syspre)
      this.frm = null;
      this.repname = this.util.repinit(sessionStorage.getItem('menuname'));
      this.repfilename = sessionStorage.getItem('menurepform');
      this.sysmenuid = Number(params['sysmenuid']);
      this.export = 0;

      this.http.get('Sysprereport/Getconfig/' + this.sysmenuid).then((resp: any) => {
        resp.filter(r => r.datatype == 'E').forEach(e => {
          this.reptype = "pdf";
          this.export = e.sequence;
          this.SetCombolist(e.sequence, e.combosource, e.filter, 0);
        });
        this.frmdata = resp.filter(r => r.datatype != 'E');
        const group = {};

        resp.filter(r => r.datatype != 'E' && r.tempname != '').forEach(e => {
          if (e.combo == true) {
            this.SetCombolist(e.sequence, e.combosource, e.filter, 0);
          }
          if(e.require == 1){
            group[this.syspre + e.sequence] = new FormControl({ value: this.GetDefualt(e.defaultvalue, e.datatype), disabled: false },[Validators.required]);
          }else{
            group[this.syspre + e.sequence] = new FormControl({ value: this.GetDefualt(e.defaultvalue, e.datatype), disabled: false });
          }
          //console.log(this.syspre + e.sequence,this.GetDefualt(e.defaultvalue, e.datatype))
          //this.GetDefualt(e.defaultvalue, e.datatype)
        });
        this.frm = new FormGroup(group);
        //console.log(this.frm)
      });

    });


  }

  SetCombolist(idx, combosource, filter, from) {
    let url = combosource;
    if (filter != "") {
      let value;
      let arr = (filter + ",0").split(",");

      arr.forEach((data) => {
        if (data != "0") {
          if (this.frmdata.filter(x => x.tempname == data).length > 0) {
            let tmp = this.frmdata.filter(x => x.tempname == data)[0];
            if (from == 0) {
              value = this.util.ntz(this.GetDefualt(tmp.defaultvalue, tmp.datatype));
            } else {
              value = this.util.ntz(this.frm.get(this.syspre + tmp.sequence).value);
            }
          } else {
            value = -9;
          }
          url = url + "/" + value;
        }
      });
    }

    this.http.getcombo(url).then((resp: any) => { this.combolist[idx] = resp });

  }


  HandleEvent(type) {
    
    this.frmdata.forEach(data => {
      if (data.tempname != "") {
        if (data.filter.indexOf(type) >= 0) {
          this.SetCombolist(data.sequence, data.combosource, data.filter, 1);
        }
      }

    });

  }

  HandleEventText(sequence, tempname, value) {
    if (this.frmdata.filter(x => x.tempname == tempname && x.sequence > sequence).length > 0) {
      this.frm.get(this.syspre + this.frmdata.filter(x => x.tempname == tempname && x.sequence > sequence)[0].sequence).setValue(value);
    }
    this.HandleEvent(tempname);
  }


  GetDefualt(val: string, datatype: string): any {
//console.log(val)
    if (val) {
      var name = [];
      var Darr = [];
      var ty = 0;

      if (val.indexOf("-") > 0) {
        name = val.split("-");
        ty = 1;
      }
      if (val.indexOf("+") > 0) {
        name = val.split("+");
        ty = 2;
      }

      if (name.length == 2) {
        
        val = name[0];
        if (name[1].indexOf(" ") > 0) {
          Darr = name[1].split(" ");
        }
      }else{
        if (val.indexOf(" ") > 0) {
          Darr = val.split(" ");
        }
      }

      if (sessionStorage.getItem(sessionStorage.getItem('syspreapp') + val)) {
        if (name.length == 2) {
          if (ty == 1) {
            return(this.convertype(Number(sessionStorage.getItem(sessionStorage.getItem('syspreapp') + val)) - name[1], datatype));
          }
          if (ty == 2) {
            return(this.convertype(Number(sessionStorage.getItem(sessionStorage.getItem('syspreapp') + val)) + name[1], datatype));
          }
        }
        return(this.convertype(sessionStorage.getItem(sessionStorage.getItem('syspreapp') + val), datatype));
      } else {
        if (datatype == 'H' || datatype == 'D') {
          let date = new Date();
          if(name.length == 2){
            if(Darr.length == 2){
              if (ty == 1) {
                date.setDate(date.getDate() - Number(Darr[0]));
              }
              if (ty == 2) {
                date.setDate(date.getDate() + Number(Darr[0]));
              }
            }else{
              if (ty == 1) {
                date.setDate(date.getDate() - Number(name[1]));
              }
              if (ty == 2) {
                date.setDate(date.getDate() + Number(name[1]));
              }
            }
          }
          if(Darr.length == 2){
            let h = Darr[1].split(":");
            date.setHours(Number(h[0]),Number(h[1]),0);
          }

          return(date);
        }else{
          return(this.convertype(val, datatype));
        }
      }
    } else {
      return(null);
    }

  }

  convertype(val, type) {
    switch (type) {
      case 'N': {
        return Number(val);
      }
      case 'D': {
        return new Date();
      }
      case 'H': {
        return new Date();
      }
      case 'C': {
        return val == "true"? true : false;
      }
      default: {
        return val;
      }
    }
  }

  calwhere() {
    return new Promise((resolved, rejected) => {
      let whr = [{}];
      let tmp = [{}];
      let para = "";
      this.frmdata.filter(x => x.tempname != "").forEach(e => {
        if (e.datatype == "P") {
            para = para + ";" + e.tempname + ":" + this.frm.value[this.syspre + e.sequence];
        }else{
          if(e.parameter == 1){
            if (this.frmdata.filter(x => x.tempname == e.tempname).length == 2) {
              let arr = this.frmdata.filter(x => x.tempname == e.tempname);
              if(e.sequence == arr[1].sequence){
                if (e.datatype == "D") {
                  para = para + ";" + e.tempname.replace(".", "") + "1:" + this.util.getdateformatora(this.frm.value[this.syspre + arr[0].sequence]);
                  para = para + ";" + e.tempname.replace(".", "") + "2:" + this.util.getdateformatora(this.frm.value[this.syspre + arr[1].sequence]);
                }else{
                  if (e.datatype == "H") {
                    para = para + ";" + e.tempname.replace(".", "") + "1:" + this.util.getdatetimeformatora(this.frm.value[this.syspre + arr[0].sequence]).replace(":",".");
                    para = para + ";" + e.tempname.replace(".", "") + "2:" + this.util.getdatetimeformatora(this.frm.value[this.syspre + arr[1].sequence]).replace(":",".");
                  }else{
                    para = para + ";" + e.tempname.replace(".", "") + "1:" + this.frm.value[this.syspre + arr[0].sequence];
                    para = para + ";" + e.tempname.replace(".", "") + "2:" + this.frm.value[this.syspre + arr[1].sequence];
                  }
                }
              }
            }else{
              if (e.datatype == "D") {
                para = para + ";" + e.tempname.replace(".", "") + ":" + this.util.getdateformatora(this.frm.value[this.syspre + e.sequence]);
              }else{
                if (e.datatype == "H") {
                  para = para + ";" + e.tempname.replace(".", "") + ":" + this.util.getdatetimeformatora(this.frm.value[this.syspre + e.sequence]);
                }else{
                  para = para + ";" + e.tempname.replace(".", "") + ":" + this.frm.value[this.syspre + e.sequence];
                }
              }
            }
          }
          if(e.repwhere == 1){
            if(e.tempname.indexOf("acadyear") >= 0 || e.tempname.indexOf("semester") >= 0 || this.frmdata.filter(x => x.tempname ==  e.tempname).length == 4){
              if(this.frmdata.filter(x => x.tempname ==  e.tempname).length == 4){
                let arryear = this.frmdata.filter(x => x.tempname == e.tempname);
                if(this.util.ntz(this.frm.value[this.syspre + arryear[0].sequence]) != -9 && this.util.ntz(this.frm.value[this.syspre + arryear[1].sequence]) != -9 && this.util.ntz(this.frm.value[this.syspre + arryear[2].sequence]) != -9 && this.util.ntz(this.frm.value[this.syspre + arryear[3].sequence]) != -9 ){
                  whr[0][e.tempname] = { between: ((this.frm.value[this.syspre + arryear[0].sequence] * 10) + this.frm.value[this.syspre + arryear[1].sequence]), and: ((this.frm.value[this.syspre + arryear[2].sequence] * 10) + this.frm.value[this.syspre + arryear[3].sequence]) };
                }
              }else{
                if(this.frmdata.filter(x => x.tempname ==  e.tempname.replace("acadyear","semester")).length == 2 && this.frmdata.filter(x => x.tempname ==  e.tempname.replace("semester","acadyear")).length == 2){
                  
                  let arryear = this.frmdata.filter(x => x.tempname == e.tempname.replace("semester","acadyear"));
                  let arrseme = this.frmdata.filter(x => x.tempname == e.tempname.replace("acadyear","semester"));
                  let whrstr = "((" + e.tempname.replace("semester","acadyear") + "*10)+" + e.tempname.replace("acadyear","semester") + ")";
                  if(this.util.ntz(this.frm.value[this.syspre + arryear[0].sequence]) != -9 && this.util.ntz(this.frm.value[this.syspre + arrseme[0].sequence]) != -9 && this.util.ntz(this.frm.value[this.syspre + arryear[1].sequence]) != -9 && this.util.ntz(this.frm.value[this.syspre + arrseme[1].sequence]) != -9){
                    whr[0][whrstr] = { between: ((this.frm.value[this.syspre + arryear[0].sequence] * 10) + this.frm.value[this.syspre + arrseme[0].sequence]), and: ((this.frm.value[this.syspre + arryear[1].sequence] * 10) + this.frm.value[this.syspre + arrseme[1].sequence]) };
                  }
                }else{
                  whr[0][e.tempname] = this.frm.value[this.syspre + e.sequence];

                  if (this.frmdata.filter(x => x.tempname == e.tempname).length == 2) {
                    let arr = this.frmdata.filter(x => x.tempname == e.tempname);
                    whr[0][e.tempname] = { between: this.frm.value[this.syspre + arr[0].sequence], and: this.frm.value[this.syspre + arr[1].sequence] };
                  }
                }
              }
            }else{

              if (e.condition != "") {
                if(e.datatype == "C"){
                  if(Boolean(this.frm.value[this.syspre + e.sequence])){
                    whr[0]["strx"] = e.condition;
                  }
                }else{
                  let arr = {};
                  arr[e.condition] = this.frm.value[this.syspre + e.sequence];
                  whr[0][e.tempname] = arr;
                }
              }else{
                whr[0][e.tempname] = this.frm.value[this.syspre + e.sequence];
              
                if (this.frmdata.filter(x => x.tempname == e.tempname).length == 2) {
                  let arr = this.frmdata.filter(x => x.tempname == e.tempname);
                  whr[0][e.tempname] = { between: this.frm.value[this.syspre + arr[0].sequence], and: this.frm.value[this.syspre + arr[1].sequence] };
                }
                if (e.datatype == "D") {
                  if (this.frmdata.filter(x => x.tempname == e.tempname).length == 2) {
                    let arr = this.frmdata.filter(x => x.tempname == e.tempname);
                    let arr1 = {};
                    let arr2 = {};
                    arr1['date'] = this.frm.value[this.syspre + arr[0].sequence];
                    arr2['date'] = this.frm.value[this.syspre + arr[1].sequence];
                    whr[0][e.tempname] = { between: arr1, and: arr2 };
                  }else{
                    let arr = {};
                    arr['date'] = this.frm.value[this.syspre + e.sequence];
                    whr[0][e.tempname] = arr;
                  }
                  
                }
                if (e.datatype == "H") {
                  if (this.frmdata.filter(x => x.tempname == e.tempname).length == 2) {
                    let arr = this.frmdata.filter(x => x.tempname == e.tempname);
                    let arr1 = {};
                    let arr2 = {};
                    arr1['datetime'] = this.frm.value[this.syspre + arr[0].sequence];
                    arr2['datetime'] = this.frm.value[this.syspre + arr[1].sequence];
                    whr[0][e.tempname] = { between: arr1, and: arr2 };
                  }else{
                    let arr = {};
                    arr['datetime'] = this.frm.value[this.syspre + e.sequence];
                    whr[0][e.tempname] = arr;
                  }
                }
              }
            }
          }

          if (e.usertemp == 1) {
            if (this.frmdata.filter(x => x.tempname == e.tempname).length == 2) {
              if (e.datatype == "D") {
                let arr = this.frmdata.filter(x => x.tempname == e.tempname);
                tmp[0][e.tempname + '1'] = this.frm.value[this.syspre + arr[0].sequence];
                tmp[0][e.tempname + '2'] = this.frm.value[this.syspre + arr[1].sequence];
              } else {
                if (e.datatype == "H") {
                  let arr = this.frmdata.filter(x => x.tempname == e.tempname);
                  tmp[0][e.tempname + '1'] = this.frm.value[this.syspre + arr[0].sequence];
                  tmp[0][e.tempname + '2'] = this.frm.value[this.syspre + arr[1].sequence];
                } else {
                  let arr = this.frmdata.filter(x => x.tempname == e.tempname);
                  tmp[0][e.tempname + '1'] = this.frm.value[this.syspre + arr[0].sequence];
                  tmp[0][e.tempname + '2'] = this.frm.value[this.syspre + arr[1].sequence];
                }
              }
            }else{
              if (e.datatype == "C") {
                tmp[0][e.tempname] = Boolean(this.frm.value[this.syspre + e.sequence]) == true ? 1 : 0;
              }else{
                tmp[0][e.tempname] = this.frm.value[this.syspre + e.sequence];
              }
            }
          }
        }

      });
      resolved([whr, tmp, para]);
    });
  }

  chkGroup(tmpname,sequence){
    this.frmdata.forEach(data => {
      if (data.tempname != "") {
        if(data.tempname == tmpname && data.sequence != sequence){
          this.frm.get(this.syspre + data.sequence).setValue(false);
        }
      }
    });
  }

  submit() {

    if(this.export == 0){
      this.reptype = "pdf";
    }
    if(this.frm.valid){
      this.calwhere().then((whr: any) => {
        if(Object.keys(whr[0][0]).length > 0 ){

          Object.keys(whr[0][0]).forEach(key =>{
            if(key.toUpperCase().includes('COURSECODE')){
              if(whr[0][0][key] != null){
                if(typeof whr[0][0][key] === 'object'){
                  Object.keys(whr[0][0][key]).forEach(subkey =>{
                    if(whr[0][0][key][subkey] != null){
                      whr[0][0][key][subkey] = whr[0][0][key][subkey].toUpperCase();
                    }
                  });
                }else{
                  whr[0][0][key] = whr[0][0][key].toUpperCase();
                }
              }
            }
          })
        }

        this.http.repprint(this.reptype, this.repfilename, (Object.keys(whr[0][0]).length > 0 ? whr[0] : []), whr[2], (Object.keys(whr[1][0]).length > 0 ? whr[1] : []));
      });
    }else{
      this.alert.MsgBoxCritical("กรุณาระบุข้อมูลให้ครบถ้วน");
    }
  }

  getRandomCharacter(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }
}