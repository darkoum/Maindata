import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import config from 'devextreme/core/config';

// ใส่ DevExtreme License Key ที่นี่
// หา key ได้จาก devexpress.com → My Account → Subscriptions → Get License Key
config({ licenseKey: 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImJiOTBiOTU5LTFmMDAtNDliMi05MjIyLTI2MjMxMTRkNjQ0MCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjUyCn0=.RemFUF7W9UimvhllwJPttsz8UVxTafXs729jVegrc2spngavBmZBmp31a7OktJief1FUcu/lhHkNYxCE5jIyH+2RNlaEw/SoDyAJjiJ1YM+kKWOc4gw7qtPUeOtgyhWqG/G3JA==' });

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
