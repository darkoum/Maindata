import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsConfig, BreadcrumbsService, BreadcrumbsModule } from '@exalif/ngx-breadcrumbs';

@Component({
  standalone: true,
  imports: [CommonModule, BreadcrumbsModule],
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs;
  breadcrumbname;
  constructor(private breadcrumbsConfig: BreadcrumbsConfig, private breadcrumbsService: BreadcrumbsService) {
    this.breadcrumbsConfig.postProcess = (breadcrumbs): Breadcrumb[] => {
      let breadcrumbsmenu = [
        {
          text:
            sessionStorage.getItem('menuname') === 'home' || sessionStorage.getItem('menuname') === 'null'
              ? 'หน้าหลัก'
              : sessionStorage.getItem('menugroupname') + ' / ' + sessionStorage.getItem('menuname'),
          texttitle: sessionStorage.getItem('documentid') + ' : ' + sessionStorage.getItem('menucalling'),
          path: breadcrumbs[0]?.path,
        },
      ];
      let processedBreadcrumbs = breadcrumbs;
      if (breadcrumbs.length && breadcrumbs[0].text !== 'Home') {
        processedBreadcrumbs = [{ text: 'ระบบฐานข้อมูลหลัก', path: '' }].concat(breadcrumbsmenu);
      }
      return processedBreadcrumbs;
    };
  }
  getbreadcrumbs(): void {
    this.breadcrumbsService.crumbs$.subscribe((arg) => (this.breadcrumbs = arg));
  }
  ngOnInit() {
    this.getbreadcrumbs();
  }
}
export interface Breadcrumb {
  text: string;
  path: string;
}
