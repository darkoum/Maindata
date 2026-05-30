import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import config from 'devextreme/core/config';

// ใส่ DevExtreme License Key ที่นี่
// หา key ได้จาก devexpress.com → My Account → Subscriptions → Get License Key
config({ licenseKey: 'YOUR_DEVEXTREME_LICENSE_KEY' });

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
