import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentstatusComponent } from './prgstudentstatus.component';

describe('PrgstudentstatusComponent', () => {
  let component: PrgstudentstatusComponent;
  let fixture: ComponentFixture<PrgstudentstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
