import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentbioentryComponent } from './prgstudentbioentry.component';

describe('PrgstudentbioentryComponent', () => {
  let component: PrgstudentbioentryComponent;
  let fixture: ComponentFixture<PrgstudentbioentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentbioentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentbioentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
