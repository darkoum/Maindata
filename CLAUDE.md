# Angular 17 → 21 Migration — Claude Code Instructions

> วางไฟล์นี้ไว้ที่ root ของโปรเจ็ค Angular 21 ใหม่
> Claude Code จะอ่านไฟล์นี้อัตโนมัติทุกครั้งที่เริ่ม session

---

## 🎯 เป้าหมายหลัก

**ทำให้ code เดิมจาก Angular 17 ทำงานได้ใน Angular 21 — ห้ามเขียนใหม่โดยไม่จำเป็น**

### กฎสำคัญ (ห้ามละเมิด)

1. **Compile ได้ก่อน** — ถ้ายังไม่ compile ได้ อย่าแก้อย่างอื่น
2. **Logic เดิมห้ามเปลี่ยน** — แก้เฉพาะ syntax/import ที่จำเป็น
3. **ถ้า code เดิมทำงานได้ — อย่าแตะ** แม้จะไม่ใช่ best practice
4. **ทีละไฟล์** — แก้ไฟล์เดียว ตรวจสอบ compile แล้วค่อยไปไฟล์ถัดไป
5. **ห้ามเปลี่ยน template HTML** — เว้นแต่ `*ngIf/*ngFor` ทำให้ compile error
6. **สรุปทุกครั้งหลังแก้ไฟล์** — ต้องแสดงผลตาม format ด้านล่างเสมอ

---

## 📝 Format สรุปหลังแก้แต่ละไฟล์ (บังคับ)

ทุกครั้งที่แก้ไขไฟล์เสร็จ ให้แสดงสรุปในรูปแบบนี้เสมอ:

```
✅ [ชื่อไฟล์]
├── เพิ่ม    : standalone: true
├── เพิ่ม    : imports [CommonModule, RouterModule]
├── เปลี่ยน  : HttpClientModule → provideHttpClient()
├── ลบ      : BrowserModule
└── คงเดิม  : template, logic, services ทั้งหมด
```

และอัปเดตไฟล์ `MIGRATION_LOG.md` ที่ root อัตโนมัติในรูปแบบนี้:

```markdown
## [วันที่ เวลา]

### ✅ [ชื่อไฟล์]
| ประเภท | รายละเอียด |
|--------|-----------|
| เพิ่ม | standalone: true |
| เพิ่ม | imports [CommonModule, RouterModule] |
| เปลี่ยน | HttpClientModule → provideHttpClient() |
| ลบ | BrowserModule |
| คงเดิม | template, logic, services ทั้งหมด |

**Build status:** ✅ Pass / ❌ Error: [error message]
```

---

## 📋 ขั้นตอนการ Migrate

### Step 1 — วิเคราะห์ก่อนแก้

```
ก่อนแก้ไขทุกไฟล์ ให้ทำสิ่งนี้ก่อน:
1. อ่านไฟล์ต้นฉบับทั้งหมด
2. ระบุว่าต้องเปลี่ยนอะไรบ้าง (เฉพาะที่ทำให้ compile error)
3. ระบุว่าอะไรที่ยังใช้ได้โดยไม่ต้องเปลี่ยน
4. แจ้ง plan ก่อน แล้วค่อย execute
```

### Step 2 — ลำดับการ Migrate

```
1. app.module.ts → app.config.ts + main.ts
2. app-routing.module.ts → app.routes.ts
3. Services ทั้งหมด (แก้แค่ import)
4. Shared Components / Pipes / Directives
5. Feature Components ทีละตัว
6. Guards และ Interceptors
```

### Step 3 — ตรวจสอบหลังแต่ละไฟล์

```bash
ng build --configuration development 2>&1 | head -50
```

---

## 🔧 การแปลงที่ต้องทำ (บังคับ)

### A. NgModule → Standalone

**ก่อน (v17):**
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**หลัง (v21) — สร้าง app.config.ts ใหม่:**
```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
  ]
};

// main.ts
bootstrapApplication(AppComponent, appConfig);
```

**ทุก Component/Directive/Pipe ต้องเพิ่ม `standalone: true`:**
```typescript
@Component({
  standalone: true,          // เพิ่มบรรทัดนี้
  imports: [/* ย้ายมาจาก NgModule */],
  selector: '...',
  // ... ที่เหลือเหมือนเดิม 100%
})
```

---

### B. Import ที่ต้องเปลี่ยน

| ของเดิม (v17) | เปลี่ยนเป็น (v21) | หมายเหตุ |
|---|---|---|
| `BrowserModule` | ลบออกได้เลย | ไม่ต้องใช้แล้ว |
| `HttpClientModule` | `provideHttpClient()` ใน config | |
| `RouterModule.forRoot(routes)` | `provideRouter(routes)` ใน config | |
| `RouterModule.forChild(routes)` | `provideRouter(routes)` หรือ routes array | |
| `BrowserAnimationsModule` | `provideAnimationsAsync()` ใน config | |
| `NoopAnimationsModule` | `provideNoopAnimations()` ใน config | |
| `CommonModule` | คง import ไว้ใน component ได้เลย ✅ | ยังใช้ได้ |
| `FormsModule` | คง import ไว้ใน component ได้เลย ✅ | ยังใช้ได้ |
| `ReactiveFormsModule` | คง import ไว้ใน component ได้เลย ✅ | ยังใช้ได้ |

