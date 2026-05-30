import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {AlertService} from '../../services/alert.service';
@Component({
    standalone: false,
    selector: 'app-prgnation',
    templateUrl: './prgnation.component.html',
    styleUrls: ['./prgnation.component.css'],
})
export class PrgnationComponent implements OnInit {
    nationlist: any;
    editmodeopen: boolean = false;
    constructor(private data: HttpService,private alert:AlertService) {}

    ngOnInit(): void {
        this.nationlist=[];
        this.getNation();
    }

    getNation() {
        this.data.get('Prgnation/All').then((resp:any) => {this.nationlist = resp;});
    }

    dataSave(data: any) {
        let parameter: any;
        
        if (data.changes.length !== 0) {
            data.cancel = true;
            parameter = data.changes[0]['data'];
            switch (data.changes[0]['type']) {
                case 'update':
                    parameter.keynationid = data.changes[0]['key'].nationid;
                    this.data.put('Prgnation/Put', parameter).then(
                        (resp:any) => {
                            this.getNation();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );

                    break;

                case 'insert':
                  
                    this.data.post('Prgnation/Post', parameter).then(
                        (resp:any) => {
                            this.getNation();
                            this.alert.Showsuccess();
                            data.component.cancelEditData();
                        }
                    );
                    break;

                case 'remove':
                    this.data.delete('Prgnation/Delete/' + data.changes[0]['key'].nationid).then(
                        (resp:any) => {
                            this.getNation();
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
