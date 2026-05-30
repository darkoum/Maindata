# คู่มือ Migrate Angular 17 → 21

> จากประสบการณ์จริงของโปรเจ็ค Maindata  
> สรุปทุกปัญหาและวิธีแก้ที่พบระหว่าง migration

---

## ภาพรวมสิ่งที่ต้องทำ

```
Angular 17                        Angular 21
──────────────────────────────────────────────────────
app.module.ts              →      app.config.ts
app-routing.module.ts      →      app.routes.ts
app.component.ts           →      app.ts (standalone)
Class AuthGuard            →      functional authGuard
templates/ (3 components)  →      standalone: true
56 feature components       →      standalone: false
```

---

## Step 1 — สร้างโปรเจ็ค Angular 21 ใหม่

```bash
# ติดตั้ง Angular CLI 21
npm install -g @angular/cli@21

# สร้างโปรเจ็ค
ng new ชื่อโปรเจ็ค --routing --style=scss --skip-git

# copy โค้ด v17 มาไว้ใน src-v17/ เพื่อใช้อ้างอิง
```

---

## Step 2 — ติดตั้ง Packages

```bash
cd ชื่อโปรเจ็ค

npm install --legacy-peer-deps \
  @angular/animations@^21.2.0 \
  @exalif/ngx-breadcrumbs \
  @fortawesome/angular-fontawesome \
  @fortawesome/fontawesome-svg-core \
  @fortawesome/free-solid-svg-icons \
  ngx-bootstrap \
  crypto-js \
  devextreme@^24.2.0 \
  devextreme-angular@^24.2.0 \
  jwt-decode \
  jquery \
  @types/jquery \
  bootstrap \
  buffer \
  zone.js \
  xlsx \
  exceljs \
  file-saver \
  file-saver-es
```

> **หมายเหตุ:** ต้องใช้ `--legacy-peer-deps` เพราะบางแพ็กเกจ เช่น `@exalif/ngx-breadcrumbs` ยังไม่ได้อัปเดต peer deps ให้รองรับ Angular 21

---

## Step 3 — แก้ tsconfig.json

เปิด `tsconfig.json` แล้วแก้ให้เป็นดังนี้:

```json
{
  "compilerOptions": {
    "baseUrl": "./",          // ← สำคัญมาก: ทำให้ "src/app/..." imports ทำงานได้
    "strict": false,          // ← ปิด strict เพราะ code v17 ไม่ได้เขียนแบบ strict
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",  // ← ต้องใช้คู่กับ module: ES2022
    "allowJs": true,                // ← จำเป็นถ้ามี .js files (เช่น node-zlib.js)
    "resolveJsonModule": true
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": false,   // ← ปิดเพราะ v17 code ไม่ strict
    "strictInputAccessModifiers": false,
    "strictTemplates": false
  }
}
```

> **ทำไม `baseUrl: "./"` สำคัญ?**  
> v17 ใช้ `"baseUrl": "./"` ทำให้ import แบบ `import ... from 'src/app/services/...'`  
> ทำงานได้ ถ้าไม่ใส่จะ error ทุก component

---

## Step 4 — แก้ tsconfig.app.json

