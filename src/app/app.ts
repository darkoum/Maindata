import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { AlertService } from './services/alert.service';
import { GetdataService } from './services/getdata.service';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { BreadcrumbComponent } from './templates/breadcrumb/breadcrumb.component';
import DxThemes from 'devextreme/ui/themes';
import { loadMessages } from 'devextreme/localization';
import { Subject } from 'rxjs';
import dxSelectBox from 'devextreme/ui/select_box';
import dxDataGrid from 'devextreme/ui/data_grid';
import dxLookup from 'devextreme/ui/lookup';
import notify from 'devextreme/ui/notify';

@Component({
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, NavbarComponent, BreadcrumbComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'Maindata';
  syspreapp = 'ma';
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(
    private data: HttpService,
    private alert: AlertService,
    public service: GetdataService
  ) {
    sessionStorage.setItem('syspreapp', this.syspreapp);
    sessionStorage.setItem('editmodeopen', 'false');

    // ── DEV ONLY: mock session บน localhost / GitHub Pages เพื่อข้าม login dialog ──
    const isDemo = window.location.hostname === 'localhost' || window.location.hostname.includes('github.io');
    if (isDemo && !sessionStorage.getItem('token')) {
      sessionStorage.setItem('token', 'dev-mock-token');
      sessionStorage.setItem('fullname', 'Dev User');
      sessionStorage.setItem('repclientid', 'dev-session');
      sessionStorage.setItem('sysmenuid', '0');
      sessionStorage.setItem('menuname', 'home');
      sessionStorage.setItem('menucalling', '');
      sessionStorage.setItem('menurepform', '');
      sessionStorage.setItem('documentid', '');
      sessionStorage.setItem('menugroupname', '');
      sessionStorage.setItem('logkeeping', 'N');
    }
    // ────────────────────────────────────────────────────────────────

    if (localStorage.getItem('token')) {
      sessionStorage.setItem('token', localStorage.getItem('token'));
      sessionStorage.setItem('repclientid', localStorage.getItem('repclientid'));
      sessionStorage.setItem('fullname', localStorage.getItem('fullname'));
      sessionStorage.setItem('sysmenuid', localStorage.getItem('sysmenuid'));
      sessionStorage.setItem('menuname', localStorage.getItem('menuname'));
      sessionStorage.setItem('menucalling', localStorage.getItem('menucalling'));
      sessionStorage.setItem('menurepform', localStorage.getItem('menurepform'));
      sessionStorage.setItem('documentid', localStorage.getItem('documentid'));
      sessionStorage.setItem('menugroupname', localStorage.getItem('menugroupname'));
      sessionStorage.setItem('logkeeping', localStorage.getItem('logkeeping'));

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

    if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
      var result = this.alert.MsgBoxCriticalresult('กรุณา Login');
      result.show().then(() => {
        window.location.href = 'https://' + window.location.hostname + '/Home/';
      });
    }

    this.getdata();
    this.setTimeout();
    this.userInactive.subscribe(() =>
      this.alert.dialogbox('เนื่องจากไม่มีการใช้งานเกิน 1 ชั่วโมง กรุณา login ใหม่')
    );

    loadMessages({
      en: {
        Select: 'เลือก',
        'dxCollectionWidget-noDataText': 'ไม่พบข้อมูล',
        'dxDataGrid-noDataText': 'ไม่พบข้อมูล',
        'dxDataGrid-editingEditRow': 'แก้ไข',
        'dxDataGrid-editingSaveRowChanges': 'บันทึก',
        'dxDataGrid-editingCancelRowChanges': 'ยกเลิก',
        'dxDataGrid-editingDeleteRow': 'ลบ',
        'dxDataGrid-editingConfirmDeleteMessage': 'คุณแน่ใจหรือไม่ว่าต้องการลบบันทึกนี้ ?',
        'dxDataGrid-editingAddRow': 'เพิ่มรายการ',
        'dxPager-infoText': 'หน้า {0} / {1} ({2} รายการ)',
      },
    });

    const that = this;
    dxDataGrid.defaultOptions({
      options: {
        allowColumnResizing: true,
        rowAlternationEnabled: true,
        columnMinWidth: 50,
        hoverStateEnabled: true,
        showBorders: true,
        paging: { pageSize: 15 },
        pager: { showPageSizeSelector: true, allowedPageSizes: [15, 20, 30, 0], showInfo: true, visible: true },
        selection: { mode: 'single' },
        editing: {
          popup: { showTitle: true },
          form: {
            onContentReady: function (e) {
              e.element.getElementsByClassName('dx-responsivebox')[0].style.width = '99%';
            },
          },
        },
        scrolling: { columnRenderingMode: 'virtual', showScrollbar: 'always', useNative: 'false', scrollByThumb: 'true' },
        onEditingStart: function (e) {
          if (sessionStorage.getItem('editmodeopen') == 'false') {
            sessionStorage.setItem('editmodeopen', 'true');
          } else {
            e.cancel = true;
            that.alert.Warning(1);
          }
        },
        onEditCanceling: function () {
          sessionStorage.setItem('editmodeopen', 'false');
        },
        onSelectionChanged: function (e) {
          if (sessionStorage.getItem('editmodeopen') == 'true') {
            e.cancel = true;
            that.alert.Warning(1);
          }
        },
        onToolbarPreparing: function (e) {
          if (e.toolbarOptions.items.length > 0) {
            e.toolbarOptions.items.find((i) => (i.name = 'columnChooserButton')).showText = 'always';
          }
        },
        onRowValidating: function (e) {
          if (e.isValid == false) {
            e.component.focus(e.component.getCellElement(e.component.getRowIndexByKey(e.key), 'invalue'));
          }
        },
        onSaved: function (e) {
          sessionStorage.setItem('editmodeopen', 'false');
        },
      },
    });

    dxSelectBox.defaultOptions({
      options: { valueExpr: 'comboid', displayExpr: 'comboshow', searchMode: 'startswith', searchEnabled: true, showClearButton: true },
    });

    dxLookup.defaultOptions({
      options: { valueExpr: 'comboid', displayExpr: 'comboshow', searchMode: 'startswith', searchEnabled: true, showClearButton: true },
    });
  }

  async getdata() {
    await this.data.get('Syscon/All').then((resp) => {
      resp.forEach((element) => {
        switch (element.config) {
          case 'DEFAULTCAMPUSID': sessionStorage.setItem('macampusid', element.configvalue); break;
          case 'DEFAULTDIVISIONCODE': sessionStorage.setItem('madivisioncode', element.configvalue); break;
          case 'DEFAULTFACULTYID': sessionStorage.setItem('mafacultyid', element.configvalue); break;
          case 'DEFAULTLEVELID': sessionStorage.setItem('malevelid', element.configvalue); break;
        }
      });
    });

    await this.data.get('Defsem/Getdefsembyid/10').then((resp) => {
      if (sessionStorage.getItem('maacadyear') === null) {
        sessionStorage.setItem('maacadyear', resp[0].acadyearadj);
        sessionStorage.setItem('masemester', resp[0].semester);
      }
      sessionStorage.setItem('sysacadyear', resp[0].acadyearadj);
      sessionStorage.setItem('syssemester', resp[0].semester);
    });
  }

  checkAvailable(message, type) {
    let option = { message: message };
    notify(option, type, 5000);
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3600000);
  }

  @HostListener('window:keydown') refreshUserState() { clearTimeout(this.userActivity); this.setTimeout(); }
  @HostListener('window:mousemove') refreshUserState1() { clearTimeout(this.userActivity); this.setTimeout(); }
  @HostListener('window:scroll') refreshUserState3() { clearTimeout(this.userActivity); this.setTimeout(); }
}