---

### C. Guards — เปลี่ยนเฉพาะที่ error

**ถ้า guard เดิม compile error ให้แปลงเป็น functional:**

```typescript
// ก่อน — Class Guard (v17)
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}

// หลัง — Functional Guard (v21)
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};
```

---

### D. Interceptors — เปลี่ยนเฉพาะที่ error

```typescript
// ก่อน — Class Interceptor (v17)
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // ... logic เดิม
    return next.handle(cloned);
  }
}
// providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]

// หลัง — Functional Interceptor (v21)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // ... copy logic เดิมมาเลย ไม่ต้องเปลี่ยน
  return next(cloned);  // เปลี่ยนแค่ next.handle() → next()
};
// app.config.ts: provideHttpClient(withInterceptors([authInterceptor]))
```

---

## ✅ สิ่งที่ใช้ได้เหมือนเดิม — ห้ามแตะ

```
✅ Template HTML ทั้งหมด (binding, events, pipes)
✅ *ngIf, *ngFor, *ngSwitch — ยังใช้ได้ใน v21
✅ Services logic ทั้งหมด
✅ RxJS, Observables, Subjects ทุกชนิด
✅ constructor injection (ยังใช้ได้)
✅ @Input(), @Output(), @ViewChild()
✅ Reactive Forms, Template-driven Forms
✅ Pipes ทั้งหมด (built-in และ custom)
✅ ngClass, ngStyle, ngModel
✅ EventEmitter
✅ ChangeDetectionStrategy.OnPush
✅ Lifecycle hooks (ngOnInit, ngOnDestroy ฯลฯ)
✅ Decorators @HostListener, @HostBinding
```

---

## ⚠️ สิ่งที่ต้องระวัง

### 1. `@for` ต้องมี `track` (ถ้าใช้ syntax ใหม่)
```html
<!-- ถ้าแปลงเป็น @for ต้องใส่ track เสมอ -->
@for (item of items; track item.id) { }
@for (item of items; track $index) { }  <!-- ถ้าไม่มี id -->
```

### 2. Lazy Loading — เปลี่ยน loadChildren ถ้าใช้ standalone
```typescript
// ก่อน — Module lazy load
loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)

// หลัง — ถ้า module ถูกแปลงเป็น standalone แล้ว
loadChildren: () => import('./feature/feature.routes').then(m => m.featureRoutes)
// หรือ loadComponent สำหรับ component เดียว
loadComponent: () => import('./feature/feature.component').then(m => m.FeatureComponent)
```

### 3. Shared Module → ใส่ imports ใน Component แทน
```typescript
// ถ้ามี SharedModule เดิม ให้ย้าย declarations ของมันไปใส่ imports[] ของ component
// ที่ใช้แต่ละตัวแทน
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,   // เดิมอยู่ใน SharedModule
    CardComponent,     // เดิมอยู่ใน SharedModule
  ]
})
```

---

## 🚨 Error ที่พบบ่อย + วิธีแก้

| Error | สาเหตุ | วิธีแก้ |
|---|---|---|
| `Component is not standalone` | ลืมใส่ `standalone: true` | เพิ่ม `standalone: true` ใน `@Component` |
| `'xxx' is not a known element` | Component ไม่ได้ import | เพิ่มใน `imports[]` ของ component |
| `NullInjectorError: HttpClient` | ลืม provideHttpClient | เพิ่ม `provideHttpClient()` ใน app.config.ts |
| `Can't bind to 'formGroup'` | ลืม import ReactiveFormsModule | เพิ่ม `ReactiveFormsModule` ใน `imports[]` |
| `No provider for Router` | ลืม provideRouter | เพิ่ม `provideRouter(routes)` ใน app.config.ts |
| `NG04002: Cannot match routes` | routes ไม่ถูกต้อง | ตรวจสอบ app.routes.ts |
| `Type 'X' is not assignable to CanActivateFn` | Guard ยังเป็น class | แปลงเป็น functional guard |

---

## 📁 โครงสร้างไฟล์ที่ควรได้หลัง Migrate

```
src/
├── main.ts                    ← bootstrapApplication()
├── app/
│   ├── app.component.ts       ← standalone: true
│   ├── app.config.ts          ← providers ทั้งหมด
│   ├── app.routes.ts          ← routes ทั้งหมด
│   ├── core/
│   │   ├── interceptors/      ← functional interceptors
│   │   ├── guards/            ← functional guards
│   │   └── services/          ← เหมือนเดิม
│   ├── shared/
│   │   └── components/        ← standalone: true ทุกตัว
│   └── features/
│       └── xxx/
│           ├── xxx.component.ts   ← standalone: true
│           └── xxx.routes.ts      ← routes สำหรับ feature นี้
```

---

## 💬 วิธีใช้กับ Claude Code

```bash
# วางไฟล์นี้ที่ root แล้วรัน
claude

# คำสั่งที่แนะนำ
> migrate src/app/app.module.ts ตาม CLAUDE.md
> migrate src/app/features/user/ ทีละไฟล์ ตาม CLAUDE.md
> แก้ compile error ทั้งหมดใน src/app/core/guards/
```ห