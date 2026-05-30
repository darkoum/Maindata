import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentstatussetComponent } from './prgstudentstatusset.component';

describe('PrgstudentstatussetComponent', () => {
  let component: PrgstudentstatussetComponent;
  let fixture: ComponentFixture<PrgstudentstatussetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentstatussetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentstatussetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
