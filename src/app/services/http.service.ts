import { jwtDecode as decode } from 'jwt-decode';
import { AlertService } from 'src/app/services/alert.service';
import { Encrypt } from './../shareds/encrypt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilService } from './util.service';
import { DatePipe } from '@angular/common';

import { Buffer } from 'buffer';
import * as zlib from './node-zlib.js';

(globalThis as any).Buffer = Buffer;
(window as any).Buffer = Buffer;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseurl = 'https://' + window.location.hostname + '/regapi/api/';
  private reporturl = 'https://' +  window.location.hostname + '/E-RegReportReg/ReportGenerator.aspx';

   //user = {};
    user = { username: 'avsreg', password: 'xxx' };

  constructor(private http: HttpClient, private encrypt: Encrypt,  private alert: AlertService, private util: UtilService ) {
    this.getIPAddress();

    if (window.location.hostname == 'localhost') {
        this.baseurl = 'https://vnstaff.rsu.ac.th/regapi/api/';
        this.reporturl = 'https://vnstaff.rsu.ac.th/E-RegReportReg/ReportGenerator.aspx';
    }
  }

  public ip;

  getcombo(url: string): any {
    return new Promise((resolve) => {
      this.http
        .get(`${this.baseurl}${url}`, this.gettoken())
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe(
          (res: any) => {
            if(res?.resultgzip){
              const resz = zlib.gunzipSync(Buffer.from(res.resultgzip, 'base64'));
              resolve({ paginate: true, pageSize: 10, store: JSON.parse(resz.toString()) });
            }else{
              resolve({ paginate: true, pageSize: 10, store: res });
            }
          },
          (error: any) => {
            // console.log(`${this.baseurl}${url}`,error);
            if (error.status === 401) {
              this.alert.dialogbox(error.error.result);
            } else {
              this.alert.Showerror(error.error.result);
            }
            resolve(null); // ← always resolve so await never hangs
          }
        );
    });
  }

  get(url: string): any {

    return new Promise((resolve) => {
      this.http
        .get(`${this.baseurl}${url}`, this.gettoken())
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe(
          (res: any) => {
            
            if(res?.resultgzip){
              const resz = zlib.gunzipSync(Buffer.from(res.resultgzip, 'base64'));
             
              resolve(JSON.parse(resz.toString()));
            }else{
              resolve(res);
            }
            //resolve(res);
          },
          (error: any) => {
            console.log(error);
            const result = error?.error?.result?.split(':');
            if ( error.status === 401 || result?.[0] === 'ORA-28000' || result?.[0] === 'ORA-01017') {
              if (window.location.hostname == 'localhost') {
                this.post('Account/Login', this.user).then((resp) => {
                  sessionStorage.setItem('token', resp.token);
                  sessionStorage.setItem('repclientid', resp.session);
                  sessionStorage.setItem('fullname', resp.fullname);
                  sessionStorage.setItem('repclientid', resp.session);
                });
              } else {
                this.alert.dialogbox(error.error.result);
              }
            } else {
              this.alert.Showerror(error.error.result);
            }
            resolve(null); // ← always resolve so await never hangs
          }
        );
    });
  }

  post(url: string, body: any): any {
    return new Promise((resolve,reject) => {
      let that = this;
      var replacer = function (this: any, key: any, value: any) {
        var returnVal = value;
        if (this[key] instanceof Date) {
          returnVal = that.util.getdatetimeformatora(value);
        }
        return this[key] === undefined ? null : returnVal;
      };
      this.http
        .post(
          `${this.baseurl}${url}`,
          '{"param" : "' +
          this.encrypt.encryptData(JSON.stringify(body, replacer)) +
          '"}',
          this.gettoken()
        )
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe(
          (res: any) => {
            if (!res?.result?.error) {
              resolve(res);
            } else {
              this.alert.Showerror(res.result.error);
              reject(res.result.error);
              //resolve(res);
            }
          },
          (error: any) => {
            console.log(error)
            const result = error?.error?.result?.split(':');

            if ( error.status === 401 || result?.[0] === 'ORA-28000' ||  result?.[0] === 'ORA-01017') {
              this.alert.dialogbox(error.error.result);
            } else {
              this.alert.Showerror(error.error.result);
            }
            //resolve(error);
          }
        );
    });
  }

  put(url: string, body: any): any {
    return new Promise((resolve,reject) => {
      let that = this;
      var replacer = function (this: any, key: any, value: any) {
        var returnVal = value;
        if (this[key] instanceof Date) {
          returnVal = that.util.getdatetimeformatora(value);
        }
        return this[key] === undefined ? null : returnVal;
      };
      this.http
        .put(
          `${this.baseurl}${url}`,
          '{"param" : "' +
          this.encrypt.encryptData(JSON.stringify(body, replacer)) +
          '"}',
          this.gettoken()
        )
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe(
          (res: any) => {
            if (!res?.result?.error) {
              resolve(res);
            } else {
              this.alert.Showerror(' ' + res.result.error);
              reject(res.result.error);
              
            }
          },
          (error: any) => {
             console.log(error)
            const result = error?.error?.result?.split(':');
            
            if ( error.status === 401 || result?.[0] === 'ORA-28000' ||  result?.[0] === 'ORA-01017') {
              this.alert.dialogbox(error.error.result);
            } else {
              this.alert.Showerror(error.error.result);
            }
          }
        );
    });
  }

  delete(url: string): any {
    return new Promise((resolve,reject) => {
      this.http
        .delete(`${this.baseurl}${url}`, this.gettoken())
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe(
          (res: any) => {
            if (!res?.result?.error) {
              resolve(res);
            } else {
              this.alert.Showerror(res.result.error);
              reject(res.result.error);
            }
          },
          (error: any) => {
            console.log(error)
            const result = error?.error?.result?.split(':');

            if (error.status === 401 || result?.[0] === 'ORA-28000' || result?.[0] === 'ORA-01017') {
              this.alert.dialogbox(error.error.result);
            } else {
              this.alert.Showerror(error.error.result);
            }
            //resolve(this.handelError(error));
          }
        );
    });
  }

  upload(url: string, body: any): any {
    return new Promise((resolve,reject) => {
      this.http
        .post(
          `${this.baseurl}${url}`,
          body,
          //this.gettoken()
          this.getHeader()
        )
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe(
          (res: any) => {
            if (!res?.result?.error) {
              resolve(res);
            } else {
              this.alert.Showerror(res.result.error);
              reject(res.result.error);
              //resolve(res);
            }
          },
          (error: any) => {
            //console.log(`${this.baseurl}${url}`, error);
            const result = error?.error?.result?.split(':');

            if ( error.status === 401 || result?.[0] === 'ORA-28000' ||  result?.[0] === 'ORA-01017' ) {
              this.alert.dialogbox(error.error.result);
            } else {
              this.alert.Showerror(error.error.result);
            }
            resolve(error);
          }
        );
    });
  }

  getfile(url: string): any {
    return new Promise((resolve) => {
      this.http
        .get(`${this.baseurl}${url}`, this.getHeaderGet())
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (error: any) => {
            
            const result = error?.error?.result?.split(':');
            if (error.status === 401 || result?.[0] === 'ORA-28000' || result?.[0] === 'ORA-01017' ) {
              this.alert.dialogbox(error.error.result);
            } else {
              this.alert.Showerror(error.error.result);
            }
          }
        );
    });
  }

  postfile(url: string, body: any): any {
    return new Promise((resolve) => {
      this.http
        .post(`${this.baseurl}${url}`,
          '{"param" : "' +
          this.encrypt.encryptData(JSON.stringify(body)) +
          '"}', this.getHeader())
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (error: any) => {
            
            const result = error?.error?.result?.split(':');
            if (error.status === 401 || result?.[0] === 'ORA-28000' || result?.[0] === 'ORA-01017' ) {
              this.alert.dialogbox(error.error.result);
            } else {
              this.alert.Showerror(error.error.result);
            }
          }
        );
    });
  }

  getHeaderGet() {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: 'Bearer ' + sessionStorage.getItem('token'), 'Content-Type': 'application/zip', Accept: '*/*',
        'Access-Control-Allow-Headers':
          'origin,X-Requested-With,content-type,accept',
      }),
    };
    return httpOptions;
  }

  getHeader() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        Accept: '*/*',
        'Access-Control-Allow-Headers':
          'origin,X-Requested-With,content-type,accept',
      }),
    };
    return httpOptions;
  }
  gettoken() {
    if (localStorage.getItem('token')) {
      
      localStorage.removeItem('token');
      localStorage.removeItem('repclientid');
      localStorage.removeItem('fullname');

      localStorage.removeItem('sysmenuid');
      localStorage.removeItem('menuname');
      localStorage.removeItem('menucalling');
      localStorage.removeItem('menurepform');
      localStorage.removeItem('documentid');
      localStorage.removeItem('menugroupname');
      localStorage.removeItem('logkeeping');

    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Content-Encoding':'gzip'}).set(
        'Authorization',
        'Bearer ' + sessionStorage.getItem('token')
      ),
    };
    return httpOptions;
  }

  private handleError(errResponse: HttpErrorResponse): Observable<any> {
    errResponse['Message'] = errResponse.message;
    if (errResponse.error && errResponse.error.message) {
      // tslint:disable-next-line:no-string-literal
      errResponse['Message'] = errResponse.error.message;
    }
    throw errResponse;
  }
  getreportserver() {
    return this.reporturl;
  }
  getsystemname() {
    return 'ระบบฐานข้อมูลหลัก';
  }
  getsystemnameeng() {
    return 'Maindata';
  }
  public getIPAddress() {
    return new Promise((resolve) => {
      this.http
        .get(`https://api.ipify.org/?format=json`)
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe((res: any) => {
          resolve((this.ip = res.ip));
        });
    });
    // return this.http.get('http://api.ipify.org/?format=json');
  }

  repprint(
    reptype: any,
    repfilename: any,
    repwhere: any[],
    repparameter: any,
    repsysusertemp: any[]
  ) {
    
    /* let dbLogin = decode(localStorage.getItem('token')); */
    this.post('repReport/Post',{systemname: this.getsystemnameeng(),documentid:sessionStorage.getItem('documentid').replace(':', '-'),repfilename: repfilename}).then((resp: any) => {});
    
    let dbLogin: any = decode(sessionStorage.getItem('repclientid') as string);

    var form = document.createElement('form');
    if(localStorage.getItem('dev') || window.location.hostname == 'localhost'){
      form.setAttribute('method', 'get');
    }else{
      form.setAttribute('method', 'post');
    }
    form.setAttribute('target', '_blank');
    form.setAttribute('action', this.reporturl);

    var hiddenField1 = document.createElement('input');
    hiddenField1.setAttribute('type', 'hidden');
    hiddenField1.setAttribute('name', 'repfilename');
    hiddenField1.setAttribute('value', repfilename);
    form.appendChild(hiddenField1);

    var hiddenField1 = document.createElement('input');
    hiddenField1.setAttribute('type', 'hidden');
    hiddenField1.setAttribute('name', 'systemname');
    hiddenField1.setAttribute('value', this.getsystemnameeng());
    form.appendChild(hiddenField1);

    var hiddenField1 = document.createElement('input');
    hiddenField1.setAttribute('type', 'hidden');
    hiddenField1.setAttribute('name', 'repname');
    hiddenField1.setAttribute(
      'value',
      this.util.repinit(sessionStorage.getItem('menuname'))
    );
    form.appendChild(hiddenField1);

    var hiddenField2 = document.createElement('input');
    hiddenField2.setAttribute('type', 'hidden');
    hiddenField2.setAttribute('name', 'reptype');
    hiddenField2.setAttribute('value', reptype);
    form.appendChild(hiddenField2);

    let where = '';
    if (repwhere.length > 0) {
      var keyssub = [];
      var keys = Object.keys(repwhere[0]);
      keys.forEach((r) => {
        if (
          (repwhere[0][r] != undefined &&
            repwhere[0][r] != '' &&
            repwhere[0][r] != null) ||
          repwhere[0][r] === 0
        ) {
          //console.log(repwhere[0][r]);
          keyssub = [];
          if (String(repwhere[0][r])?.indexOf(']') > 0) {
            keyssub = Object.keys(repwhere[0][r]);
          }
          if (keyssub.length > 0) {
            if (
              repwhere[0][r][keyssub[0]] ||
              repwhere[0][r][keyssub[0]] === 0
            ) {
              if (
                repwhere[0][r][keyssub[keyssub.length - 1]] &&
                keyssub.length != 1
              ) {
                let whr = '';
                keyssub.forEach((x) => {
                  var keyssubx = [];
                  if (String(repwhere[0][r][x])?.indexOf(']') > 0) {
                    keyssubx = Object.keys(repwhere[0][r][x]);
                  }
                  if (keyssubx.length > 0) {
                    if (repwhere[0][r][x][keyssubx[0]]) {
                      switch (keyssubx[0]) {
                        case 'date': {
                          const datepipe: DatePipe = new DatePipe('en-US');
                          let formattedDate = datepipe.transform(
                            repwhere[0][r][x][keyssubx[0]],
                            'YYYY-MM-dd'
                          );
                          whr +=
                            ' ' +
                            x +
                            " to_date('" +
                            formattedDate +
                            "','YYYY-MM-DD')";
                          break;
                        }
                        case 'datetime': {
                          const datepipe: DatePipe = new DatePipe('en-US');
                          let formattedDate = datepipe.transform(
                            repwhere[0][r][x][keyssubx[0]],
                            'YYYY-MM-dd HH:mm:ss'
                          );
                          whr +=
                            ' ' +
                            x +
                            " to_date('" +
                            formattedDate +
                            "','YYYY-MM-DD HH24:MI:SS')";
                          break;
                        }
                      }
                    }
                  } else {
                    if (repwhere[0][r][x]) {
                      //where += (where == '' ? '' : ' and ') + r + '';
                      whr += ' ' + x + ' ' + this.getval(repwhere[0][r][x]);
                    }
                  }
                });
                if (whr != '') {
                  where += (where == '' ? '' : ' and ') + r + ' ' + whr;
                }
              } else {
                switch (keyssub[0]) {
                  case 'strx': {
                    where +=
                      (where == '' ? '' : ' and ') +
                      r +
                      '' +
                      repwhere[0][r][keyssub[0]] +
                      '';
                    break;
                  }
                  case 'date': {
                    const datepipe: DatePipe = new DatePipe('en-US');
                    let formattedDate = datepipe.transform(
                      repwhere[0][r][keyssub[0]],
                      'YYYY-MM-dd'
                    );
                    where +=
                      (where == '' ? '' : ' and ') +
                      r +
                      "=to_date('" +
                      formattedDate +
                      "','YYYY-MM-DD')";
                    break;
                  }
                  case 'datetime': {
                    const datepipe: DatePipe = new DatePipe('en-US');
                    let formattedDate = datepipe.transform(
                      repwhere[0][r][keyssub[0]],
                      'YYYY-MM-dd HH:mm:ss'
                    );
                    where +=
                      (where == '' ? '' : ' and ') +
                      r +
                      "=to_date('" +
                      formattedDate +
                      "','YYYY-MM-DD HH24:MI:SS')";
                    break;
                  }
                  default: {
                    if (keyssub.length != 1) {
                      where +=
                        (where == '' ? '' : ' and ') +
                        r +
                        '=' +
                        this.getval(repwhere[0][r][keyssub[0]]) +
                        '';
                    } else {
                      where +=
                        (where == '' ? '' : ' and ') +
                        r +
                        '' +
                        keyssub[0] +
                        '' +
                        this.getval(repwhere[0][r][keyssub[0]]) +
                        '';
                    }
                  }
                }
              }
            }
          } else {
            if (r == 'strx') {
              where += (where == '' ? '' : ' and ') + repwhere[0][r];
            } else {
              where +=
                (where == '' ? '' : ' and ') +
                r +
                '=' +
                this.getval(repwhere[0][r]);
            }
          }
        }
      });
    }
    //console.log("val :" + typeof (repwhere[0][r]));
    //console.log(where);
    var hiddenField3 = document.createElement('input');
    hiddenField3.setAttribute('type', 'hidden');
    hiddenField3.setAttribute('name', 'repwhere');
    hiddenField3.setAttribute('value', where);
    form.appendChild(hiddenField3);

    var hiddenField3 = document.createElement('input');
    hiddenField3.setAttribute('type', 'hidden');
    hiddenField3.setAttribute('name', 'repclientid');
    hiddenField3.setAttribute('value', sessionStorage.getItem('sysmenuid') + '_' + dbLogin['repclientid']);
    form.appendChild(hiddenField3);

    var hiddenField4 = document.createElement('input');
    hiddenField4.setAttribute('type', 'hidden');
    hiddenField4.setAttribute('name', 'repparameter');
    hiddenField4.setAttribute('value', `sysMenuGroup:${sessionStorage.getItem('menugroupname')} (${sessionStorage
        .getItem('documentid')!
        .replace(':', '-')});sysLogin:รหัสผู้ใช้งาน ${dbLogin['username']
      }${repparameter}`
    );
    /*  hiddenField4.setAttribute('value', 'sysMenuGroup:' + localStorage.getItem('menugroupname') + ' (' + localStorage.getItem('documentid')?.replace(':', '-') +
        ');sysLogin:รหัสผู้ใช้งาน ' +
        dbLogin['username'] +
        repparameter
    ); */
    form.appendChild(hiddenField4);

    document.body.appendChild(form);

    if (repsysusertemp.length > 0) {
      this.post('Sysusetem/Posttemp/' + sessionStorage.getItem('sysmenuid'), repsysusertemp[0]).then((resp: any) => {
        form.submit();
      });
    } else {
      form.submit();
    }
  }

  getval(val:any) {
    if(val == '0'){
        val = 0;
       }

    switch (typeof val) {
      case 'string': {
        return "'" + val?.replace('*', '%') + "'";
      }
      case 'number': {
        return '' + val;
      }
      default: {
        return '' + val;
      }
    }
  }



}
