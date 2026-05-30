import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GetdataService {
    constructor() {}
    getacadyear() {
        return sessionStorage?.getItem('maacadyear');
    }
    getsemester() {
        return sessionStorage?.getItem('masemester');
    }
    getsysacadyear() {
        return sessionStorage?.getItem('sysacadyear');
    }
    getsyssemester() {
        return sessionStorage?.getItem('syssemester');
    }
    getvisibleload() {
        return sessionStorage?.getItem('visibleload');
    }

    geteditmodeopen(){
        return sessionStorage.getItem('editmodeopen');
    }
    private _classgrid = {'editcell1 editcell2 editcell3': false};
    getclassgrid(){
        this._classgrid['editcell1 editcell2 editcell3'] = this.geteditmodeopen() == 'true';
        return this._classgrid;
    }

}
