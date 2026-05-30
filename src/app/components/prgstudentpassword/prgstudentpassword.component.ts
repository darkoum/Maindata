import { Component, OnInit, Pipe, ViewChild } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { AccountService } from "../../services/account.service";
import { Encrypt } from "../../shareds/encrypt";
import notify from "devextreme/ui/notify";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import { AlertService } from "../../services/alert.service";
import { UtilService } from "../../services/util.service";
import { DxButtonTypes } from "devextreme-angular/ui/button";
import { DxTextBoxTypes } from "devextreme-angular/ui/text-box";
import { DxFormComponent, DxValidatorComponent } from "devextreme-angular";

@Pipe({
  name: "identitycard",
  standalone: false,
})
export class IdentityPipe {
  // 0-0000-00000-00-0
  transform(inputVal: string) {
    const one = inputVal.slice(0, 1);
    const two = inputVal.slice(1, 5);
    const three = inputVal.slice(5, 10);
    const four = inputVal.slice(10, 12);
    const five = inputVal.slice(12, 14);
    return `${one}-${two}-${three}-${four}-${five}`;
  }
}
@Component({
    standalone: false,
  selector: "app-prgstudentpassword",
  templateUrl: "./prgstudentpassword.component.html",
  styleUrls: ["./prgstudentpassword.component.css"],
})
export class PrgstudentpasswordComponent implements OnInit {
  // @ViewChild("targetValidator", { static: false })
  @ViewChild('formRef') formRef: DxFormComponent;
  validator: DxValidatorComponent;
  loadingVisible: boolean = false;
  passwordComparison = () => this.changepassworddata.password;
  passwordMode: DxTextBoxTypes.TextBoxType = "password";
  passwordButton: DxButtonTypes.Properties = {
    icon: "eyeopen",
    stylingMode: "text",
    onClick: () => {
      this.passwordMode = this.passwordMode === "text" ? "password" : "text";
    },
  };
  changepassworddata: any = {
    studentid: '',
    studentcode: '',
    password: "",
    confirm_password: "",
    usertype: 0
  };
  test: any;
  constructor(
    private data: HttpService,
    private encrypt: Encrypt,
    private alert: AlertService
  ) {
    locale("th");
  }

  ngOnInit(): void { }
  onPasswordChange(e: any) {
    this.changepassworddata.password = e.event.currentTarget.value;
  }
  onCPasswordChange(e: any) {
    this.changepassworddata.confirm_password = e.event.currentTarget.value;
  }

  onInput(e: any) {
    this.changepassworddata.name = ''
    const input = e.event.currentTarget;
    if (this.isNumeric(input.value) == false) {
      input.value = input.value.replace(/\D/g, '')
    }
    // this.data.get(`Tmpapplicantmember/Getmemberbycode/${input.value}`).then((resp: any) => {
    this.data.get(`Prgstudentpassword/Getstudentidbycode/${input.value}`).then((resp: any) => {
      if (resp.length == 0) {
        this.alert.Showerror('ไม่พบรหัสนักศึกษา')
      } else {
        this.changepassworddata.studentid = resp[0].studentid;
        this.changepassworddata.password = resp[0].password;
        this.changepassworddata.confirm_password = resp[0].password;
        this.changepassworddata.sname = resp[0].sname;
        this.changepassworddata.levelname = resp[0].levelname;
        this.changepassworddata.programname = resp[0].programname;
        
      }
      // console.log(resp)
    })
  }
  isNumeric(value: any): boolean {
    return !isNaN(value) && value !== '';
  }
  onFormSubmit(e: any) {
    // console.log(e);
    // console.log(this.formRef.instance.validate())
    // console.log("b",this.changepassworddata);
    // this.changepassworddata.applicantid = 'q'

    if (this.formRef.instance.validate().isValid) {
      this.data.post(`Prgstudentpassword/Post`, this.changepassworddata).then((resp: any) => {
        //console.log('pwd:', resp);
        if (resp.result == 'Saved') {
          this.alert.Showsuccess()
          //console.log("changepassworddata new", this.changepassworddata)
        }
      })
    }
  }
}
