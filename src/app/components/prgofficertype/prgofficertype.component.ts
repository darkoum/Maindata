import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
    standalone: false,
  selector: 'app-prgofficertype',
  templateUrl: './prgofficertype.component.html',
  styleUrls: ['./prgofficertype.component.css']
})
export class PrgofficertypeComponent implements OnInit {

  officertypelist: any;
  officergrouplist: any;
  popupVisible = false;
  notification: any;
  tmpofficertype: any;
  tablename: any;
  columnname: any;

  constructor(private data: HttpService, private alert: AlertService) { }

  ngOnInit(): void {

    this.tablename = "OFFICER";
    this.columnname = "OFFICERTYPE";
    this.getofftype(this.tablename, this.columnname);

    this.data.get('ComboSysbyt/getSysbytedes/OFFICERTYPE/GROUP').then((resp: any) => { this.officergrouplist = resp; });
    // this.getofftypegroup();
  }

  getofftype(tbname: any, colname: any) {
    this.data.get('Prgofficertype/Getbytab/' + tbname + '/' + colname).then(
      (response: any) => {
        this.officertypelist = response;
      }
    );
  }

    getofftypegroup(){
     this.data.get('Prgofficertype/Getbytab/OFFICERTYPE/GROUP').subscribe((resp:any) => {
       this.officergrouplist = resp;
     })
   } 
  getDefault(e: any) {

    if (sessionStorage.getItem('editmodeopen') == "false") {

      sessionStorage.setItem('editmodeopen', 'true');
      e.data.tablename = this.tablename;
      e.data.columnname = this.columnname;

    }

  }

  offtypeSave(data: any) {

    let parameter: any;
    
    if (data.changes.length !== 0) {
      data.cancel = true;
      parameter = data.changes[0]['data'];

      switch (data.changes[0]['type']) {
        case 'update':
          parameter.keytablename = data.changes[0]['key'].tablename;
          parameter.keycolumnname = data.changes[0]['key'].columnname;
          parameter.keybytecode = data.changes[0]['key'].bytecode;

          this.data.put('Prgofficertype/Put', parameter).then(
            (resp: any) => {
              this.getofftype(this.tablename, this.columnname);
              this.alert.Showsuccess();

              data.component.cancelEditData();
            }
          );

          break;

        case 'insert':
          parameter.tablename = this.tablename;
          parameter.columnname = this.columnname;
          this.data.post('Prgofficertype/Post', parameter).then(
            (resp: any) => {
              this.getofftype(this.tablename, this.columnname);
              this.alert.Showsuccess();
              data.component.cancelEditData();
            }
          );
          break;

        case 'remove':
          this.data.delete('Prgofficertype/Delete' + '/' + data.changes[0]['key'].tablename + '/' + data.changes[0]['key'].columnname + '/' + data.changes[0]['key'].bytecode).then(
            (resp: any) => {
              this.getofftype(this.tablename, this.columnname);
              this.alert.Showsuccess();
            }
          );
          data.component.cancelEditData();
          break;
      }
    }
  }

  deleteRecords() {

  }

  selectionChanged(data: any) {


    if (sessionStorage.getItem('editmodeopen') == "false") {
      this.tmpofficertype = data.selectedRowKeys[0].bytecode

    }

  }

  onCancelEditmode() {
    sessionStorage.setItem('editmodeopen', 'false');
  }
  // onEditstart(e: any) {
  //   //this.editmodeopen = true;
  //   if (!this.editmodeopen) {
  //     this.editmodeopen = true;
  //   } else {
  //     this.alert.Warning(1);
  //     e.cancel = true;
  //   }
  // }
}
