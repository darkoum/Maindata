import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { custom } from 'devextreme/ui/dialog';
declare const $: any;
declare const swal: any;

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  notify(message: string, type: string = 'warning') {
    $.notify(
      {
        // options
        title: '<strong>Warning : </strong>',
        message: message,
      },
      {
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
          from: 'top',
          align: 'right',
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp',
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template:
          '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>',
      }
    );
  }

  invalid_data(
    message: string = '<br>ข้อมูลไม่ถูกต้อง หรือ<br>ไม่เป็นไปตามเงื่อนไข<br>กรุณาลองอีกครั้ง'
  ) {
    this.notify(message);
  }

  invalid_fill_data(
    message: string = '<br>ระบุข้อมูลไม่ครบ หรือ<br>ไม่เป็นไปตามเงื่อนไข<br>กรุณาระบุอีกครั้ง'
  ) {
    this.notify(message);
  }

  data_not_found(message: string = '<br>ไม่พบข้อมูลตามเงื่อนไขที่ระบุ') {
    this.notify(message);
  }

  confirm(message: string = 'ต้องการจะทำรายการต่อหรือไม่?'): Promise<any> {
    return swal(message, {
      buttons: ['ยกเลิก', 'ยืนยัน'],
      dangerMode: true,
    });
  }

  confirmonly(message: string = 'ต้องการจะทำรายการต่อหรือไม่?'): Promise<any> {
    return swal(message, {
      buttons: [, 'OK'],
      // dangerMode: true
    });
  }

  complete(message: string, type: string = 'success') {
    $.notify(
      {
        // options
        title: '<strong></strong>',
        message: message,
      },
      {
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
          from: 'top',
          align: 'center',
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp',
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template:
          '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>',
      }
    );
  }

  Showerror(txt) {
    let option = {
      message: 'ทำรายการไม่สำเร็จ ' + txt,
      at: 'left top',
    };
    notify(option, 'error', 5000);
  }
  Showwarning(txt) {
    let option = {
      message: txt,
    };
    notify(option, 'warning', 5000);
  }
  Showsuccess() {
    let option = {
      message: 'ทำรายการสำเร็จ',
    };
    notify(option, 'success', 5000);
  }

  dialogbox(txt) {
    const result = custom({
      title: 'แจ้งเตือน',
      messageHtml: '<b>' + txt + '</b>',
      buttons: [
        {
          text: 'Login',
          onClick: (e) => {
            return { buttonText: e.component.option('text') };
          },
        },
      ],
    });
    result.show().then((dialogResult) => {
      if (dialogResult) {
        window.location.href =
          'https://' + window.location.hostname + '/Home/account';
      }
    });
  }

  MsgBoxCritical(txt) {
    const result = custom({
      title: 'ระบบฐานข้อมูลหลัก',
      messageHtml:
        '<span><img class="img-responsive center" src="assets/images/critical.png" alt="" width="40" height="40"/></span>  ' +
        txt +
        '',
      buttons: [
        {
          stylingMode: 'contained',
          type: 'danger',
          text: 'Yes',
          onClick: (e) => {
            return { buttonText: e.component.option('text'), value: 'Y' };
          },
        },
      ],
      // dragEnabled: true
    });

    result.show().then((dialogResult) => {
      if (dialogResult) {
        return dialogResult.value;
      }
    });
  }

  MsgBoxCriticalresult(txt) {
    const result = custom({
      title: 'ระบบฐานข้อมูลหลัก',
      messageHtml:
        '<span><img class="img-responsive center" src="assets/images/critical.png" alt="" width="40" height="40"/></span>  ' +
        txt +
        '',
      buttons: [
        {
          stylingMode: 'contained',
          type: 'danger',
          text: 'Yes',
          onClick: (e) => {
            return { buttonText: e.component.option('text'), value: 'Y' };
          },
        },
      ],
      // dragEnabled: true
    });

    return result;
  }

  MsgBoxInformation(txt) {
    const result = custom({
      title: 'ระบบฐานข้อมูลหลัก',
      messageHtml:
        '<span><img class="img-responsive center" src="assets/images/information.png" alt="" width="40" height="40"/></span>  ' +
        txt +
        '',
      buttons: [
        {
          stylingMode: 'contained',
          type: 'danger',
          text: 'Yes',
          onClick: (e) => {
            return { buttonText: e.component.option('text'), value: 'Y' };
          },
        },
      ],
      // dragEnabled: true
    });

    result.show().then((dialogResult) => {
      if (dialogResult) {
      }
    });
  }

  MsgBoxQuestionCritical(txt) {
    const result = custom({
      title: 'ระบบฐานข้อมูลหลัก',
      messageHtml:
        '<span><img class="img-responsive center" src="assets/images/critical.png" alt="" width="40" height="40"/></span>  ' +
        txt +
        '',
      buttons: [
        {
          stylingMode: 'contained',
          type: 'danger',
          icon: 'todo',
          text: 'Yes',
          onClick: (e) => {
            return { buttonText: e.component.option('text'), value: 'Y' };
          },
        },
        {
          stylingMode: 'contained',
          type: 'danger',
          icon: 'close',
          text: 'No',
          onClick: (e) => {
            return { buttonText: e.component.option('text'), value: 'N' };
          },
        },
      ],
      // dragEnabled: true
    });

    return result;

    // result.show().then((dialogResult) => {
    //     // if (dialogResult) {
  
    //     //     return dialogResult.value;
    //     // }
    // });
  }
  MsgBoxQuestion(txt) {
    const result = custom({
      title: 'ระบบฐานข้อมูลหลัก',
      messageHtml:
        '<span><img class="img-responsive center" src="assets/images/question.png" alt="" width="40" height="40"/></span>  ' +
        txt +
        '',
      buttons: [
        {
          stylingMode: 'outlined',
          type: 'default',
          icon: 'todo',
          text: 'Yes',
          onClick: (e) => {
            return { buttonText: e.component.option('text'), value: 'Y' };
          },
        },
        {
          stylingMode: 'outlined',
          type: 'default',
          icon: 'close',
          text: 'No',
          onClick: (e) => {
            return { buttonText: e.component.option('text'), value: 'N' };
          },
        },
      ],
      // dragEnabled: true
    });

    return result;

    // result.show().then((dialogResult) => {
    //     // if (dialogResult) {
    //     //     return dialogResult.value;
    //     // }
    // });
  }

  Warning(txt: any) {
    const result = custom({
      title: 'ระบบฐานข้อมูลหลัก',
      messageHtml:
        '<span><img class="img-responsive center" src="assets/images/information.png" alt="" width="40" height="40"/></span>  ' +
        'คุณยังไม่ได้บันทึกรายการที่ทำการแก้ไข' +
        '',
      buttons: [
        {
          stylingMode: 'contained',
          type: 'default',
          text: 'ตกลง',
          onClick: (e) => {
            return { buttonText: e.component.option('text'), value: 'Y' };
          },
        },
      ],
      // dragEnabled: true
    });

    result.show().then((dialogResult: any) => {
      if (dialogResult) {
      }
    });
  }

  Warningfilenotfound() {
    const result = custom({
      title: 'ระบบฐานข้อมูลหลัก',
      messageHtml:
        '<span><img class="img-responsive center" src="assets/images/information.png" alt="" width="40" height="40"/></span>  ' +
        'ไม่พบไฟล์ที่ต้องการ' +
        '',
      buttons: [
        {
          stylingMode: 'contained',
          type: 'default',
          text: 'ตกลง',
          onClick: (e) => {
            return { buttonText: e.component.option('text'), value: 'Y' };
          },
        },
      ],
      // dragEnabled: true
    });

    result.show().then((dialogResult: any) => {
      if (dialogResult) {
      }
    });
  }
}
