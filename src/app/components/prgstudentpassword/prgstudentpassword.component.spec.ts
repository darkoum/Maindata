import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentpasswordComponent } from './prgstudentpassword.component';

describe('PrgstudentpasswordComponent', () => {
  let component: PrgstudentpasswordComponent;
  let fixture: ComponentFixture<PrgstudentpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
