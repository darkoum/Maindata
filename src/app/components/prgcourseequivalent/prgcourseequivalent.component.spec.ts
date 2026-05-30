import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgcourseequivalentComponent } from './prgcourseequivalent.component';

describe('PrgcourseequivalentComponent', () => {
  let component: PrgcourseequivalentComponent;
  let fixture: ComponentFixture<PrgcourseequivalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrgcourseequivalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrgcourseequivalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
