import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  datepipe: any;

  constructor() {}

  getdateformatora(datex: Date) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let date;
    if (datex instanceof Date) {
      date = datex;
    }else{
      date = new Date(datex);
    }
    //let formattedDate = datepipe.transform(date, 'YYYY-MM-dd');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return year + '-' + month + '-'  + day;
  }
  
  getdatetimeformatora(datex:any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let date;
    if (datex instanceof Date) {
      date = datex;
    }else{
      date = new Date(datex);
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    let formattedDate = year + '-' + month + '-'  + day + ' ' + datepipe.transform(date, 'HH:mm:ss');
    return formattedDate;
  }

  // getdateformatora(date:any) {
  //   const datepipe: DatePipe = new DatePipe('en-US');
  //   let formattedDate = datepipe.transform(date, 'YYYY-MM-dd');
  //   return formattedDate;
  // }
  
  // getdatetimeformatora(date:any) {
  //   const datepipe: DatePipe = new DatePipe('en-US');
  //   let formattedDate = datepipe.transform(date, 'YYYY-MM-dd HH:mm:ss');
  //   return formattedDate;
  // }

  getdateformat(date:any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(date, 'ddMMYYYY');
    return formattedDate;
  }

  getdatetimeformat(date:any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(date, 'ddMMYYYY HH:mm:ss');
    return formattedDate;
  }
    
 /* 
 
 
 
  getshortdateformat(date) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(date, 'ddMMYYYY');
    return formattedDate;
  }
  
  getdatethformat(date) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(date, 'ddMMYYYY HH:mm:ss');
    return (
      formattedDate.substring(0, 4) +
      (+formattedDate.substring(4, 8) + 543) +
      formattedDate.substring(8)
    );
  } */

  ntz(val): number {
    if (val == undefined || val == null ) {
      return -9;
    } else {
      return val;
    }
  }
  // ntx(val): number {
  //   if (val == undefined || val == null || val == '') {
  //     return -9;
  //   } else {
  //     return val;
  //   }
  // }

  ntb(val): string {
    if (!val || val == null || val == '') {
      return 'null';
    } else {
      return val;
    }
  }
  repinit(menucall: string): string {
    let tmpnum: number = menucall?.indexOf('[');
    if (tmpnum > 0) {
      return menucall.substring(0, tmpnum - 1)?.trim();
    } else {
      return menucall?.trim();
    }
  }
}
