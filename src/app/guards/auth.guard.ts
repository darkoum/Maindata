import { inject } from '@angular/core';
import { CanActivateFn, NavigationEnd, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import notify from 'devextreme/ui/notify';
import { filter } from 'rxjs/operators';

export const authGuard: CanActivateFn = async () => {
  const http = inject(HttpService);
  const router = inject(Router);

  // ── check token ก่อนเสมอ ──
  if (!sessionStorage.getItem('token')) {
    let option = { message: 'กรุณา Login ' };
    notify(option, 'error', 5000);
    router.navigate(['/']);
    return false;
  }

  // ── บน localhost ข้าม API check เพื่อพัฒนา ──
  if (window.location.hostname === 'localhost') {
    return true;
  }

  // ── production: ตรวจสิทธิ์เมนูจาก API ──
  let menuid: any = [];
  await http.get('Sysmen/Getsysmenuid' + '/10').then((response) => {
    if (response) menuid = response;
  });

  router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const url = +event.url.replace('/', '');
      if (
        menuid.indexOf(url) === -1 &&
        event.url.replace('/', '') !== 'home' &&
        event.url.indexOf('sysprereport') === -1
      ) {
        router.navigate(['/home']);
      }
    });

  return true;
};
