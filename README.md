# Maindata — ระบบฐานข้อมูลหลัก

Angular 21 project (migrated from Angular 17)

---

## ความต้องการของระบบ

| Software | Version |
|---|---|
| Node.js | >= 18.x |
| npm | >= 9.x |
| Angular CLI | 21.x |

---

## วิธีติดตั้งและรัน

### 1. ติดตั้ง Angular CLI (ครั้งแรกเท่านั้น)
```bash
npm install -g @angular/cli@21
```

### 2. ติดตั้ง dependencies
```bash
npm install --legacy-peer-deps
```

### 3. รัน development server
```bash
ng serve
```
เปิด browser ไปที่ **http://localhost:4200**

### 4. Build สำหรับ production
```bash
ng build
```
ไฟล์จะอยู่ใน `dist/Maindata/`

---

## DevExtreme License Key

โปรเจ็คนี้ใช้ **DevExtreme 24.2** ซึ่งต้องการ license key

เปิดไฟล์ `src/main.ts` แล้วแทนที่ `'YOUR_DEVEXTREME_LICENSE_KEY'` ด้วย key จริง:

```typescript
config({ licenseKey: 'YOUR_DEVEXTREME_LICENSE_KEY' });
```

> หา license key ได้จาก [devexpress.com](https://www.devexpress.com) → My Account → Subscriptions

---

## โครงสร้างโปรเจ็ค

```
src/
├── main.ts                         ← entry point
├── app/
│   ├── app.ts                      ← root component
│   ├── app.config.ts               ← providers (DI, routing, etc.)
│   ├── app.routes.ts               ← all routes
│   ├── app.html / app.scss
│   ├── guards/
│   │   └── auth.guard.ts           ← route protection
│   ├── services/
│   │   ├── http.service.ts         ← API calls
│   │   ├── alert.service.ts
│   │   ├── getdata.service.ts
│   │   └── util.service.ts
│   ├── shareds/                    ← shared components
│   ├── templates/                  ← layout (sidebar, navbar, breadcrumb)
│   └── components/                 ← 56 feature components
├── assets/
├── environments/
│   ├── environment.ts              ← development config
│   └── environment.prod.ts         ← production config
└── styles.css                      ← global styles
```

---

## API Configuration

แก้ URL ของ backend API ใน `src/app/services/http.service.ts`:

```typescript
private baseurl = 'https://YOUR_SERVER/regapi/api/';
private reporturl = 'https://YOUR_SERVER/E-RegReportReg/ReportGenerator.aspx';
```

---

## หมายเหตุสำหรับ Developer

- **Localhost dev mode**: เมื่อรันบน localhost จะมี mock session token อัตโนมัติ (ข้าม login)
- **Production**: token ต้องมาจากระบบ login จริง
- **Mock menu**: sidebar บน localhost แสดง mock menu — production แสดงเมนูจาก API
