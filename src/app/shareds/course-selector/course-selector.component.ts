import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-course-selector',
  standalone: false,
  templateUrl: './course-selector.component.html',
  styleUrl: './course-selector.component.css'
})
export class CourseSelectorComponent {
  @Input() tmpCoursecode: string;
  @Input() visible: boolean = false;
  @Input() textcoursecode = new EventEmitter<string>()
  @Input() disabled: boolean = false
  @Output() onValueChanged = new EventEmitter<string>()
  @Input() stateClear: boolean = false

  courses: any = []
  facultylist: any = []
  departmentlist: any = []
  //tmpstudentcode: string = ''
  // studentname: string = ''
  // studentsurname: string = ''
  coursename: string = ''
  load: boolean = false
  showSelector: boolean = false
  facultyid: number = +sessionStorage.getItem('enfacultyid')
  departmentid: number = +sessionStorage.getItem('endepartmentid')
  searchBtn: DxButtonTypes.Properties = {
    icon: 'fa fa-book',
    stylingMode: 'text',
    onClick: () => {
      this.showSelector = true
    },
  };

  constructor(private http: HttpService, private util: UtilService, private alert: AlertService) {
  }
  ngOnInit(): void {
    // this.getfaclst()
  }
  getfaclst() {
    this.http.getcombo(`ComboFac/All`).then((resp: any) => {
      this.facultylist = resp
    })
  }
  getdeplst() {
    this.http.getcombo(`ComboDep/GetbyFac/${this.util.ntz(this.facultyid)}`).then((resp: any) => {
      this.departmentlist = resp
    })
  }
  getCourse() {
    if(this.util.ntz(this.facultyid) != -9 || this.util.ntz(this.departmentid) != -9 || this.tmpCoursecode != '' || this.coursename != ''){
      this.load = true
      this.http.get(`Prgcourseselector/All/${this.util.ntz(this.facultyid)}/${this.util.ntz(this.departmentid)}/${this.util.ntb(this.tmpCoursecode)}/${this.util.ntb(this.coursename)}`).then((resp: any) => {
        this.courses = resp
        this.load = false
      })
    } else {
      this.alert.MsgBoxCritical('กรุณาระบุเงื่อนไข');
    }
  }
  onRowDblClick(e: any) {
    
    const selectedCode = e.data?.coursecode;
    this.tmpCoursecode = e.data?.coursecode;
    if (selectedCode) {
      //console.log(e,e.data?.studentcode)
      this.onValueChanged.emit(selectedCode)
      this.textcoursecode = selectedCode
      this.showSelector = false
    }
  }
  onChanged(){
    this.onValueChanged.emit(this.tmpCoursecode)
  }
}
