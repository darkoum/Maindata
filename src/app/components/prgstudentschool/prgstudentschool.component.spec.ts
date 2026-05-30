import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgstudentschoolComponent } from './prgstudentschool.component';

describe('PrgstudentschoolComponent', () => {
  let component: PrgstudentschoolComponent;
  let fixture: ComponentFixture<PrgstudentschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgstudentschoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgstudentschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