เพิ่ม types ที่จำเป็น:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": ["node", "jquery"]   // ← เพิ่ม node และ jquery
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts"]
}
```

> **ทำไมต้องใส่ `"node"`?** — เพราะ code v17 ใช้ `require()`, `Buffer`, `process`  
> **ทำไมต้องใส่ `"jquery"`?** — เพราะใช้ `$()` ใน component

---

## Step 5 — สร้าง app.config.ts

แทนที่ `app.module.ts` ด้วย config ใหม่:

```typescript
// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { BreadcrumbsModule } from '@exalif/ngx-breadcrumbs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Encrypt } from './shareds/encrypt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(BreadcrumbsModule.forRoot()),
    importProvidersFrom(ModalModule),   // ← ใช้ ModalModule เฉยๆ (ไม่มี .forRoot() แล้ว)
    Encrypt,
  ]
};
```

### การแปลง Modules → Providers

| Module เดิม (v17) | Provider ใหม่ (v21) |
|---|---|
| `BrowserModule` | ลบออก (ไม่ต้องใช้) |
| `HttpClientModule` | `provideHttpClient()` |
| `RouterModule.forRoot(routes)` | `provideRouter(routes)` |
| `BrowserAnimationsModule` | `provideAnimationsAsync()` |
| `BreadcrumbsModule.forRoot()` | `importProvidersFrom(BreadcrumbsModule.forRoot())` |
| `ModalModule.forRoot()` | `importProvidersFrom(ModalModule)` |
| custom providers เดิม | ใส่ตรงๆ ใน providers array |

---

## Step 6 — สร้าง app.routes.ts

ย้าย routes จาก `app-routing.module.ts` มา + เปลี่ยน guard:

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';   // ← functional guard

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    canActivate: [authGuard],       // ← ใช้ชื่อ camelCase แทน class
    data: { breadcrumbs: true },
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  // ... routes อื่นๆ เหมือนเดิมทุกอย่าง
];
```

---

## Step 7 — สร้าง Functional Guard

แปลง class guard → functional guard:

```typescript
// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

// ก่อน (v17) — Class Guard
// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate { ... }

// หลัง (v21) — Functional Guard
export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const http = inject(HttpService);

  if (!sessionStorage.getItem('token')) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
```

---

## Step 8 — Copy ไฟล์จาก v17 (ใช้ File Explorer ได้เลย)

เปิด **File Explorer** 2 หน้าต่างขึ้นมา:
- หน้าต่างซ้าย: โปรเจ็ค **เก่า** (v17)
- หน้าต่างขวา: โปรเจ็ค **ใหม่** (v21)

แล้ว copy ทีละโฟลเดอร์ตามรายการนี้:

---

### 📁 สิ่งที่ต้อง copy (ทำตามลำดับ)

#### 1. โฟลเดอร์ `components/` ทั้งโฟลเดอร์
```
copy จาก:  โปรเจ็คเก่า\src\app\components\
วางไปที่:  โปรเจ็คใหม่\src\app\components\
```

#### 2. โฟลเดอร์ `services/` ทั้งโฟลเดอร์
```
copy จาก:  โปรเจ็คเก่า\src\app\services\
วางไปที่:  โปรเจ็คใหม่\src\app\services\
```
> ถ้ามีไฟล์ `node-zlib.js` ใน services/ ให้ copy มาด้วย

#### 3. โฟลเดอร์ `shareds/` ทั้งโฟลเดอร์
```
copy จาก:  โปรเจ็คเก่า\src\app\shareds\
วางไปที่:  โปรเจ็คใหม่\src\app\shareds\
```

#### 4. ไฟล์ HTML และ CSS ของ templates (ทีละไฟล์)
```
copy จาก:  โปรเจ็คเก่า\src\app\templates\sidebar\sidebar.component.html
           โปรเจ็คเก่า\src\app\templates\sidebar\sidebar.component.css
วางไปที่:  โปรเจ็คใหม่\src\app\templates\sidebar\   (สร้างโฟลเดอร์ก่อน)

copy จาก:  โปรเจ็คเก่า\src\app\templates\navbar\navbar.component.html
           โปรเจ็คเก่า\src\app\templates\navbar\navbar.component.css
วางไปที่:  โปรเจ็คใหม่\src\app\templates\navbar\

copy จาก:  โปรเจ็คเก่า\src\app\templates\breadcrumb\breadcrumb.component.html
           โปรเจ็คเก่า\src\app\templates\breadcrumb\breadcrumb.component.css
วางไปที่:  โปรเจ็คใหม่\src\app\templates\breadcrumb\
```

