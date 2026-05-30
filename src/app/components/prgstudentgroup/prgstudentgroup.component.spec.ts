import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentgroupComponent } from './prgstudentgroup.component';

describe('PrgstudentgroupComponent', () => {
  let component: PrgstudentgroupComponent;
  let fixture: ComponentFixture<PrgstudentgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
