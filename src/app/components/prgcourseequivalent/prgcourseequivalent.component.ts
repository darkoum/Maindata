import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { AccountService } from './../../services/account.service';
import { Encrypt } from './../../shareds/encrypt';
import notify from 'devextreme/ui/notify';
import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import { AlertService } from './../../services/alert.service';
import { throws } from 'assert';

@Component({
    standalone: false,
  selector: 'app-prgcourseequivalent',
  templateUrl: './prgcourseequivalent.component.html',
  styleUrls: ['./prgcourseequivalent.component.css']
})
export class PrgcourseequivalentComponent implements OnInit {
  courseequivalentlist: any;
  tmpProgramid: any;
  tmpCourseid: any;
  tmpproid: any;
  tmpcouid: any;
  tmpCourseequivalentid: any;
  popupVisible = false;
  loadingVisible = false;
  notification: any;
  editmodeopen: boolean = false;
  coulist: any[] = [];
  //coulist2: any[] = [];
  constructor(private data: HttpService, private encrypt: Encrypt,private alert: AlertService) {}

  ngOnInit(): void {
    this.data.getcombo('ComboCou/Combocouopen').then((resp) => {this.coulist = resp;});
    //this.data.get('ComboCou/Combocouopen').then((resp) => {this.coulist2 = resp;});
    this.getCouequ();

  }
  getCouequ() {
    this.loadingVisible = true;
    this.data.get('Prgcourseequivalent/All').then((resp:any) => {
        this.courseequivalentlist = resp;
        this.loadingVisible = false;
    });
  }

  getDefault(e:any) {
    
    e.data.programid = -1;
    e.data.semesterfrom = 0;
    e.data.semesterto = 99999;
    if (sessionStorage.getItem("editmodeopen") == "false") {
      sessionStorage.setItem("editmodeopen", "true");
    }
}

 updateCourse(eventData:any, cellInfo: any) {
    
    if (cellInfo.setValue) {
        cellInfo.setValue(eventData.value);
    }
}
  couequSave(data: any) {
    let parameter: any;
    data.cancel = true;
        if (data.changes.length !== 0) {
            parameter = data.changes[0]['data'];
            
            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keyprogramid = data.changes[0]['key'].programid;
                    parameter.keycourseid = data.changes[0]['key'].courseid;
                    parameter.keycourseequivalentid = data.changes[0]['key'].courseequivalentid;

                    
                    this.data.put('Prgcourseequivalent/Put', parameter).then(
                        (resp:any) => {
                            this.getCouequ();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                    
                    this.data.post('Prgcourseequivalent/Post', parameter).then(
                        (resp:any) => {
                            this.getCouequ();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data
                        .delete(
                            'Prgcourseequivalent/Delete' +
                                '/' +
                                data.changes[0]['key'].programid +
                                '/' +
                                data.changes[0]['key'].courseid +
                                '/' +
                                data.changes[0]['key'].courseequivalentid
                        )
                        .then(
                            (resp:any) => {
                                this.getCouequ();
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
    
    if (!this.editmodeopen) {
        this.tmpProgramid = data.selectedRowKeys[0].programid;
        this.tmpCourseid = data.selectedRowKeys[0].courseid;
        this.tmpCourseequivalentid = data.selectedRowKeys[0].courseequivalentid;
    } else {
        alert('คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข');
    }
}

Showerror(message:any, type:any) {
    let option = {
        message: message,
    };
    notify(option, type, 5000);
}
onCancelEditmode() {
    this.editmodeopen = false;
}


onEditstart(e:any) {
    
    if (!this.editmodeopen) {
        this.editmodeopen = true;
    } else {
        alert('คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข');
        e.cancel = true;
    }
}
}