#### 5. ไฟล์ template ของ AppComponent
```
copy จาก:  โปรเจ็คเก่า\src\app\app.component.html  →  วางเป็น  app.html  ในโปรเจ็คใหม่\src\app\
copy จาก:  โปรเจ็คเก่า\src\app\app.component.css   →  วางรวมกับ  app.scss  ในโปรเจ็คใหม่\src\app\
```
> **หมายเหตุ:** ชื่อไฟล์เปลี่ยนจาก `app.component.html` → `app.html`

#### 6. โฟลเดอร์ `assets/` ทั้งโฟลเดอร์
```
copy จาก:  โปรเจ็คเก่า\src\assets\
วางไปที่:  โปรเจ็คใหม่\src\assets\   (สร้างโฟลเดอร์ถ้ายังไม่มี)
```

#### 7. โฟลเดอร์ `environments/` ทั้งโฟลเดอร์
```
copy จาก:  โปรเจ็คเก่า\src\environments\
วางไปที่:  โปรเจ็คใหม่\src\environments\   (สร้างโฟลเดอร์ถ้ายังไม่มี)
```

#### 8. ไฟล์ `styles.css`
```
copy จาก:  โปรเจ็คเก่า\src\styles.css
วางไปที่:  โปรเจ็คใหม่\src\styles.css
```

---

### ❌ ไฟล์ที่ **ไม่ต้อง** copy (ใช้ของใหม่แทน)

| ไฟล์เก่า (v17) | เหตุผล |
|---|---|
| `app.module.ts` | แทนที่ด้วย `app.config.ts` (Step 5) |
| `app-routing.module.ts` | แทนที่ด้วย `app.routes.ts` (Step 6) |
| `app.component.ts` | แทนที่ด้วย `app.ts` (Step 9) |
| `guards/auth.guard.ts` | เขียนใหม่เป็น functional (Step 7) |
| `polyfills.ts` | Angular 21 ไม่ใช้แล้ว |
| `test.ts` | Angular 21 ไม่ใช้แล้ว |
| `main.ts` (เก่า) | ใช้ของโปรเจ็คใหม่ที่สร้างไว้แล้ว |

---

## Step 9 — แก้ app.ts (AppComponent)

เพิ่ม `standalone: true` และ import components ที่ใช้ใน template:

```typescript
@Component({
  standalone: true,                          // ← เพิ่ม
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,                        // ← เพิ่ม
    NavbarComponent,                         // ← เพิ่ม
    BreadcrumbComponent,                     // ← เพิ่ม
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // logic เดิมทั้งหมด — ไม่เปลี่ยน
}
```

---

## Step 10 — แก้ Template Components (standalone)

ทุก component ใน `templates/` ต้องเพิ่ม `standalone: true`:

```typescript
// sidebar.component.ts
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  // ... เหมือนเดิม
})

// navbar.component.ts
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ModalModule],
  // ... เหมือนเดิม
})

// breadcrumb.component.ts
@Component({
  standalone: true,
  imports: [CommonModule, BreadcrumbsModule],
  // ... เหมือนเดิม
})
```

---

## Step 11 — แก้ Feature Components (สำคัญมาก!)

> **Angular 21 เปลี่ยน default:** component ที่ไม่ระบุ `standalone` จะถือว่าเป็น `standalone: true` อัตโนมัติ!

ต้องเพิ่ม `standalone: false` ให้กับ **ทุก component ที่อยู่ใน NgModule declarations**:

```bash
# Script สำหรับเพิ่ม standalone: false อัตโนมัติ
for f in $(grep -rl "@Component({" src/app/components/ src/app/shareds/ 2>/dev/null); do
  if ! grep -q "standalone:" "$f"; then
    sed -i '' 's/@Component({/@Component({\n    standalone: false,/' "$f"
    echo "Fixed: $f"
  fi
done
```

ทำเช่นเดียวกันกับ `@Pipe` ที่อยู่ใน NgModule:

```typescript
// ก่อน
@Pipe({ name: "myPipe" })

// หลัง
@Pipe({ name: "myPipe", standalone: false })
```

---

## Step 12 — แก้ angular.json

เพิ่ม assets, styles, และ scripts ให้ครบเหมือน v17:

