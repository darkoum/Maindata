import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-student-selector',
  standalone: false,
  templateUrl: './student-selector.component.html',
  styleUrl: './student-selector.component.css'
})
export class StudentSelectorComponent {
  @Input() tmpstudentcode: string;
  @Input() visible: boolean = false;
  @Input() textstudentcode = new EventEmitter<string>()
  @Input() disabled: boolean = false
  @Output() onValueChanged = new EventEmitter<string>()

  students: any = []
  //tmpstudentcode: string = ''
  studentname: string = ''
  studentsurname: string = ''
  load: boolean = false
  showSelector: boolean = false
  searchBtn: DxButtonTypes.Properties = {
    icon: 'user',
    stylingMode: 'text',
    onClick: () => {
      this.showSelector = true
    },
  };

  constructor(private http: HttpService, private util: UtilService, private alert: AlertService) {
  }
  ngOnInit(): void {
  }
  getstu() {
    if(this.tmpstudentcode != '' || this.studentname != '' || this.studentsurname != ''){
      this.load = true
      this.http.get(`Prgstudentselector/All/${this.util.ntb(this.tmpstudentcode)}/${this.util.ntb(this.studentname)}/${this.util.ntb(this.studentsurname)}`).then((resp: any) => {
        this.students = resp
        this.load = false
      })
    } else {
      this.alert.MsgBoxCritical('กรุณาระบุเงื่อนไข');
    }
  }
  onRowDblClick(e: any) {
    
    const selectedCode = e.data?.studentcode;
    this.tmpstudentcode = e.data?.studentcode;
    if (selectedCode) {
      //console.log(e,e.data?.studentcode)
      this.onValueChanged.emit(selectedCode)
      this.textstudentcode = selectedCode
      this.showSelector = false
    }
  }
  onChanged(){
    this.onValueChanged.emit(this.tmpstudentcode)
  }
}
