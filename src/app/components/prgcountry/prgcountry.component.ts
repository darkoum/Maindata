import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
    selector: 'app-prgcountry',
    templateUrl: './prgcountry.component.html',
    styleUrls: ['./prgcountry.component.css'],
})
export class PrgcountryComponent implements OnInit {
    countrylist: any;
    editmodeopen: boolean = false;
    constructor(private data: HttpService,private alert:AlertService) {}

    ngOnInit(): void {
        this.countrylist=[];
        this.getCountry();
    }

    getCountry() {
        this.data.get('Prgcountry/All').then((resp:any) => {this.countrylist = resp;});
    }

    dataSave(data: any) {
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];
            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keycountryid = data.changes[0]['key'].countryid;
                    this.data.put('Prgcountry/Put', parameter).then(
                        (resp:any) => {
                            this.getCountry();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                  
                    this.data.post('Prgcountry/Post', parameter).then(
                        (resp:any) => {
                            this.getCountry();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data.delete('Prgcountry/Delete/' + data.changes[0]['key'].nationid).then(
                        (resp:any) => {
                            this.getCountry();
                            this.alert.Showsuccess();
                        }
                    );
                    data.component.cancelEditData();
                    break;
            }
        }
    }
   
    onInsertingstart(e:any){

        if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
          }
        else{
             e.cancel = true 
         }
      }
    
    onToolbarPreparing(e:any) {
        e.toolbarOptions.items[0].showText = 'always';
        e.toolbarOptions.items.unshift({
            location: 'before',
            template: 'tableName',
        });
    }
}
