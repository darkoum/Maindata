import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import config from 'devextreme/core/config';
import { licenseKey } from './license';

// License key โหลดจาก .env ผ่าน scripts/set-license.js (ไม่ถูก commit)
config({ licenseKey });

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
