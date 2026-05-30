import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgcourseComponent } from './prgcourse.component';

describe('PrgcourseComponent', () => {
  let component: PrgcourseComponent;
  let fixture: ComponentFixture<PrgcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgcourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
