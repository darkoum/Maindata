import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Encrypt } from 'src/app/shareds/encrypt';
import {UtilService} from '../../services/util.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
  selector: 'app-prgschool',
  templateUrl: './prgschool.component.html',
  styleUrls: ['./prgschool.component.css']
})
export class PrgschoolComponent implements OnInit {
  schoollist : any;
  provincelist : any;   
  subdistrictlist : any;   
  subdistrictlistall : any;   
  districtlist : any;   
  schooltypelist : any;    
  schooltype = 0;
  provinceid = 0;
  editmodeopen: boolean = false ;
  schoolidmasterlist : any;
  combocounty : any;
 
  constructor(private data : HttpService , private encrypt : Encrypt,private util :UtilService,private alert:AlertService) { 

   
        
  }

  ngOnInit(): void {
   this.getSchool();
   this.getComboSch();
    this.setProvinceValue = this.setProvinceValue.bind(this);
    this.setSchooltypeValue = this.setSchooltypeValue.bind(this);
    this.setSubdistrictValue = this.setSubdistrictValue.bind(this);
    this.getFilteredDistrict = this.getFilteredDistrict.bind(this);
    this.getFilteredSubDistrict = this.getFilteredSubDistrict.bind(this);
    this.data.getcombo('ComboSysbyt/getSysbytedes/SCHOOL/SCHOOLTYPE').then((response:any) => {this.schooltypelist = response;});
    this.data.getcombo('ComboSysbyt/getSysbytedes/SCHOOL/COUNTY').then((response:any) => {this.combocounty = response;});
    this.data.getcombo("ComboProv/All").then(resp=>{this.provincelist = resp;});
    this.data.get("ComboDis/All").then(resp=>{this.districtlist = resp;});
    this.data.get("ComboSubdis/All").then(resp=>{
      this.subdistrictlist = resp;
      //this.subdistrictlistall = resp;
      //console.log(resp)
    });
   
  }
  getSchool(){
    this.data.get("Prgschool/All").then(resp=>{
      this.schoollist = resp;        

    });
    
  }
  getComboSch(){
    this.data.getcombo("Comboscho/All").then(resp=>{
      this.schoolidmasterlist = resp 

    });
  }

  dataSave(data:any){
      let parameter: any;
      
    if (data.changes.length != 0) {
      data.cancel = true;
      parameter=data.changes[0]["data"]
  
      switch(data.changes[0]["type"]){
        
        case 'update':
              parameter.keyschoolid = data.changes[0]['key'].schoolid;
              this.data.put('Prgschool/Put', parameter).then(
                  (resp:any) => {
                    this.getSchool();
                    this.alert.Showsuccess();
                      data.component.cancelEditData();
                  }
              );
              break;
  
        case 'insert':
                
                this.data.post('Prgschool/Post', parameter).then(
                      (resp:any) => {
                        this.getSchool();
                        this.alert.Showsuccess();
                          data.component.cancelEditData();
                      }
              );
              break;
  
        case 'remove':
                this.data.delete('Prgschool/Delete/' + data.changes[0]['key'].schoolid).then(
                    (resp:any) => {
                      this.getSchool();
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

  gencode(){
    //console.log(String("123456789").substring(0, 2),String("123456789").substring(2, 4))
    let tmp = this.schoollist.filter((r)=> r.schoolcode.substring(2, 4) == this.provinceid &&  r.schoolcode.substring(0, 2) == this.schooltype);
    if(tmp.length > 0){
      return  String(this.schooltype).padStart(2, '0') + String(this.provinceid).padStart(2, '0') + String(Number(tmp.sort((a,b)=> b.schoolcode - a.schoolcode)[0].schoolcode.substring(4)) + 1).padStart(4, '0');
    }else{
      return  String(this.schooltype).padStart(2, '0') + String(this.provinceid).padStart(2, '0') + String(1).padStart(4, '0');
    }
   
  }

   setSchooltypeValue(rowData: any, value: any): void {
        this.schooltype = value;
        rowData.schooltype  = value;
        rowData.schoolcode = this.gencode();
        //rowData.setValue(value);
        // (<any>this).defaultSetCellValue(rowData, value);
  }

   setProvinceValue(rowData: any, value: any): void {
        rowData.schooldistrict = null;
        rowData.schoolsubdistrict = null;
        rowData.schoolzipcode = null;
        rowData.schoolprovinceid  = value;
        this.provinceid = value;
        rowData.schoolcode = this.gencode();
        //rowData.setValue(value);
        // (<any>this).defaultSetCellValue(rowData, value);
    }


    setDistrictValue(rowData: any, value: any): void {
        rowData.schoolsubdistrict = null;
        rowData.schoolzipcode = null;
        rowData.schooldistrict  = value;
        // (<any>this).defaultSetCellValue(rowData, value);
    }
    setSubdistrictValue(rowData: any, value: any): void {
        rowData.schoolsubdistrict = value;
        rowData.schoolzipcode = this.subdistrictlist?.filter((r) => r.comboid == value)[0]?.keystr1id;
    }



    getFilteredDistrict(options: any) {
         return {
            store: this.districtlist,
            filter: options.data ? ['key1id', '=', options.data.schoolprovinceid] : null,
        };
    }

     getFilteredSubDistrict(options: any) {
        return {
            store: this.subdistrictlist,
            filter: options.data ? ['key1id', '=', options.data.schooldistrict] : null,
        };
    }

     getOzipcode(sdid: any) {
        return new Promise((resolve) => {
            this.data.get('Subdis/Getsubdisbysubdisid/' + sdid).then((response: any) => {
              
                if (response.length > 0) {
                  
                    resolve(response[0].zipcode);
                } else {
                    resolve('');
                }
            });
        });
    }

     updatedatafrom(eventData:any, cellInfo: any) {  
        if (cellInfo.setValue) {  
          cellInfo.setValue(eventData.value);  
        }  
    }
}