```json
{
  "assets": [
    { "glob": "**/*", "input": "public" },
    { "glob": "**/*", "input": "src/assets", "output": "assets" }
  ],
  "scripts": [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
  ],
  "styles": [
    "node_modules/devextreme/dist/css/dx.common.css",
    "node_modules/devextreme/dist/css/dx.light.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    "src/styles.scss",
    "src/styles.css"
  ]
}
```

> **สำคัญ:** หลังแก้ `angular.json` ต้อง **restart `ng serve`** เพราะ watch mode ไม่ตรวจจับการเปลี่ยนแปลงไฟล์นี้อัตโนมัติ

> **ต้องติดตั้งก่อน:** `npm install @fortawesome/fontawesome-free --legacy-peer-deps`

---

## ปัญหาที่พบบ่อย + วิธีแก้

### 1. TypeScript Internal Error: `Cannot destructure property 'pos'`

```
✘ [ERROR] Cannot destructure property 'pos' of 'file.referencedFiles[index]' as it is undefined.
```

**สาเหตุ:** มี import ไฟล์ `.js` (เช่น `node-zlib.js`) โดยไม่มี `allowJs: true` ใน tsconfig  
**แก้:** เพิ่ม `"allowJs": true` และ `"moduleResolution": "bundler"` ใน tsconfig.json

---

### 2. NG6008: Component is standalone, cannot be declared

```
✘ [ERROR] NG6008: Component XxxComponent is standalone, and cannot be declared in an NgModule.
```

**สาเหตุ:** Angular 21 ทำให้ `standalone: true` เป็น default  
**แก้:** เพิ่ม `standalone: false` ใน `@Component` / `@Pipe` / `@Directive` ทุกตัวที่อยู่ใน NgModule

---

### 3. ModalModule.forRoot() ไม่มีแล้ว

```
✘ [ERROR] TS2339: Property 'forRoot' does not exist on type 'typeof ModalModule'.
```

**สาเหตุ:** ngx-bootstrap เวอร์ชันใหม่ลบ `.forRoot()` ออก  
**แก้:** เปลี่ยนจาก `ModalModule.forRoot()` เป็น `ModalModule`

---

### 4. jwt-decode ไม่มี default export

```
✘ [ERROR] TS1192: Module 'jwt-decode' has no default export.
```

**สาเหตุ:** jwt-decode v4+ เปลี่ยน API  
**แก้:**
```typescript
// ก่อน
import decode from 'jwt-decode';

// หลัง
import { jwtDecode as decode } from 'jwt-decode';
```

---

### 5. window.Buffer ไม่มีใน TypeScript

```
✘ [ERROR] TS2339: Property 'Buffer' does not exist on type 'Window & typeof globalThis'.
```

**แก้:** ใช้ type assertion
```typescript
// ก่อน
window.Buffer = window.Buffer || require('buffer').Buffer;

// หลัง
(window as any).Buffer = (window as any).Buffer || require('buffer').Buffer;
```

---

### 6. Cannot find name `$` / `require` / `Buffer`

```
✘ [ERROR] TS2592: Cannot find name '$'. Try `npm i --save-dev @types/jquery`
✘ [ERROR] TS2591: Cannot find name 'require'. Try `npm i --save-dev @types/node`
```

**แก้:** เพิ่ม types ใน `tsconfig.app.json`:
```json
{ "types": ["node", "jquery"] }
```

---

### 7. DevExtreme sub-components ไม่รู้จัก

```
✘ [ERROR] NG8001: 'dxi-toolbar-item' is not a known element
```

**สาเหตุ:** module ไม่ได้ import `DxToolbarModule`  
**แก้:** เปิดไฟล์ `.module.ts` ของ component นั้น แล้วเพิ่ม:
```typescript
import { DxToolbarModule } from 'devextreme-angular';
// แล้วใส่ใน imports[]
```

---

### 8. Case-sensitivity ของ file path

```
▲ [WARNING] Use "home.component.ts" instead of "Home.component.ts"
```

