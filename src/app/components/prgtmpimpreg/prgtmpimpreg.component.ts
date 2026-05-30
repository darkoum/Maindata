import { Component, OnInit } from '@angular/core';
import { formatDate,locale } from 'devextreme/localization';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { UtilService } from 'src/app/services/util.service';
import { Encrypt } from 'src/app/shareds/encrypt';

@Component({
    standalone: false,
  selector: 'app-prgtmpimpreg',
  templateUrl: './prgtmpimpreg.component.html',
  styleUrls: ['./prgtmpimpreg.component.css']
})
export class PrgtmpimpregComponent implements OnInit {
  load = false;
  dateselect = new Date();
  tmpimpreglist : any; 

  year = (new Date().getFullYear() + 543);

  constructor(private data: HttpService,
      private alert: AlertService,
      private encrypt: Encrypt,
      private util: UtilService) { }

  ngOnInit() {
    locale('th');

    this.getData()
  }
  
  getData(){
    this.load = true;
    this.data.get("Prgtmpimpreg/getData/" + this.year).then((resp)=>{
            this.tmpimpreglist = resp;
            this.load = false;
    });

  }

  async onProcess(){
    let condition = false
    let parameter : any = {}

    parameter.datatodate = this.util.getdateformatora(this.dateselect)
    parameter.year = this.year

    await this.tmpimpreglist.forEach(e => {
      
        if( (this.year == e.year) && (this.util.getdateformat(this.dateselect) == this.util.getdateformat(e.datatodate)) ){
          this.alert.Showwarning("วันที่บันทึกมีอยู่ในรายการแล้ว");
          condition = true
          return;
        }
    });

    if (!condition) {
      this.data.post("Prgtmpimpreg/post", parameter).then((resp) => {
        this.alert.Showsuccess()
        this.getData()
      });

    }
    

  }

  onSave(data:any){
  this.load = true;

  let parameter: any;
    
  if (data.changes.length != 0) {
    data.cancel = true;
    parameter=data.changes[0]["data"]
    
    switch(data.changes[0]["type"]){
      
        case "insert":
          parameter.year = this.year;
          this.data.post("Prgtmpimpreg/post", parameter).then((resp) => {
            this.alert.Showsuccess();
            this.getData();
            data.component.cancelEditData();
          });
          
          break;
        case 'update':
            parameter.keytmpimpregid = data.changes[0]['key'].tmpimpregid;

            this.data.put("Prgtmpimpreg/put", parameter).then((resp) => {
              this.alert.Showsuccess();
              this.getData();
              data.component.cancelEditData();
            });
        break;

        case 'remove':
              this.data.delete('Prgtmpimpreg/Delete/' + data.changes[0]['key'].tmpimpregid).then(
                  (resp:any) => {
                      this.load = false;
                      this.getData();
                      this.alert.Showsuccess();
                  }
            );
            data.component.cancelEditData();
        break;
     }
  }
  }

  onInsertingstart(e: any) {
    if (sessionStorage.getItem("editmodeopen") == "false") {
      sessionStorage.setItem("editmodeopen", "true");
    } else {
      e.cancel = true;
    }
  }
  
}
