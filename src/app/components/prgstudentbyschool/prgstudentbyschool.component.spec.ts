import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentbyschoolComponent } from './prgstudentbyschool.component';

describe('PrgstudentbyschoolComponent', () => {
  let component: PrgstudentbyschoolComponent;
  let fixture: ComponentFixture<PrgstudentbyschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentbyschoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentbyschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