**สาเหตุ:** import ใช้ชื่อไฟล์ตัวใหญ่-เล็กผิด  
**แก้:**
```typescript
// ก่อน
import { HomeComponent } from './Home.component';

// หลัง
import { HomeComponent } from './home.component';
```

---

### 9. Dynamic require of "buffer" is not supported (Runtime)

```
Uncaught Error: Dynamic require of "buffer" is not supported
    at http.service.ts:12
```

**สาเหตุ:** Angular 21 ใช้ esbuild ไม่รองรับ `require()` แบบ dynamic ใน browser  
**แก้:** เปลี่ยนทุก `require()` ในไฟล์ `.ts` เป็น static ES import

```typescript
// ก่อน
const zlib = require('./node-zlib.js');
window.Buffer = window.Buffer || require('buffer').Buffer;

// หลัง
import { Buffer } from 'buffer';
import * as zlib from './node-zlib.js';
(globalThis as any).Buffer = Buffer;
(window as any).Buffer = Buffer;
```

---

### 10. $ is not defined (Runtime)

```
ERROR ReferenceError: $ is not defined
    at NavbarComponent.ngOnInit
```

**สาเหตุ:** jQuery ไม่ได้โหลดเป็น global script  
**แก้:** เพิ่มใน `angular.json` → `scripts`:
```json
"scripts": ["node_modules/jquery/dist/jquery.min.js"]
```

---

### 11. CSS ไม่โหลด — layout พัง (Runtime)

**อาการ:** sidebar, navbar ไม่มี style, icon ไม่แสดง, Bootstrap layout พัง  
**สาเหตุ:** ไม่ได้เพิ่ม CSS ใน `angular.json` styles  
**แก้:** ดู Step 12 — เพิ่ม CSS ครบ (DevExtreme, Bootstrap, FontAwesome)

---

### 12. http.get() Promise ค้างเมื่อ API timeout (Runtime)

**อาการ:** `await http.get(...)` ไม่เคย resolve → route ไม่โหลด, sidebar ว่าง  
**สาเหตุ:** error callback ของ `http.get()` ไม่มี `resolve()` → Promise แขวนตลอด  
**แก้:** เพิ่ม `resolve(null)` ใน error callback ทุก Promise ที่ไม่มี reject:

```typescript
// ใน http.service.ts — ทั้ง get() และ getcombo()
(error: any) => {
  // ... error handling เดิม ...
  resolve(null); // ← เพิ่มบรรทัดนี้ท้าย error callback
}
```

---

### 13. NG0100: ExpressionChangedAfterItHasBeenChecked (Runtime)

```
ERROR NG0100: ExpressionChangedAfterItHasBeenChecked
Previous value: 'undefined'. Current value: '{"editcell1 editcell2 editcell3":false}'
```

**สาเหตุ:** method ใน template สร้าง object ใหม่ทุกครั้งที่เรียก → Angular เห็น reference เปลี่ยน  
**แก้:** Cache object ไว้ใน property แทนสร้างใหม่:

```typescript
// ก่อน (getdata.service.ts)
getclassgrid() {
  return { 'editcell1 editcell2 editcell3': this.geteditmodeopen() == 'true' };
}

// หลัง
private _classgrid = { 'editcell1 editcell2 editcell3': false };
getclassgrid() {
  this._classgrid['editcell1 editcell2 editcell3'] = this.geteditmodeopen() == 'true';
  return this._classgrid; // return same reference
}
```

---

### 14. DevExtreme Evaluation Banner (Runtime)

```
For evaluation purposes only. Redistribution prohibited... (v24.2.xx)
```

**สาเหตุ:** DevExtreme 23.2 (v17) ไม่บังคับ license แต่ 24.2 (v21) บังคับ — ต้องใช้ 24.2 เพราะ 23.2 ไม่รองรับ Angular 21  
**แก้:** ใส่ license key ใน `src/main.ts`:

```typescript
import config from 'devextreme/core/config';
config({ licenseKey: 'YOUR_DEVEXTREME_LICENSE_KEY' });
```

> หา license key ได้ที่ [devexpress.com](https://www.devexpress.com) → Customer Portal

---

## ทดสอบบน Localhost (DEV MODE)

เนื่องจาก API อยู่บน server จริง — เมื่อรันบน localhost ต้องเพิ่ม mock data เพื่อทดสอบ UI

### Mock Token (ข้าม Login dialog)

เพิ่มใน `app.ts` constructor — **บน localhost เท่านั้น:**

```typescript
if (window.location.hostname === 'localhost' && !sessionStorage.getItem('token')) {
  sessionStorage.setItem('token', 'dev-mock-token');
  sessionStorage.setItem('fullname', 'Dev User');
  sessionStorage.setItem('repclientid', 'dev-session');
  sessionStorage.setItem('sysmenuid', '0');
  sessionStorage.setItem('menuname', 'home');
  // ... ค่า session อื่นๆ
}
```

### Bypass Auth Guard บน Localhost

```typescript
// auth.guard.ts
export const authGuard: CanActivateFn = async () => {
  if (!sessionStorage.getItem('token')) { /* redirect to login */ }

  if (window.location.hostname === 'localhost') {
    return true; // ← ข้าม API check
  }

  // production: check menu permission via API
  await http.get('Sysmen/Getsysmenuid/10').then(...)
  return true;
};
```

### Mock Sidebar Menu บน Localhost

```typescript
// sidebar.component.ts
getmenulist(): void {
  if (window.location.hostname === 'localhost') {
    this.menudata = this.mockMenuData; // ← ใช้ทันที ไม่รอ API
    return;
  }
  this.http.get('Sysmen/get/10').then(r => { if (r) this.menudata = r; });
}
```

---

## Checklist ก่อน Build

- [ ] `tsconfig.json` มี `baseUrl: "./"`, `allowJs: true`, `moduleResolution: "bundler"`
- [ ] `tsconfig.app.json` มี `types: ["node", "jquery"]`
- [ ] `app.config.ts` มี `provideRouter`, `provideHttpClient`, `provideAnimationsAsync`
- [ ] `ModalModule.forRoot()` → `ModalModule`
- [ ] jwt-decode ใช้ named import `{ jwtDecode as decode }`
- [ ] ทุก feature component มี `standalone: false`
- [ ] ทุก Pipe ใน NgModule มี `standalone: false`
- [ ] Guard เปลี่ยนเป็น functional (`CanActivateFn`)
- [ ] Copy `assets/`, `environments/`, `styles.css`, `node-zlib.js` (ถ้ามี)
- [ ] `angular.json` เพิ่ม CSS ครบ (DevExtreme, Bootstrap, FontAwesome)
- [ ] `angular.json` เพิ่ม scripts (jQuery, Bootstrap JS)
- [ ] `require()` → ES static `import` ใน service files
- [ ] `http.get()` error callback มี `resolve(null)` ทุก Promise
- [ ] ติดตั้ง `@fortawesome/fontawesome-free` ด้วย `--legacy-peer-deps`

---

## Build Command

```bash
# ตรวจสอบ errors
ng build --configuration development 2>&1 | grep "ERROR" | sort -u

# Build เต็ม
ng build --configuration development

# Run dev server
ng serve
```

---

## เวลาที่ใช้ (อ้างอิง)

| ขั้นตอน | เวลาโดยประมาณ |
|---|---|
| ติดตั้ง packages | 5 นาที |
| แก้ config files (tsconfig, angular.json) | 15 นาที |
| Copy + แก้ไฟล์หลัก | 15 นาที |
| แก้ build-time errors | 20–40 นาที |
| แก้ runtime errors (CSS, require, Promise) | 20–30 นาที |
| ทดสอบ localhost | 10 นาที |
| **รวม** | **~1.5–2 ชั่วโมง** |

> เวลาอาจแตกต่างกันตามจำนวน components และ dependencies ของโปรเจ็ค
